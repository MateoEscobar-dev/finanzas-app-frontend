import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import { CrudService } from '@core/service/crud.service'
import {
  fetchEcommerceCustomer,
  fetchEcommerceCustomerFailure,
  fetchEcommerceCustomerSuccess,
  fetchEcommerceOrder,
  fetchEcommerceOrderFailure,
  fetchEcommerceOrderSuccess,
  fetchEcommerceProduct,
  fetchEcommerceProductFailure,
  fetchEcommerceProductSuccess,
  fetchEcommerceSeller,
  fetchEcommerceSellerFailure,
  fetchEcommerceSellerSuccess,
} from './ecommerce.actions'

@Injectable()
export class EcommerceEffects {
  // Product
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEcommerceProduct),
      mergeMap(() =>
        this.CrudService.fetchproduct().pipe(
          map((products) => fetchEcommerceProductSuccess({ products })),
          catchError((error) => of(fetchEcommerceProductFailure({ error })))
        )
      )
    )
  )

  // Order
  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEcommerceOrder),
      mergeMap(() =>
        this.CrudService.fetchOrder().pipe(
          map((orders) => fetchEcommerceOrderSuccess({ orders })),
          catchError((error) => of(fetchEcommerceOrderFailure({ error })))
        )
      )
    )
  )

  // Customers
  fetchCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEcommerceCustomer),
      mergeMap(() =>
        this.CrudService.fetchCustomer().pipe(
          map((customers) => fetchEcommerceCustomerSuccess({ customers })),
          catchError((error) => of(fetchEcommerceCustomerFailure({ error })))
        )
      )
    )
  )

  // Seller
  fetchSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEcommerceSeller),
      mergeMap(() =>
        this.CrudService.fetchSeller().pipe(
          map((sellers) => fetchEcommerceSellerSuccess({ sellers })),
          catchError((error) => of(fetchEcommerceSellerFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
