import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { HeroSection } from './sections/hero/hero-section';
import { ResultadosSection } from './sections/resultados/resultados-section';
import { PlanesSection } from './sections/planes/planes-section';
import { FormularioSection } from './sections/formulario/formulario-section';
import { TestimoniosSection } from './sections/testimonios/testimonios-section';
import { FaqSection } from './sections/faq/faq-section';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, HeroSection, ResultadosSection, PlanesSection, FormularioSection, TestimoniosSection, FaqSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnDestroy {
  private revealObserver?: IntersectionObserver;

  ngAfterViewInit() {
    this.setupRevealObserver();
  }

  ngOnDestroy() {
    this.revealObserver?.disconnect();
  }

  private setupRevealObserver() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    this.revealObserver = obs;
  }
}
