import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env['SUPABASE_URL'] || 'SUPABASE_URL',
    process.env['SUPABASE_ANON_KEY'] || 'SUPABASE_ANON_KEY'
);

export const handler: Handler = async (event) => {
  const { httpMethod, queryStringParameters, body } = event;
  const id = queryStringParameters?.['id'];
  const booking_date = queryStringParameters?.['booking_date'];

  try {
    switch (httpMethod) {
      case 'GET': {
        let query = supabase
          .from('bookings')
          .select(`*, service:services(*)`)
          .order('booking_date')
          .order('booking_time');

        if (booking_date) {
          query = query.eq('booking_date', booking_date);
        }

        const { data, error } = await query;
        if (error) throw error;
        return response(200, data);
      }

      case 'POST': {
        const booking = JSON.parse(body!);
        const { data, error } = await supabase
          .from('bookings')
          .insert([booking])
          .select(`*, service:services(*)`)
          .single();
        if (error) throw error;
        return response(200, data);
      }

      case 'PUT': {
        if (!id) return response(400, { error: 'Missing booking id' });
        const updates = JSON.parse(body!);
        const { data, error } = await supabase
          .from('bookings')
          .update(updates)
          .eq('id', id)
          .select(`*, service:services(*)`)
          .single();
        if (error) throw error;
        return response(200, data);
      }

      case 'DELETE': {
        if (!id) return response(400, { error: 'Missing booking id' });
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) throw error;
        return response(204, null);
      }

      default:
        return response(405, { error: 'Method Not Allowed' });
    }
  } catch (err: any) {
    return response(500, { error: err.message });
  }
};

function response(statusCode: number, body: any) {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
