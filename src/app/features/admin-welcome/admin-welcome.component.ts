import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-admin-welcome',
	standalone: true,
	imports: [CommonModule, FormsModule],
	animations: [
		trigger('fadeIn', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(20px)' }),
				animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			])
		])
	],
	template: `
    <div class="welcome-container">
      <h1>Obrigado por confiar em <br><span>meu trabalho!</span></h1>
      <p>Estou feliz por realizar este projeto com você.</p>
      <p class="bold">Para ativar seu acesso como administrador, <strong>insira a chave exclusiva que você recebeu.</strong></p>

      <input type="text" [(ngModel)]="accessKey" placeholder="H48M2-GHU-7355-RVT-QS" />
      <button [disabled]="!accessKey.trim()" (click)="validateKey()">Prosseguir</button>

      <div *ngIf="showForm" @fadeIn class="form-container">
        <h2>Cadastro de Administrador</h2>
        <form>
          <input type="text" placeholder="Nome completo" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  `,
	styleUrls: ['./admin-welcome.component.scss']
})
export class AdminWelcomeComponent {
	accessKey = '';
	showForm = false;

	validateKey() {
		if (this.accessKey.trim()) {
			this.showForm = true;
		}
	}
}