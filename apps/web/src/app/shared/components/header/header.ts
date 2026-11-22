import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  readonly menuToggle = output<void>();
}
