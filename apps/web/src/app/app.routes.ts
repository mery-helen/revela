import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then((m) => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('./features/groups/pages/groups-list-page/groups-list-page').then(
        (m) => m.GroupsListPage,
      ),
  },
];
