import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { CreateAccountPayload } from '../models/create-account-payload.model';
import { StoredUser } from '../models/stored-user.model';
import { User } from '../models/user.model';
import { AuthRepository } from './auth-repository';

describe('AuthRepository', () => {
  let repository: AuthRepository;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    repository = TestBed.inject(AuthRepository);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create an account by sending user data', () => {
    const payload: CreateAccountPayload = {
      name: 'Maria',
      email: 'maria@example.com',
      password: '123456',
    };
    let createdUser: User | undefined;

    repository.createAccount(payload).subscribe((user) => {
      createdUser = user;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);

    const response: StoredUser = { id: '1', ...payload };
    request.flush(response);

    expect(createdUser).toEqual<User>({ id: '1', name: 'Maria', email: 'maria@example.com' });
  });

  it('should report email as registered case-insensitively and ignoring surrounding spaces', () => {
    let isRegistered: boolean | undefined;

    repository.isEmailRegistered('  MARIA@EXAMPLE.COM  ').subscribe((result) => {
      isRegistered = result;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    const users: StoredUser[] = [
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ];
    request.flush(users);

    expect(isRegistered).toBe(true);
  });

  it('should report email as not registered when no user matches after normalization', () => {
    let isRegistered: boolean | undefined;

    repository.isEmailRegistered('  outro@example.com ').subscribe((result) => {
      isRegistered = result;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    const users: StoredUser[] = [
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ];
    request.flush(users);

    expect(isRegistered).toBe(false);
  });
});
