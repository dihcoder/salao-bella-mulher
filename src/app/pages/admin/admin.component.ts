import { Component, OnInit } from '@angular/core';
import { Booking } from '../../shared/models/booking.model';
import { BookingService } from '../../core/services/booking.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    bookings: Booking[] = [];
    filteredBookings: Booking[] = [];
    todayBookings: Booking[] = [];
    pendingBookings: Booking[] = [];
    confirmedBookings: Booking[] = [];
    selectedDate = '';
    statusFilter = '';

    isAuthenticated = false;

    constructor(private bookingService: BookingService, private router: Router) { }

    ngOnInit() {
        this.loadBookings();

        if (!this.isAuthenticated) {
            this.router.navigate(['/login'], {
                queryParams: { from: 'admin' }
            });
        }
    }

    loadBookings() {
        this.bookingService.getBookings().subscribe({
            next: (bookings) => {
                this.bookings = bookings;
                this.filteredBookings = bookings;
                this.updateStats();
            },
            error: (error) => {
                console.error('Erro ao carregar agendamentos:', error);
            }
        });
    }

    updateStats() {
        const today = new Date().toISOString().split('T')[0];
        this.todayBookings = this.bookings.filter(b => b.booking_date === today);
        this.pendingBookings = this.bookings.filter(b => b.status === 'pending');
        this.confirmedBookings = this.bookings.filter(b => b.status === 'confirmed');
    }

    filterByDate() {
        this.applyFilters();
    }

    filterByStatus() {
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.bookings];

        if (this.selectedDate) {
            filtered = filtered.filter(b => b.booking_date === this.selectedDate);
        }

        if (this.statusFilter) {
            filtered = filtered.filter(b => b.status === this.statusFilter);
        }

        this.filteredBookings = filtered;
    }

    updateBookingStatus(bookingId: string, event: any) {
        const newStatus = event.target.value;
        this.bookingService.updateBooking(bookingId, { status: newStatus }).subscribe({
            next: (updatedBooking) => {
                const index = this.bookings.findIndex(b => b.id === bookingId);
                if (index !== -1) {
                    this.bookings[index] = updatedBooking;
                    this.applyFilters();
                    this.updateStats();
                }
            },
            error: (error) => {
                console.error('Erro ao atualizar status:', error);
            }
        });
    }

    deleteBooking(bookingId: string) {
        if (confirm('Tem certeza que deseja excluir este agendamento?')) {
            this.bookingService.deleteBooking(bookingId).subscribe({
                next: () => {
                    this.bookings = this.bookings.filter(b => b.id !== bookingId);
                    this.applyFilters();
                    this.updateStats();
                },
                error: (error) => {
                    console.error('Erro ao excluir agendamento:', error);
                }
            });
        }
    }

    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            pending: 'Pendente',
            confirmed: 'Confirmado',
            completed: 'Concluído',
            cancelled: 'Cancelado'
        };
        return labels[status] || status;
    }
}