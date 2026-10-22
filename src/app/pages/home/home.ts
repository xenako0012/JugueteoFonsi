import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PhpBasics } from '../../components/php-basics/php-basics';
import { Timeline } from '../../components/timeline/timeline';
import { IncidentDetail } from '../../components/incident-detail/incident-detail';
import { Versions } from '../../components/versions/versions';
import { Solutions } from '../../components/solutions/solutions';
import { Checklist } from '../../components/checklist/checklist';
import { Detection } from '../../components/detection/detection';
import { Lessons } from '../../components/lessons/lessons';
import { Faq } from '../../components/faq/faq';
import { Closing } from '../../components/closing/closing';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    PhpBasics,
    Timeline,
    IncidentDetail,
    Versions,
    Solutions,
    Checklist,
    Detection,
    Lessons,
    Faq,
    Closing,
  ],
  template: `
    <app-hero />
    <app-php-basics />
    <app-timeline />
    <app-incident-detail />
    <app-versions />
    <app-solutions />
    <app-checklist />
    <app-detection />
    <app-lessons />
    <app-faq />
    <app-closing />
  `,
})
export class Home {}
