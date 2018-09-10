import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { JobTitleComponent } from './../job-title/job-title.component';
import { CountryService } from './../services/countries.service';
import { EDIT } from '../reducers/employees.reducer';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @ViewChildren(JobTitleComponent) jobTitle !: QueryList<JobTitleComponent>;

  userForm: any;
  areaSubscription: Subscription;
  jobTitleSubscription: Subscription;
  countriesSubscription: Subscription;
  usersSubscribe: Subscription;

  showTipRate: boolean;
  isSubmited: boolean;
  countries: any;

  maxDateDob: Date;
  maxDateHire: Date;
  minDate: Date;

  user: any;

  edit: boolean;
  title: string;

  constructor(private countryService: CountryService, private store: Store<any>, private router: Router, private route: ActivatedRoute) {
    this.maxDateDob = this.getAgeValidation();
    this.maxDateHire = new Date();
    this.minDate = new Date("01/01/1900");
    this.showTipRate = false;
  }

  ngOnInit() {
    this.subscriptions();

  }

  onSubmit() {
    if (this.userForm.valid) {
      this.store.dispatch({ type: EDIT, data: this.userForm.value });
      this.isSubmited = true;
      this.router.navigate(['/']);
    }
  }

  subscriptions() {

    this.usersSubscribe = this.store.subscribe((users) => {
      const id = this.route.snapshot.paramMap.get('id');
      this.edit = this.route.snapshot.paramMap.get('edit') != 'true';
      this.title = this.edit ? 'Viewing' : 'Editing'
      this.user = users.employees.find((user) => {
        return user.id == id;
      })
      this.userForm = new FormGroup({
        id: new FormControl({ value: this.user.id, disabled: this.edit }),
        name: new FormControl({ value: this.user.name, disabled: this.edit }, [Validators.required, Validators.maxLength(20)]),
        dob: new FormControl({ value: this.user.dob, disabled: this.edit }, [Validators.required]),
        country: new FormControl({ value: this.user.country, disabled: this.edit }, [Validators.required]),
        username: new FormControl({ value: this.user.username, disabled: this.edit }, [Validators.required, Validators.pattern("^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$"), Validators.maxLength(20)]),
        hireDate: new FormControl({ value: this.user.hireDate, disabled: this.edit }, [Validators.required]),
        status: new FormControl({ value: this.user.status, disabled: this.edit }),
        area: new FormControl({ value: this.user.area, disabled: this.edit }),
        jobTitle: new FormControl({ value: this.user.jobTitle, disabled: this.edit }, [Validators.required]),
        tipRate: new FormControl({ value: this.user.tipRate, disabled: this.edit }),
      });

      this.tipValidation(this.user.jobTitle);
    })



    this.areaSubscription = this.userForm.get('area').valueChanges.subscribe(val => {
      this.jobTitle.first.jobTitlesValue(val)
    });

    this.jobTitleSubscription = this.userForm.get('jobTitle').valueChanges.subscribe(val => {
      this.tipValidation(val);
    });

    this.countriesSubscription = this.countryService.getCountries().subscribe(val => {
      this.countries = val;
    })
  }

  ngOnDestroy() {
    this.areaSubscription.unsubscribe();
    this.jobTitleSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
    this.usersSubscribe.unsubscribe();
  }

  tipValidation(val) {
    if (val === "Waitress" || val === "Dinnig room manage") {
      this.userForm.get('tipRate').setValidators([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,10})?$"), Validators.maxLength(6)]);
      this.showTipRate = true;
    } else {
      this.userForm.get('tipRate').setValidators([]);
      this.userForm.get('tipRate').setValue(null);
      this.showTipRate = false;
    }
  }

  getAgeValidation() {
    var today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  }

}
