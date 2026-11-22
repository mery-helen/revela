// TODO #26: Substituir json-server pelo BaaS real.
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CreateAccountPayload } from '../models/create-account-payload.model';
import { StoredUser } from '../models/stored-user.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly usersUrl = `${environment.apiUrl}/users`;

  createAccount(payload: CreateAccountPayload): Observable<User> {
    return this.http.post<StoredUser>(this.usersUrl, payload).pipe(map((user) => this.toUser(user)));
  }

  isEmailRegistered(email: string): Observable<boolean> {
    const normalizedEmail = this.normalizeEmail(email);

    return this.http
      .get<StoredUser[]>(this.usersUrl)
      .pipe(map((users) => users.some((user) => this.normalizeEmail(user.email) === normalizedEmail)));
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private toUser(user: StoredUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
