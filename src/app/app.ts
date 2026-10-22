import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';
import { ScrollDock } from './components/scroll-dock/scroll-dock';

@Component({
  imports: [RouterOutlet, Nav, Footer, ScrollDock],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
