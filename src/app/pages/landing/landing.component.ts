import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../features/hero/hero.component';
import { OpeningHoursComponent } from '../../features/opening-hours/opening-hours.component';
import { FeaturedServicesComponent } from '../../features/featured-services/featured-services.component';
import { TestimonialSectionComponent } from '../../features/testimonial-section/testimonial-section.component';
import { VideoHighlightComponent } from '../../features/video-highlight/video-highlight.component';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
	selector: 'app-landing',
	imports: [HeroComponent, OpeningHoursComponent, FeaturedServicesComponent, TestimonialSectionComponent, VideoHighlightComponent, HeaderComponent, FooterComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Espera um tick para o DOM renderizar
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 0);
      }
    });
  }
}
