import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../shared/models/booking.model';
import { BookingService } from '../../core/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
    bookingForm: FormGroup;
    services: Service[] = [];
    availableTimes: string[] = [];
    minDate: string;
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private bookingService: BookingService
    ) {
        this.bookingForm = this.fb.group({
            client_name: ['', Validators.required],
            client_phone: ['', Validators.required],
            client_email: ['', [Validators.required, Validators.email]],
            service_id: ['', Validators.required],
            booking_date: ['', Validators.required],
            booking_time: ['', Validators.required],
            notes: ['']
        });

        // Data mínima é hoje
        this.minDate = new Date().toISOString().split('T')[0];

        // Horários disponíveis (9h às 18h)
        this.availableTimes = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
        ];
    }

    ngOnInit() {
        this.loadServices();
    }

    loadServices() {
        this.bookingService.getServices().subscribe({
            next: (services) => {
                this.services = services;
            },
            error: (error) => {
                console.error('Erro ao carregar serviços:', error);
                this.errorMessage = 'Erro ao carregar serviços disponíveis';
            }
        });
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            this.isLoading = true;
            this.successMessage = '';
            this.errorMessage = '';

            const booking = {
                ...this.bookingForm.value,
                status: 'pending' as const
            };

            this.bookingService.createBooking(booking).subscribe({
                next: (result) => {
                    this.isLoading = false;
                    this.successMessage = 'Agendamento realizado com sucesso! Entraremos em contato para confirmar.';
                    this.bookingForm.reset();
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error('Erro ao criar agendamento:', error);
                    this.errorMessage = 'Erro ao realizar agendamento. Tente novamente.';
                }
            });
        }
    }
}
