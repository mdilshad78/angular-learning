import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from '../auth-guard';

const routes: Routes = [
  { path: '', redirectTo: "dashboard", pathMatch: 'full' },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]   // 🔥 Guard will work here
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
