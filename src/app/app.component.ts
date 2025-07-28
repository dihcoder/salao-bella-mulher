import { AfterViewInit, Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { DOCUMENT } from '@angular/common';
import { ScrollService } from './shared/services/scroll.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, FooterComponent, HeaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private scrollService: ScrollService
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
	}
}
