import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-header',
	imports: [],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

	constructor(
		private elRef: ElementRef,
		@Inject(DOCUMENT) private document: Document
	) { }

	ngAfterViewInit(): void {
		const menuToggle = this.document.querySelector('.menu-toggle') as HTMLElement | null;
		const navMenu = this.document.querySelector('.nav-menu') as HTMLElement | null;
		const navLinks = this.document.querySelectorAll('.nav-menu li') as NodeListOf<HTMLElement>;

		if (!menuToggle || !navMenu) return;

		// Clique nos links do menu
		navLinks.forEach(link => {
			link.addEventListener('click', (event: Event) => {
				event.preventDefault();
				this.changeActiveLink(link);
				const sectionId = link.getAttribute('data-section');
				if (sectionId) {
					const section = this.document.getElementById(sectionId);
					if (section) {
						section.scrollIntoView({ behavior: 'smooth' });
					}
				}
			});
		});

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

	private changeActiveLink(currentLink: HTMLElement): void {
		if (currentLink.classList.contains('active')) return;

		const navLinks = this.document.querySelectorAll('.nav-menu li') as NodeListOf<HTMLElement>;
		navLinks.forEach(link => link.classList.remove('active'));
		currentLink.classList.add('active');
	}

}
