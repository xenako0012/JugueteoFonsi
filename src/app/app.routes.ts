import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'php2bash / PHP2Shell — Análisis del incidente' },
  { path: '**', redirectTo: '' },
];
