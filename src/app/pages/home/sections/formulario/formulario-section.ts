import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-section',
  templateUrl: './formulario-section.html',
  styleUrl: './formulario-section.css'
})
export class FormularioSection implements AfterViewInit, OnDestroy {
  private filloutFired = false;
  private messageListener?: (e: MessageEvent) => void;
  private filloutObserver?: MutationObserver;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.setupFilloutDetection();
    this.loadFilloutScript();
  }

  ngOnDestroy() {
    this.filloutObserver?.disconnect();
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private setupFilloutDetection() {
    this.messageListener = (e: MessageEvent) => {
      if (!e.data || this.filloutFired) return;
      const raw = typeof e.data === 'string' ? e.data : JSON.stringify(e.data);
      if (raw.includes('submit') || raw.includes('Submit') ||
          raw.includes('complete') || raw.includes('Complete') ||
          raw.includes('Gracias') || raw.includes('gracias') ||
          raw.includes('Thank')) {
        this.handleFormSubmit();
      }
    };
    window.addEventListener('message', this.messageListener);

    setTimeout(() => {
      const wrap = document.querySelector('[data-fillout-id]');
      if (wrap) {
        this.filloutObserver = new MutationObserver(() => {
          if (this.filloutFired) return;
          if (wrap.textContent && (
            wrap.textContent.includes('Gracias') ||
            wrap.textContent.includes('gracias') ||
            wrap.textContent.includes('Thank')
          )) {
            this.handleFormSubmit();
          }
        });
        this.filloutObserver.observe(wrap, { childList: true, subtree: true, characterData: true });
      }
    }, 500);
  }

  private handleFormSubmit() {
    if (this.filloutFired) return;
    this.filloutFired = true;
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', 'Lead');
    }
    this.router.navigate(['/gracias']);
  }

  private loadFilloutScript() {
    if (document.querySelector('script[src*="fillout-embed"]')) return;
    const script = document.createElement('script');
    script.src = '/fillout-embed.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
