import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados-section',
  imports: [RouterLink],
  templateUrl: './resultados-section.html',
  styleUrl: './resultados-section.css'
})
export class ResultadosSection implements AfterViewInit, OnDestroy {
  private counterObserver?: IntersectionObserver;

  ngAfterViewInit() {
    this.setupCounterObserver();
  }

  ngOnDestroy() {
    this.counterObserver?.disconnect();
  }

  trackFbq(eventName: string, params?: object) {
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', eventName, params ?? {});
    }
  }

  private setupCounterObserver() {
    const cards = document.querySelectorAll('.rs-card');
    if (!cards.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.querySelectorAll('[data-target]').forEach((el: Element) => {
          const target = parseInt((el as HTMLElement).dataset['target'] ?? '0');
          const suffix = (el as HTMLElement).dataset['suffix'] ?? '';
          const duration = 1600;
          let startTime: number | null = null;
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / duration, 1);
            const ease = p < 0.5 ? 2 * p * p : (4 - 2 * p) * p - 1;
            el.textContent = Math.round(ease * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        e.target.querySelectorAll('[data-target-float]').forEach((el: Element) => {
          const target = parseFloat((el as HTMLElement).dataset['targetFloat'] ?? '0');
          const suffix = (el as HTMLElement).dataset['suffix'] ?? '';
          const duration = 1600;
          let startTime: number | null = null;
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / duration, 1);
            const ease = p < 0.5 ? 2 * p * p : (4 - 2 * p) * p - 1;
            el.textContent = (ease * target).toFixed(1) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        e.target.querySelectorAll('.rs-bar[data-w]').forEach((bar: Element) => {
          setTimeout(() => {
            (bar as HTMLElement).style.width = (bar as HTMLElement).dataset['w'] + '%';
          }, 200);
        });
      });
    }, { threshold: 0.25 });
    cards.forEach(c => io.observe(c));
    this.counterObserver = io;
  }
}
