import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-drawer',
  imports: [RouterLink],
  templateUrl: './navigation-drawer.html',
})
export class NavigationDrawer {
  readonly close = output<void>();
}
