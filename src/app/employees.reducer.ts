import { Action } from '@ngrx/store';

export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

const initialState = [];

export function employeesReducer(state: Array<Object> = initialState, action: Action) {
  switch (action.type) {
    case ADD:
      return [...state, action.data];
    case EDIT:
        return state.map((value) =>{
            return value === action ? action : value;
        }) 

    case REMOVE:
        return state.filter(value => value !== action);

    default:
      return state;
  }
}