import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-drawer',
  imports: [RouterLink],
  templateUrl: './navigation-drawer.html',
})
export class NavigationDrawer {
  // Renomeado de `close` para `closed` para atender à regra @angular-eslint/no-output-native
  readonly closed = output<void>();
}
