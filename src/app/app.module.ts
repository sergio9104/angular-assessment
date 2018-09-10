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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { JobTitleComponent } from './components/job-title/job-title.component';

import { CountryService } from './services/countries.service';

import { employeesReducer } from './reducers/employees.reducer';

import { DialogEffects } from './effects/dialog.effects';

import {AppRoutingModule} from './app.routing';


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
    StoreModule.forRoot({ employees: employeesReducer }),
    EffectsModule.forRoot([DialogEffects]),
    EffectsModule.forFeature([DialogEffects]),
    HttpClientModule,
    AppRoutingModule,
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
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
