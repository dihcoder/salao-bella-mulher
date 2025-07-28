import { AfterViewInit, Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-header',
	imports: [RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

	constructor(
		private router: Router,
		@Inject(DOCUMENT) private document: Document
	) { }

	isFragmentActive(fragment: string): boolean {
		return this.router.url.includes(fragment);
	}

	ngAfterViewInit(): void {
		const menuToggle = this.document.querySelector('.menu-toggle') as HTMLElement | null;
		const navMenu = this.document.querySelector('.nav-menu') as HTMLElement | null;

		if (!menuToggle || !navMenu) return;

		// Clique fora do menu fecha ele
		this.document.addEventListener('click', (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (target.closest('.menu-toggle')) return;

			menuToggle.classList.remove('active');
			navMenu.classList.remove('mobile-visible');

			if (menuToggle.getAttribute('aria-expanded') === 'true') {
				menuToggle.setAttribute('aria-expanded', 'false');
			}
		});

		// Clique no botão abre/fecha o menu
		menuToggle.addEventListener('click', () => {
			navMenu.classList.toggle('mobile-visible');
			const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
			menuToggle.classList.toggle('active');
		});
	}

}
