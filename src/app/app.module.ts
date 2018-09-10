import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { JobTitleComponent } from './job-title/job-title.component';

import { CountryService } from './services/countries.service';
import { DeactiveEmployee } from './services/can-deactive.service';
import { ActiveRoute } from './services/can-active.service';



import { employeesReducer } from './reducers/employees.reducer';

import { DialogEffects } from './effects/dialog.effects';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'newuser', component: CreateEmployeeComponent, canDeactivate: [DeactiveEmployee]},
  { path: ':id/edit/:edit', component: EditEmployeeComponent,  canActivate: [ActiveRoute], canDeactivate: [DeactiveEmployee]},
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    JobTitleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ employees: employeesReducer }),
    EffectsModule.forRoot([DialogEffects]),
    EffectsModule.forFeature([DialogEffects]),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  exports: [
    RouterModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [CountryService, DeactiveEmployee, ActiveRoute],
  bootstrap: [AppComponent]
})
export class AppModule { }
