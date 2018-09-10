import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class ActiveRoute implements CanActivate {
  constructor(private store: Store<any>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let valueReturn = true;
    this.store.subscribe((users) => {
      const id = route.params.id;
      const edit = route.params.edit;
      if(edit != 'true' && edit != 'false'){
        valueReturn = false;
      }
      let user = users.employees.find((user) => {
        return user.id == id;
      })

      if(!user){
        valueReturn = false
      }
    })
    if(!valueReturn){
      this.router.navigate(['/']);
    }
    return valueReturn;
  }
}