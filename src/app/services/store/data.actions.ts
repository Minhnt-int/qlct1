import { createAction, props } from '@ngrx/store';
import { field } from './fieldModel';

export const GETDATAS = '@data/getdatas';
export const GETDATAS_SUCCESS = '@data/getdatasSuccess';
export const GETDATA = '@data/getdata';
export const GETDATA_SUCCESS = '@data/getdataSuccess';
export const DELETEDATAS = '@data/deletedatas';
export const DELETEDATAS_SUCCESS = '@data/deletedatasSuccess';
export const DELETEDATA = '@data/deletedata';
export const DELETEDATA_SUCCESS = '@data/deletedataSuccess';
export const EDITDATA = '@data/editdata';
export const EDITDATA_SUCCESS = '@data/editdataSuccess';
export const ADDDATA = '@data/adddata';
export const ADDDATA_SUCCESS = '@data/adddataSuccess';
export const GETFIELD = '@data/getfield';
export const GETFIELD_SUCCESS = '@data/getfieldSuccess';
export const EDITFIELD = '@data/editfield';
export const EDITFIELD_SUCCESS = '@data/editfieldSuccess';
export const ADDFIELD = '@data/addfield';
export const ADDFIELD_SUCCESS = '@data/addfieldSuccess';
export const DELETEFIELD = '@data/deletefield';
export const DELETEFIELD_SUCCESS = '@data/deletefieldSuccess';

export const getdatas = createAction(GETDATAS);
export const getdatasSuccess = createAction(
  GETDATAS_SUCCESS,
  props<{ datas: any[] }>()
);
export const getdata = createAction(GETDATA);
export const getdataSuccess = createAction(
  GETDATA_SUCCESS,
  props<{ data: any }>()
);
export const deletedatas = createAction(
  DELETEDATAS,
  props<{ ids: string[] }>()
);
export const deletedatasSuccess = createAction(
  DELETEDATAS_SUCCESS,
  props<{ ids: string[] }>()
);
export const deletedata = createAction(DELETEDATA, props<{ id: string }>());
export const deletedataSuccess = createAction(
  DELETEDATA_SUCCESS,
  props<{ id: string }>()
);
export const editdata = createAction(EDITDATA, props<any>());
export const editdataSuccess = createAction(
  EDITDATA_SUCCESS,
  props<{ data: any }>()
);
export const adddata = createAction(ADDDATA, props<{ data: any }>());
export const adddataSuccess = createAction(
  ADDDATA_SUCCESS,
  props<{ data: any }>()
);
export const getfield = createAction(GETFIELD);
export const getfieldSuccess = createAction(
  GETFIELD_SUCCESS,
  props<{ fields: any[] }>()
);
export const editfield = createAction(EDITFIELD, props<{ field: any }>());
export const editfieldSuccess = createAction(
  EDITFIELD_SUCCESS,
  props<{ field: any }>()
);
export const addfield = createAction(ADDFIELD, props<{ field: field }>());
export const addfieldSuccess = createAction(
  ADDFIELD_SUCCESS,
  props<{ field: field }>()
);
export const deletefield = createAction(DELETEFIELD, props<{ id: string }>());
export const deletefieldSuccess = createAction(
  DELETEFIELD_SUCCESS,
  props<{ id: string }>()
);
export const error = createAction('error', props<{ error: string }>());

export const dataactions = {
  getdatas,
  getdatasSuccess,
  getdata,
  getdataSuccess,
  deletedatas,
  deletedatasSuccess,
  deletedata,
  deletedataSuccess,
  editdata,
  editdataSuccess,
  adddata,
  adddataSuccess,
  getfield,
  getfieldSuccess,
  editfield,
  editfieldSuccess,
  addfield,
  addfieldSuccess,
  deletefield,
  deletefieldSuccess,
  error,
};
