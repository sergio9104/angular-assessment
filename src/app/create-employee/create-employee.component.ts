import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

export interface UserData {
  name: string;
  dob: Date;
  country: string;
  username: string;
  hireDate: Date;
  status: boolean;
  area: string;
  jobTitle: string;
  tipRate: number;
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    country: new FormControl(''),
    username: new FormControl(''),
    hireDate: new FormControl(''),
    status: new FormControl(''),
    area: new FormControl(''),
    jobTitle: new FormControl(''),
    tipRate: new FormControl(''),
  });
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){

  }

}
