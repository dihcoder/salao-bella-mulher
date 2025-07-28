import {
	Component,
	HostListener,
	AfterViewInit,
	ElementRef,
	ViewChild,
	ViewChildren,
	QueryList,
	OnDestroy
} from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';

@Component({
	selector: 'app-carousel',
	standalone: true,
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
	@ViewChild('emblaViewport', { static: true }) emblaViewport!: ElementRef<HTMLElement>;
	@ViewChildren('slideImage') slideImages!: QueryList<ElementRef<HTMLImageElement>>;

	embla?: EmblaCarouselType;

	imageUrls: string[] = [
		'/hero-background-1.webp',
		'/hero-background-2.webp',
		'/hero-background-3.webp'
	];
	intervalDuration = 8000;
	intervalId: any;

	ngAfterViewInit(): void {
		this.embla = EmblaCarousel(this.emblaViewport.nativeElement, {
			loop: true
		});

		this.embla.on('select', () => {
			this.handleParallax();
		});

		this.handleParallax();
		this.startAutoScroll();
	}

	@HostListener('window:scroll')
	onScroll(): void {
		this.handleParallax();
	}

	handleParallax(): void {
		const scrollY = window.scrollY;

		if (!this.embla || !this.slideImages) return;

		const selectedIndex = this.embla.selectedScrollSnap();

		this.slideImages.forEach((imgRef, index) => {
			const image = imgRef.nativeElement;

			if (index === selectedIndex) {
				image.style.transform = `translateY(${scrollY * 0.4}px)`;
			} else {
				image.style.transform = 'translateY(0px)';
			}
		});
	}

	startAutoScroll(): void {
		this.intervalId = setInterval(() => {
			this.embla?.scrollNext();
		}, this.intervalDuration);
	}

	scrollNext(): void {
		this.embla?.scrollNext();
		this.handleParallax();
	}

	scrollPrev(): void {
		this.embla?.scrollPrev();
		this.handleParallax();
	}

	ngOnDestroy(): void {
		this.embla?.destroy();
		clearInterval(this.intervalId);
	}
}
