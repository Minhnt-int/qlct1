import { createReducer, on } from '@ngrx/store';
import * as actions from './data.actions';
export interface dataState {
  items: any[];
  fields: any[];
  currentitem: any | null;
  status: string;
  error: string;
  datasort: 'asc' | 'dsc' | null;
  totaladay: number[];
}
const initialstate: dataState = {
  items: [],
  fields: [],
  currentitem: null,
  status: 'idle',
  error: '',
  datasort: 'dsc',
  totaladay: [],
};
export const datareducer = createReducer(
  initialstate,
  on(actions.getdatas, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.getdatasSuccess, (state, { datas }) => {
    let totaladay = datas.map((data: any) => {
      let total = 0;
      for (let i = 0; i < state.fields?.length; i++) {
        total += data[state.fields[i]];
      }
      return total;
    });
    let listdata = datas.map((item) => {
      return {
        ...item,
        date: item.date.toDate(),
        // date: item.date,
      };
    });
    console.log(datas);

    return {
      ...state,
      items: listdata,
      totaladay: totaladay,
      status: 'idle',
    };
  }),
  on(actions.getdata, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.getdataSuccess, (state, { data }) => {
    return {
      ...state,
      items: {
        ...state.items,
        data,
      },
      status: 'idle',
    };
  }),
  on(actions.deletedatas, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.deletedatasSuccess, (state, { ids }) => {
    let items: any[] = state.items;
    items = items.filter((item) => !ids.includes(item.id));
    return {
      ...state,
      items: items,
      status: 'idle',
    };
  }),
  on(actions.deletedata, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.deletedataSuccess, (state, { id }) => {
    let items: any[] = state.items;
    items = items.filter((item) => id !== item.id);
    return {
      ...state,
      items: items,
      status: 'idle',
    };
  }),
  on(actions.editdata, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.editdataSuccess, (state, { data }) => {
    let items: any[] = [...state.items];
    let i = state.items.findIndex((item: any) => item.id === data.id);

    if (i !== -1) items[i] = data;
    return {
      ...state,
      items: items,
      status: 'idle',
    };
  }),
  on(actions.adddata, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.adddataSuccess, (state, data) => {
    console.log(data);

    let datas: any[] = [...state.items, data];
    return {
      ...state,
      items: datas,
      status: 'idle',
    };
  }),
  on(actions.getfield, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.getfieldSuccess, (state, { fields }) => {
    console.log(fields);

    return {
      ...state,
      fields: fields,
      status: 'idle',
    };
  }),
  on(actions.editfield, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.editfieldSuccess, (state, { field }) => {
    let fields: any[] = state.fields;
    let i = fields.findIndex((item: any) => item.id === field.id);
    if (i !== -1) fields[i] = field;
    return {
      ...state,
      fields: fields,
      status: 'idle',
    };
  }),
  on(actions.addfield, (state: any, field) => {
    console.log(field);

    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.addfieldSuccess, (state, field) => {
    console.log('bar');

    let fields: any[] = [...state.fields, field];
    return {
      ...state,
      fields: fields,
      status: 'idle',
    };
  }),
  on(actions.deletefield, (state: any) => {
    return {
      ...state,
      status: 'loading',
    };
  }),
  on(actions.deletefieldSuccess, (state, { id }) => {
    let fields: any[] = state.fields;
    fields = fields.filter((field) => id !== field.id);
    return {
      ...state,
      fields: fields,
      status: 'idle',
    };
  }),
  on(actions.error, (state, { error }) => {
    console.log('error');

    return {
      ...state,
      error: error,
    };
  })
);
