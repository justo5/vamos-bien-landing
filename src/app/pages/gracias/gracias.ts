import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gracias',
  imports: [],
  templateUrl: './gracias.html',
  styleUrl: './gracias.css'
})
export class Gracias implements OnInit, OnDestroy {
  countdown = 4;
  private interval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.interval);
        window.location.href = 'https://vamosbien.netlify.app';
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
