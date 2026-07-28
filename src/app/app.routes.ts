import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { TenantList } from './pages/tenant-list/tenant-list';
import { AddTenant } from './pages/add-tenant/add-tenant';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },

  {
    path: 'dashboard',
    component: Dashboard,
  },

  {
    path: 'tenants',
    component: TenantList,
  },

  {
    path: 'add-tenant',
    component: AddTenant,
  },

  {
    path: 'update-tenant/:id',
    component: AddTenant,
  },
];
