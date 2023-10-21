import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../api.service';
import * as dataActions from './data.actions';
import { EMPTY, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class dataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.getdatas),
      switchMap(() => this.service.getData()),
      map((datas: any) => dataActions.getdatasSuccess({ datas })),
      catchError((error) => of(dataActions.error(error)))
    )
  );
  setData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.editdata),
      mergeMap(({ data }) => {
        console.log(data);

        return this.service.setData(data, data.id).pipe(
          map(() => dataActions.editdataSuccess({ data })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.adddata),
      mergeMap((data) => {
        console.log(data);

        return this.service.addData(data).pipe(
          map(() => dataActions.adddataSuccess({ data })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.deletedata),
      mergeMap(({ id }) => {
        return this.service.deleteData(id).pipe(
          map(() => dataActions.deletedataSuccess({ id })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );
  loadField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.getfield),
      mergeMap(() => {
        return this.service.getField().pipe(
          map((fields: any) => dataActions.getfieldSuccess({ fields })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );
  setField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.editfield),
      mergeMap(({ field }) => {
        return this.service.setField(field, field.id).pipe(
          map(() => dataActions.editfieldSuccess({ field })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );
  addField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.addfield),
      mergeMap((field) => {
        console.log(field);
        return this.service.addField(field).pipe(
          map((field: any) => dataActions.addfieldSuccess({ field })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );
  deleteField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.deletefield),
      mergeMap(({ id }) => {
        return this.service.deleteField(id).pipe(
          map(() => dataActions.deletefieldSuccess({ id })),
          catchError((error) => of(dataActions.error(error)))
        );
      })
    )
  );
  constructor(private actions$: Actions, private service: ApiService) {}
}
