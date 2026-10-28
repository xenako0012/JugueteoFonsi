import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

/** Ficha técnica mostrada al elegir un modo del rack. */
interface ServerMode {
  title: string;
  sub: string;
  chipLabel: string;
  chipKind: string;
  lines: string[];
  cmd: string;
}

/**
 * «Zona técnica»: rack retro estilo reproductor Winamp donde cada pista
 * es un modo de ejecución de PHP. El LED, el ecualizador y la ficha
 * técnica reaccionan a la estación seleccionada.
 */
@Component({
  selector: 'app-tech-radio',
  imports: [RouterLink, RevealDirective],
  templateUrl: './tech-radio.html',
  styleUrl: './tech-radio.css',
})
export class TechRadio {
  protected readonly selected = signal(0);

  protected readonly modes: ServerMode[] = [
    {
      title: 'PHP-FPM + NGINX',
      sub: 'fpm · workers=4',
      chipLabel: 'Modo recomendado',
      chipKind: 'ok',
      lines: [
        'Procesos de PHP aislados del servidor web: una RCE no se arrastra hasta Nginx.',
        'Las mitigaciones de emergencia (desactivar session.upload_progress) van por pool, sin tocar el sitio.',
      ],
      cmd: 'php_admin_value[session.upload_progress.enabled] = 0',
    },
    {
      title: 'MOD_PHP + APACHE',
      sub: 'módulo · impacto máximo',
      chipLabel: 'Impacto máximo',
      chipKind: 'danger',
      lines: [
        'El módulo vive dentro del proceso de Apache: php2bash convierte el servidor web entero en una shell.',
        'Es el peor escenario del incidente — el sitio lo marca como el caso que más duele.',
      ],
      cmd: 'a2dismod php8.4 && systemctl reload apache2',
    },
    {
      title: 'CGI / LITESPEED',
      sub: 'cgi · intermedio',
      chipLabel: 'Riesgo intermedio',
      chipKind: 'warn',
      lines: [
        'php-cgi levanta un proceso por petición (más superficie); LiteSpeed usa su propio SAPI.',
        'Los dos están en la lista de afectados: el parche es obligatorio también aquí.',
      ],
      cmd: 'apt install --only-upgrade php8.3-fpm',
    },
  ];

  protected readonly mode = computed<ServerMode>(() => this.modes[this.selected()]);

  protected pick(i: number): void {
    this.selected.set(i);
  }
}
