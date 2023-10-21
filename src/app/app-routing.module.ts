import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './pages/test/test/test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cthn' },
  {
    path: 'cthn',
    loadChildren: () =>
      import('./pages/cthn/cthn.module').then((m) => m.CthnModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'test',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
