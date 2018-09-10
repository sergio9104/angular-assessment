import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { REMOVE } from '../reducers/employees.reducer';

@Injectable()
export class DialogEffects {
    @Effect()
    openDialog = this.actions.pipe(
        ofType(REMOVE),
        map(_ => {
            return {type:"SHOW_MESSAGE"};
        })
    );

    constructor(private actions: Actions) { }
}