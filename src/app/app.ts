import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';

@Component({
  imports: [RouterOutlet, Nav, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
