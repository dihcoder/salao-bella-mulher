import { Component, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollService } from './services/scroll.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { OpeningHoursComponent } from "./components/opening-hours/opening-hours.component";
import { FeaturedServicesComponent } from "./components/featured-services/featured-services.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, HeroComponent, OpeningHoursComponent, FeaturedServicesComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private scrollService: ScrollService,
		private elementRef: ElementRef
	) { }

	ngAfterViewInit(): void {
		const throttledScroll = this.scrollService.throttle(this.handleScroll.bind(this), 200);
		window.addEventListener('scroll', throttledScroll);
	}

	handleScroll(): void {
		const header = this.document.querySelector('.site-header') as HTMLElement | null;
		const scrollY = window.scrollY;
		const viewportWidth = window.innerWidth;
		const halfViewportHeight = window.innerHeight / 2;
		const scrollPosition = this.document.documentElement.scrollTop || this.document.body.scrollTop;

		if (header) {
			if (scrollY >= halfViewportHeight && viewportWidth > 940) {
				header.classList.add('fixed');
			} else {
				header.classList.remove('fixed');
			}
		}

		const navLinks = this.document.querySelectorAll('[data-section]') as NodeListOf<HTMLElement>;

		navLinks.forEach(link => {
			const sectionId = link.getAttribute('data-section');
			if (!sectionId) return;

			const section = this.document.getElementById(sectionId);
			if (!section) return;

			const sectionTop = section.offsetTop;
			const sectionBottom = sectionTop + section.offsetHeight;

			const isInSection = scrollPosition >= sectionTop - window.innerHeight / 3 && scrollPosition < sectionBottom;

			if (isInSection) {
				this.changeActiveLink(link);
			}
		});
	}

	changeActiveLink(link: HTMLElement): void {
		const navLinks = this.document.querySelectorAll('[data-section]') as NodeListOf<HTMLElement>;

		navLinks.forEach(l => l.classList.remove('active'));
		link.classList.add('active');
	}
}
