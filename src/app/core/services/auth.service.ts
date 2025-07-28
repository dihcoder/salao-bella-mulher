import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = '/.netlify/functions';

	constructor(private http: HttpClient) { }

	login(payload: LoginPayload): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload);
	}

	register(payload: RegisterPayload): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload, {
			withCredentials: true
		});
	}
}
