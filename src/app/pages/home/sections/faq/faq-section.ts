import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq-section',
  imports: [RouterLink],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css'
})
export class FaqSection {
  openFaqIndex: number | null = null;

  faqItems = [
    { q: '¿Realmente no pago nada para empezar?', a: 'Los honorarios se abonan a mes vencido: empezamos a trabajar y al cabo de 30 días te facturamos. La inversión en Meta también arranca después de iniciar.' },
    { q: '¿Por qué hay un mínimo de 3 meses?', a: 'El algoritmo de Meta necesita tiempo para aprender. Primer mes: base. Segundo: resultados sólidos. Tercero: escalamos lo que funciona.' },
    { q: '¿El presupuesto de los anuncios está incluido?', a: 'No. Nuestro fee es por gestión y estrategia. Lo que le pagás a Meta va directo a tu cuenta. Transparencia total.' },
    { q: '¿Qué significa "a demanda" en Vamos Muy Bien?', a: 'No significa ilimitado. Significa la cantidad necesaria para que las campañas funcionen bien, sin desperdiciar recursos.' },
    { q: '¿Con qué frecuencia me contactan?', a: 'Vamos y Vamos Bien: 1 vez por semana. Vamos Muy Bien: 2 veces por semana. Siempre programado: WhatsApp, Zoom o llamada.' },
    { q: '¿Para qué tipo de negocios trabajan?', a: 'E-commerce, servicios, salud, gastronomía, educación, inmobiliarias y más. Casos reales en @vamosbienmkt.' },
  ];

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  trackFbq(eventName: string, params?: object) {
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', eventName, params ?? {});
    }
  }
}
