import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'inicio', redirectTo: '', pathMatch: 'full' },
    { path: '', title: 'Salão Bella Mulher', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent), pathMatch: 'full' },
    { path: 'inicio:section', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent), pathMatch: 'full' },
    { path: 'agendamento', title: 'Salão Bella Mulher - Agendamentos', loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent) },
    { path: 'admin', title: 'Salão Bella Mulher - Página do Proprietário', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
    { path: 'login', title: 'Salão Bella Mulher - Entrar', loadComponent: () => import('./pages/auth/auth.component').then(m => m.LoginComponent) },
    { path: '**', redirectTo: '' }
];
