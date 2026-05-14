import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Privacidad } from './pages/privacidad/privacidad';
import { Gracias } from './pages/gracias/gracias';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'privacidad', component: Privacidad },
  { path: 'gracias', component: Gracias },
  { path: '**', redirectTo: '' }
];
