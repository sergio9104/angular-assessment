export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

interface objectState {
    id: number;
    name: string,
    dob: Date,
    country: string,
    username: string,
    hireDate: Date,
    status:boolean,
    area: string,
    jobTitle: string,
    tipRate: number,
}

const initialState = [{
    id: 1,
    name: 'Giacomo Guilizzoni',
    dob: new Date("01/01/1978"),
    country: 'Italy',
    username: 'Peldi',
    hireDate: new Date('2017/10/01'),
    status:false,
    area: 'Services',
    jobTitle: 'Host',
    tipRate: null,
  },
  {
    id: 2,
    name: 'Marco Botton',
    dob: new Date("01/01/1980"),
    country: 'Italy',
    username: 'Marcopolo',
    hireDate: new Date('2001/01/10'),
    status:false,
    area: 'Services',
    jobTitle: 'Tuttofare',
    tipRate: null,
  },
  {
    id: 3,
    name: 'Mariah Moclachlan',
    dob: new Date("01/01/1977"),
    country: 'Italy',
    username: 'Patata',
    hireDate: new Date('2016/02/01'),
    status:false,
    area: 'Services',
    jobTitle: 'Waitress',
    tipRate: 0.11,
  },
  {
    id: 4,
    name: 'Valerie Liberty',
    dob: new Date("01/01/1988"),
    country: 'Italy',
    username: 'Val',
    hireDate: new Date('2018/03/02'),
    status:false,
    area: 'Services',
    jobTitle: 'Manager',
    tipRate: null,
  }];

export function employeesReducer(state: Array<objectState> = initialState, action) {
  switch (action.type) {
    case ADD:
      return [...state, action.data];
    case EDIT:
        return state.map((value) =>{
            return value.id === action.data.id ? action.data : value;
        }) 
    case REMOVE:
        return state.filter(value => value.id !== action.id);

    default:
      return state;
  }
}