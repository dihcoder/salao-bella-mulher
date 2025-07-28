export interface AuthResponse {
	user: any;
	token: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	fullName: string;
	email: string;
	password: string;
	masterKey?: string;
}

// { full_name, email, password }