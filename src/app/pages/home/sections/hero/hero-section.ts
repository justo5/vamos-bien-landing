import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {
  videoOverlayHidden = false;

  onVideoOverlayClick() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    }
    this.videoOverlayHidden = true;
  }

  onVideoEnded() {
    this.videoOverlayHidden = false;
  }

  trackFbq(eventName: string, params?: object) {
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', eventName, params ?? {});
    }
  }
}
