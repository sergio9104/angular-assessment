import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from '../components/create-employee/create-employee.component';


@Injectable()
export class DeactiveEmployee implements CanDeactivate<CreateEmployeeComponent> {

  canDeactivate(target: CreateEmployeeComponent) {
    if(target.userForm.dirty && !target.isSubmited){
      return window.confirm('Do you really want to exit without save?');
    }
    return true;
  }
}