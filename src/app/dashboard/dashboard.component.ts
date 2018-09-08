import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { REMOVE } from './../employees.reducer';

export interface dataStructure {
  id: number;
  name: string;
  username: string;
  jobTitle:string;
  age: string;
  hireDate: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersSubscribe: Subscription;

  displayedColumns: string[];
  dataSource: MatTableDataSource<dataStructure>;
  data: Array<dataStructure>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<any>, private router: Router) {
    this.displayedColumns = ['name', 'age', 'username', 'hireDate', 'icons'];
  }

  ngOnInit() {
    this.usersSubscribe = this.store.subscribe((users) => {
      this.data = users.employees.map((user => {
        return {
          id: user.id,
          name: user.name,
          jobTitle: user.jobTitle,
          age: this.calculateAge(user.dob),
          username: user.username,
          hireDate: user.hireDate
        }
      }))
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.usersSubscribe.unsubscribe();
  }

  calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  edit(id) {
    this.router.navigate(['/'+id]);
  }

  view(id) {
    this.router.navigate(['/'+id+'/view']);
  }

  delete(id) {
    this.store.dispatch({ type: REMOVE, id:id});
  }



}

