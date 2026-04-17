import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import { CrudService } from '@core/service/crud.service'
import {
  addCrmOrder,
  addCrmOrderFailure,
  addCrmOrderSuccess,
  fetchCrmClient,
  fetchCrmClientFailure,
  fetchCrmClientSuccess,
  fetchCrmOrder,
  fetchCrmOrderFailure,
  fetchCrmOrderSuccess,
} from './crm.actions'

@Injectable()
export class CRMEffects {
  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCrmOrder),
      mergeMap(() =>
        this.CrudService.fetchCRMOrder().pipe(
          map((orders) => fetchCrmOrderSuccess({ orders })),
          catchError((error) => of(fetchCrmOrderFailure({ error })))
        )
      )
    )
  )

  addEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCrmOrder),
      mergeMap(({ orders }) =>
        this.CrudService.addCalendarEvents(orders).pipe(
          map(() => addCrmOrderSuccess({ orders })),
          catchError((error) => of(addCrmOrderFailure({ error })))
        )
      )
    )
  )

  // Client
  fetchClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCrmClient),
      mergeMap(() =>
        this.CrudService.fetchCRMClient().pipe(
          map((client) => fetchCrmClientSuccess({ client })),
          catchError((error) => of(fetchCrmClientFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
