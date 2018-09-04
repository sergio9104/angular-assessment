import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';


@Injectable()
export class DeactiveEmployee implements CanDeactivate<CreateEmployeeComponent> {

  canDeactivate(target: CreateEmployeeComponent) {
    if(target.userForm.dirty && !target.isSubmited){
        return window.confirm('Do you really want get out without save?');
    }
    return true;
  }
}