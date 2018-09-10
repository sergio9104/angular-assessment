import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { DeactiveEmployee } from './services/can-deactive.service';
import { ActiveRoute } from './services/can-active.service';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'newuser', component: CreateEmployeeComponent, canDeactivate: [DeactiveEmployee]},
    { path: ':id/edit/:edit', component: EditEmployeeComponent,  canActivate: [ActiveRoute], canDeactivate: [DeactiveEmployee]},
    { path: '**', component: DashboardComponent }
  ];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
],
  exports: [RouterModule],
  providers: [DeactiveEmployee, ActiveRoute],
})
export class AppRoutingModule { }