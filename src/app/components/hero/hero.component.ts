import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-hero',
	imports: [],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {
	@ViewChild('backgroundImage') backgroundImageRef!: ElementRef<HTMLDivElement>;

	imageUrls: string[] = [
		'/hero-background-1.webp',
		'/hero-background-2.webp',
		'/hero-background-3.webp'
	];
	currentImageIndex = 0;
	intervalDuration = 8000; // 8 segundos

	ngAfterViewInit(): void {
		this.handleParallax(); // primeira aplicação
		this.startImageCarousel(); // inicia o carrossel
	}

	@HostListener('window:scroll', [])
	onWindowScroll(): void {
		this.handleParallax();
	}

	handleParallax(): void {
		const scrollY = window.scrollY;
		const background = this.backgroundImageRef?.nativeElement;
		if (background) {
			background.style.transform = `translateY(${scrollY * 0.5}px)`; // move 50% da rolagem
		}
	}

	startImageCarousel(): void {
		setInterval(() => {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
			const background = this.backgroundImageRef?.nativeElement;
			if (background) {
				background.style.backgroundImage = `url('${this.imageUrls[this.currentImageIndex]}')`;
			}
		}, this.intervalDuration);
	}
}
