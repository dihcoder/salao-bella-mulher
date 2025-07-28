import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		const environment = {SUPABASE_URL: '', SUPABASE_ANON_KEY: ''}

		this.supabase = createClient(
			environment.SUPABASE_URL,
			environment.SUPABASE_ANON_KEY
		);
	}

	get client() {
		return this.supabase;
	}
}