import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-auth',
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss', './first-access.scss']
})
export class LoginComponent {

	masterKeyForm: FormGroup;
	registerForm: FormGroup;

	isFirstAccess = true;
	successMessage: null | string = null;
	errorMessage: null | string = null;


	state: 'greeting-user' | 'fill-master-key' | 'fill-master-key--out' | 'register-admin' | 'login' = 'greeting-user';



	isAccessKeyValid = false;
	isFirstAccessDataValid = false;

	// ACCESS_KEY_LENGTH = 21;
	ACCESS_KEY_LENGTH = 5; // 21

	acessKeyValue = '';

	userName = '';
	userEmail = '';
	userPassword = '';
	userConfirmPassword = '';

	// HARD_CODED_MASTER_KEY = 'H48M2-mmu-7355-RVT-QS';
	HARD_CODED_MASTER_KEY = 'ogeid';

	title: string = 'Login';

	loginForm: FormGroup;

	isLoading = false;

	SECURE_PASSWD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private route: ActivatedRoute
	) {
		this.loginForm = this.fb.group({
			client_email: ['', [Validators.required, Validators.email]],
			client_password: ['', [Validators.required, Validators.pattern(this.SECURE_PASSWD_PATTERN)]]
		});

		this.masterKeyForm = this.fb.group({
			master_key: ['', [Validators.pattern(/(^\w{5}-\w{3}-\w{4}-\w{3}-\w{2}$)|(ogeid)/)]]
		});

		this.registerForm = this.fb.group({
			full_name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ú]+(?: [a-zA-ZÀ-ú]+)+$/)]],
			email: ['', [Validators.required, Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/)]],
			password: ['', [Validators.required]],
			confirm_password: ['', [Validators.required]]
		});

		if (this.isFirstAccess) {
			setTimeout(() => {
				this.state = 'fill-master-key';
			}, 4500)
		}
	}

	onMasterKeySubmit() {
		const MASTER_KEY_IS_CORRECT = this.masterKeyForm.value.master_key === this.HARD_CODED_MASTER_KEY;

		if (MASTER_KEY_IS_CORRECT) {
			this.successMessage = "Muito bem! Vamos para a próxima etapa.";
			this.errorMessage = null;
		} else {
			this.successMessage = null;
			this.errorMessage = "Chave mestra incorreta! Tente de novo.";
		}

		setTimeout(() => {
			this.errorMessage = null;

			if (MASTER_KEY_IS_CORRECT) {
				this.state = 'fill-master-key--out';

				setTimeout(() => {
					this.successMessage = null
					this.state = 'register-admin';
				}, 1500)
			}
		}, this.successMessage ? 3500 : 4500);
	}

	onRegisterFormSubmit() {
		
	}

	onLoginFormSubmit() {}

	// checkAccesKeyValue() {
	// 	this.acessKeyValue = this.acessKeyValue.trim().slice(0, this.ACCESS_KEY_LENGTH);

	// 	this.isAccessKeyValid = this.acessKeyValue.length === this.ACCESS_KEY_LENGTH &&
	// 		this.acessKeyValue === this.HARD_CODED_MASTER_KEY;

	// 	if (this.isAccessKeyValid) {
	// 		this.state = 'register-admin';
	// 	}
	// }

	ngOnInit() {
		// this.loadServices();
		const origem = this.route.snapshot.queryParamMap.get('from');
		if (origem === 'admin') {
			this.title = 'Administração';
		} else {
			this.title = 'Login';
		}
	}

	// loadServices() {
	//     this.bookingService.getServices().subscribe({
	//         next: (services) => {
	//             this.services = services;
	//         },
	//         error: (error) => {
	//             console.error('Erro ao carregar serviços:', error);
	//             this.errorMessage = 'Erro ao carregar serviços disponíveis';
	//         }
	//     });
	// }

	//onSubmit() {

		// if (this.authForm.valid) {
		// 	this.isLoading = true;
		// 	this.successMessage = '';
		// 	this.errorMessage = '';

		// 	const booking = {
		// 		...this.authForm.value,
		// 		status: 'pending' as const
		// 	};

		// 	console.log(booking);
		// 	this.loginService.login(booking).subscribe({
		// 		next: (result) => {
		// 			this.isLoading = false;
		// 			this.successMessage = 'Agendamento realizado com sucesso! Entraremos em contato para confirmar.';
		// 			this.authForm.reset();
		// 		},
		// 		error: (error) => {
		// 			this.isLoading = false;
		// 			console.error('Erro ao criar agendamento:', error);
		// 			this.errorMessage = 'Erro ao realizar agendamento. Tente novamente.';
		// 		}
		// 	});
		// }
	//}

	/* updateValidators() {
		const accessKeyControl = this.loginForm.get('accessKey');
		const nameControl = this.loginForm.get('fullName');
		const emailControl = this.loginForm.get('email');
		const passwordControl = this.loginForm.get('password');
		const confirmPasswordControl = this.loginForm.get('confirmPassword');

		if (this.isFirstAccess) {
			if (!this.isAccessKeyValid) {
				accessKeyControl?.setValidators([Validators.required]);
				nameControl?.clearValidators();
				emailControl?.clearValidators();
				passwordControl?.clearValidators();
				confirmPasswordControl?.clearValidators();
			} else if (!this.isFirstAccessDataValid) {
				accessKeyControl?.clearValidators();
			}
			nameControl?.clearValidators();
			confirmPasswordControl?.clearValidators();
		} else {
			nameControl?.setValidators([Validators.required]);
			confirmPasswordControl?.setValidators([Validators.required]);
		}

		nameControl?.updateValueAndValidity();
		confirmPasswordControl?.updateValueAndValidity();
	}*/
}

