import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, Service } from '../../shared/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = '/.netlify/functions';

  constructor(private http: HttpClient) {}

  // Serviços
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`);
  }

  addService(service: Omit<Service, 'id'>): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/services`, service);
  }

  updateService(id: string, service: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/services?id=${id}`, service);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/services?id=${id}`);
  }

  // Agendamentos
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings`);
  }

  createBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/bookings`, booking);
  }

  updateBooking(id: string, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/bookings?id=${id}`, booking);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bookings?id=${id}`);
  }

  getBookingsByDate(date: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings?booking_date=${date}`);
  }
}
