import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes, routingFeatures } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, ...routingFeatures),
    // Nota: no usamos provideClientHydration() a propósito. El renderizado en
    // servidor da el HTML inicial y el cliente re-renderiza encima; así se
    // evitan fallos de hidratación que puedan dejar la interfaz sin eventos.
  ],
};