/*


<div class="first-access fade-in-anim">
		@if (state === 'register-admin') {

		<div class="form-group">
			<label for="user_full_name" class="sr-only">Nome completo</label>
			<input [(ngModel)]="userName" placeholder="Seu nome completo" id="user_full_name" type="text"
				class="form-control">
		</div>


		<button type="submit" class="btn continue-btn" [disabled]="!isAccessKeyValid">
			Cadastrar
			<!-- {{isFirstAccessDataValid ? 'Cadastrar' : 'Prosseguir'}} -->
		</button>
		}
	</div>


	@if (state === 'login') {
	<h2 class="section-title">Login</h2>
	<p>Faça login para continuar</p>
	}


	<form class="login-form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">



		@if (false) {
		<div class="form-group">
			<label for="client_name" class="sr-only">Nome Completo</label>
			<input placeholder="Seu nome completo" id="client_name" type="text" formControlName="client_name"
				class="form-control" required>
		</div>

		<!--    <div class="form-group">
						<label for="client_phone" class="sr-only">Telefone</label>
						<input id="client_phone" type="tel" formControlName="client_phone" class="form-control"
							placeholder="Telefone (WhatsApp)" required>
					</div> -->

		<div class="form-group">
			<label for="client_email" class="sr-only">Email</label>
			<input placeholder="Seu email" id="client_email" type="email" formControlName="client_email"
				class="form-control">
		</div>

		<div class="form-group">
			<label for="client_password" class="sr-only">Senha</label>
			<input placeholder="Sua senha" id="client_password" type="password" formControlName="client_password"
				class="form-control">
		</div>

		<!-- <div class="form-group">
						<label for="service_id" class="sr-only">Serviço</label>
						<select id="service_id" formControlName="service_id" class="form-control" required>
							<option value="">Selecione um serviço</option>
							<option *ngFor="let service of services" [value]="service.id">
								{{service.name}} - R$ {{service.price | number:'1.2-2'}} ({{service.duration}}min)
							</option>
						</select>
					</div> -->

		<!-- <div class="form-row">
						<div class="form-group">
							<label for="booking_date" class="sr-only">Data</label>
							<input id="booking_date" type="date" formControlName="booking_date" class="form-control"
								[min]="minDate" required>
						</div>

						<div class="form-group">
							<label for="booking_time" class="sr-only">Horário</label>
							<select id="booking_time" formControlName="booking_time" class="form-control" required>
								<option value="">Selecione um horário</option>
								<option *ngFor="let time of availableTimes" [value]="time">
									{{time}}
								</option>
							</select>
						</div>
					</div> -->

		<!-- <div class="form-group">
						<label for="notes" class="sr-only">Observações (opcional)</label>
						<textarea id="notes" formControlName="notes" class="form-control" rows="3"
							placeholder="Alguma observação especial?"></textarea>
					</div> -->

		<!-- <a href="/agendamento" class="btn book-now-btn">Agendar Agora!</a> -->
		<button type="submit" class="btn book-service-btn" [disabled]="!loginForm.valid || isLoading">
			{{isLoading ? 'Entrando...' : 'Entrar'}}
		</button>
		}

	</form>

	<!-- <div *ngIf="successMessage" class="alert alert-success">
		{{successMessage}}
	</div>

	<div *ngIf="errorMessage" class="alert alert-error">
		{{errorMessage}}
	</div> -->



*/