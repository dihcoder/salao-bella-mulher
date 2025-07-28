export interface Service {
    id: string;
    name: string;
    duration: number; // em minutos
    price: number;
    description?: string;
    created_at?: string;
}

export interface Booking {
    id: string;
    client_name: string;
    client_phone: string;
    client_email: string;
    service_id: string;
    service?: Service;
    booking_date: string;
    booking_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    created_at?: string;
}