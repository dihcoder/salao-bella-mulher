import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-video-highlight',
    imports: [CommonModule],
    templateUrl: './video-highlight.component.html',
    styleUrl: './video-highlight.component.scss'
})
export class VideoHighlightComponent {
    isModalOpen = false;
    videoUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
        const videoId = 'fiu_KeecNM8';
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId}?autoplay=1`
        );
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
