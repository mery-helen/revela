import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { NavigationDrawer } from './shared/components/navigation-drawer/navigation-drawer';

@Component({
  imports: [RouterOutlet, Header, Footer, NavigationDrawer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly isDrawerOpen = signal(false);

  toggleDrawer(): void {
    this.isDrawerOpen.update((open) => !open);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }
}
