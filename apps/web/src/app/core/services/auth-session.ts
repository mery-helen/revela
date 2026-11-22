import { Injectable, signal } from '@angular/core';

import { User } from '../data/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthSession {
  readonly authenticatedUser = signal<User | null>(null);

  setAuthenticatedUser(user: User): void {
    this.authenticatedUser.set(user);
  }
}
