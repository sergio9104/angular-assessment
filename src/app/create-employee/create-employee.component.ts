import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { JobTitleComponent } from './../job-title/job-title.component';
import { CountryService } from './../services/countries.service';
import { ADD} from './../employees.reducer';


export interface UserData {
  id: number;
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

interface AppState {
  employees: Object;
}


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']

})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  @ViewChildren(JobTitleComponent) jobTitle !: QueryList<JobTitleComponent>;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dob: new FormControl({ value: '', disabled: true }, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9_-]")]),
    hireDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
    status: new FormControl(false),
    area: new FormControl('Services'),
    jobTitle: new FormControl('', [Validators.required]),
    tipRate: new FormControl(''),
  });

  areaSubscription: Subscription;
  jobTitleSubscription: Subscription;
  countriesSubscription: Subscription;

  showTipRate: Boolean = false;
  isSubmited: Boolean = false;

  maxDateDob = this.getAgeValidation();
  maxDateHire = new Date();

  countries:any;

  constructor(private countryService: CountryService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    console.log(this.userForm);
    this.subscriptions();
  }

  onSubmit() {
    this.store.dispatch({type: ADD, data:this.userForm.value});
    this.isSubmited = true;
    this.router.navigate(['/']);
  }

  subscriptions() {
    this.areaSubscription = this.userForm.get('area').valueChanges.subscribe(val => {
      this.jobTitle.first.jobTitlesValue(val)
    });

    this.jobTitleSubscription = this.userForm.get('jobTitle').valueChanges.subscribe(val => {
      if (val === "Waitress" || val === "Dinnig room manage") {
        this.userForm.get('tipRate').setValidators([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,10})?$")]);
        this.showTipRate = true;
      } else {
        this.userForm.get('tipRate').setValidators([]);
        this.userForm.get('tipRate').setValue(null);
        this.showTipRate = false;
      }
    });

    this.countriesSubscription = this.countryService.getCountries().subscribe(val => {
      this.countries = val;
    })
  }

  ngOnDestroy() {
    this.areaSubscription.unsubscribe();
    this.jobTitleSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
  }

  getAgeValidation() {
    var today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  }
  //new Date().getUTCMilliseconds();
}
