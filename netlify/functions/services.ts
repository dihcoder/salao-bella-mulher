import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env['SUPABASE_URL'] || 'SUPABASE_URL',
    process.env['SUPABASE_ANON_KEY'] || 'SUPABASE_ANON_KEY'
);

export const handler: Handler = async (event) => {
  const { httpMethod, queryStringParameters, body } = event;
  const id = queryStringParameters?.['id'];

  try {
    switch (httpMethod) {
      case 'GET': {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name');
        if (error) throw error;
        return response(200, data);
      }

      case 'POST': {
        const service = JSON.parse(body!);
        const { data, error } = await supabase
          .from('services')
          .insert([service])
          .select()
          .single();
        if (error) throw error;
        return response(200, data);
      }

      case 'PUT': {
        if (!id) return response(400, { error: 'Missing service id' });
        const updates = JSON.parse(body!);
        const { data, error } = await supabase
          .from('services')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return response(200, data);
      }

      case 'DELETE': {
        if (!id) return response(400, { error: 'Missing service id' });
        const { error } = await supabase.from('services').delete().eq('id', id);
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
