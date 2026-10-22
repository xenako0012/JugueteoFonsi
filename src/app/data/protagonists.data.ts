/** Protagonistas del incidente: personajes de la sección de portada. */

export interface Protagonist {
  icon: string;
  role: string;
  roleKind: 'primary' | 'danger' | 'warn' | 'ok' | 'info';
  name: string;
  text: string;
}

export const protagonists: Protagonist[] = [
  {
    icon: '$_',
    role: 'La víctima',
    roleKind: 'info',
    name: 'El motor de PHP',
    text:
      'El verdadero protagonista y, sin saberlo, el punto débil: un fallo dormido desde 2012 en sus rutas de ' +
      'limpieza de memoria. Da igual lo bien programada que estuviera tu app: todas pasaban por él.',
  },
  {
    icon: '⌘',
    role: 'Los descubridores',
    roleKind: 'primary',
    name: 'Investigadores e IA',
    text:
      'Los equipos de Calif y Wiz auditaron millones de líneas con agentes de IA (GPT‑5.6 Sol y Wiz Atlas). ' +
      'Su trabajo destapó las dos vulnerabilidades antes de que lo hicieran los atacantes… casi.',
  },
  {
    icon: '☠',
    role: 'Los atacantes',
    roleKind: 'danger',
    name: 'Quienes se adelantaron',
    text:
      'El 17 de octubre ya circulaban intentos de explotación y, tras la fuga de detalles, PoC públicas. ' +
      'Miles de peticiones maliciosas por hora buscaban convertir PHP en una shell remota.',
  },
  {
    icon: '✚',
    role: 'Los defensores',
    roleKind: 'ok',
    name: 'PHP, Cloudflare y compañía',
    text:
      'El equipo de PHP publicó los parches 25 minutos antes de lo previsto y Cloudflare activó reglas WAF ' +
      'por defecto horas antes del anuncio. La comunidad reaccionó en tiempo récord.',
  },
];
