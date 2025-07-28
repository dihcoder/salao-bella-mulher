import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

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

	// loginUser(): Observable<any> {
	// 	return from(
	// 		this.supabase.client
	// 			.from('users')
	// 			.select('id')
	// 			.select(`
    //           *,
    //           service:services(*)
    //         `)
	// 			.single()
	// 			.then(({ data, error }) => {
	// 				if (error) throw error;
	// 				return data;
	// 			})
	// 	);
	// }
}
