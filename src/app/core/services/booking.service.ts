import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Booking, Service } from '../../shared/models/booking.model';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private supabase: SupabaseService) { }

    // Serviços
    getServices(): Observable<Service[]> {
        return from(
            this.supabase.client
                .from('services')
                .select('*')
                .order('name')
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data || [];
                })
        );
    }


    addService(service: Omit<Service, 'id'>): Observable<Service> {
        return from(
            this.supabase.client
                .from('services')
                .insert([service])
                .select()
                .single()
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data;
                })
        );
    }

    updateService(id: string, service: Partial<Service>): Observable<Service> {
        return from(
            this.supabase.client
                .from('services')
                .update(service)
                .eq('id', id)
                .select()
                .single()
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data;
                })
        );
    }

    deleteService(id: string): Observable<void> {
        return from(
            this.supabase.client
                .from('services')
                .delete()
                .eq('id', id)
                .then(({ error }) => {
                    if (error) throw error;
                })
        );
    }

    // Agendamentos
    getBookings(): Observable<Booking[]> {
        return from(
            this.supabase.client
                .from('bookings')
                .select(`
          *,
          service:services(*)
        `)
                .order('booking_date')
                .order('booking_time')
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data || [];
                })
        );
    }

    createBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
        return from(
            this.supabase.client
                .from('bookings')
                .insert([booking])
                .select(`
          *,
          service:services(*)
        `)
                .single()
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data;
                })
        );
    }

    updateBooking(id: string, booking: Partial<Booking>): Observable<Booking> {
        return from(
            this.supabase.client
                .from('bookings')
                .update(booking)
                .eq('id', id)
                .select(`
          *,
          service:services(*)
        `)
                .single()
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data;
                })
        );
    }

    deleteBooking(id: string): Observable<void> {
        return from(
            this.supabase.client
                .from('bookings')
                .delete()
                .eq('id', id)
                .then(({ error }) => {
                    if (error) throw error;
                })
        );
    }

    getBookingsByDate(date: string): Observable<Booking[]> {
        return from(
            this.supabase.client
                .from('bookings')
                .select(`
          *,
          service:services(*)
        `)
                .eq('booking_date', date)
                .order('booking_time')
                .then(({ data, error }) => {
                    if (error) throw error;
                    return data || [];
                })
        );
    }
}