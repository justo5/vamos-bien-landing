import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planes-section',
  imports: [RouterLink],
  templateUrl: './planes-section.html',
  styleUrl: './planes-section.css'
})
export class PlanesSection {
  trackFbq(eventName: string, params?: object) {
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', eventName, params ?? {});
    }
  }
}
