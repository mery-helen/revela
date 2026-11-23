import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
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

  it('should sign in a user whose email matches case-insensitively and ignoring surrounding spaces when the password is identical', () => {
    let signedInUser: User | null | undefined;

    repository.signIn('  MARIA@EXAMPLE.COM  ', '123456').subscribe((user) => {
      signedInUser = user;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    const users: StoredUser[] = [
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ];
    request.flush(users);

    expect(signedInUser).toEqual<User>({ id: '1', name: 'Maria', email: 'maria@example.com' });
    expect(signedInUser).not.toHaveProperty('password');
  });

  it('should return null when signing in with an email that does not exist', () => {
    let signedInUser: User | null | undefined;

    repository.signIn('outro@example.com', '123456').subscribe((user) => {
      signedInUser = user;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    const users: StoredUser[] = [
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ];
    request.flush(users);

    expect(signedInUser).toBeNull();
  });

  it('should return null when signing in with a password that does not match', () => {
    let signedInUser: User | null | undefined;

    repository.signIn('maria@example.com', 'wrong-password').subscribe((user) => {
      signedInUser = user;
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    const users: StoredUser[] = [
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ];
    request.flush(users);

    expect(signedInUser).toBeNull();
  });

  it('should propagate an HTTP error through the error callback when signing in', () => {
    let emittedUser: User | null | undefined;
    let receivedError: HttpErrorResponse | undefined;

    repository.signIn('maria@example.com', '123456').subscribe({
      next: (user) => {
        emittedUser = user;
      },
      error: (error: HttpErrorResponse) => {
        receivedError = error;
      },
    });

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');
    request.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(emittedUser).toBeUndefined();
    expect(receivedError).toBeInstanceOf(HttpErrorResponse);
    expect(receivedError?.status).toBe(500);
  });
});
