import { Routes, withInMemoryScrolling } from '@angular/router';
import { Home } from './pages/home/home';
import { TopicPage } from './pages/topic-page';
import { NotFound } from './pages/not-found';
import { topics } from './data/topics.data';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'php2bash / PHP2Shell — Análisis del incidente de seguridad en PHP',
  },
  ...topics.map((t) => ({
    path: t.path.slice(1),
    component: TopicPage,
    title: `${t.label} — php2bash`,
    data: t,
  })),
  {
    path: '**',
    component: NotFound,
    title: 'Página no encontrada — php2bash',
  },
];

export const routingFeatures = [
  withInMemoryScrolling({
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
  }),
];
