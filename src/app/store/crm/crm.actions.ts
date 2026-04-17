import { createAction, props } from '@ngrx/store'
import { Client, Order } from '@core/model/crm.model'

export const fetchCrmOrder = createAction('[Order] Fetch CRM Order')
export const fetchCrmOrderSuccess = createAction(
  '[Order] Fetch CRM Order Success',
  props<{ orders: Order[] }>()
)
export const fetchCrmOrderFailure = createAction(
  '[Data] Fetch CRM Order Failure',
  props<{ error: string }>()
)

// Client
export const fetchCrmClient = createAction('[Order] Fetch CRM Client')
export const fetchCrmClientSuccess = createAction(
  '[Order] Fetch CRM Client Success',
  props<{ client: Client[] }>()
)
export const fetchCrmClientFailure = createAction(
  '[Data] Fetch CRM Client Failure',
  props<{ error: string }>()
)

export const addCrmOrder = createAction(
  '[Order] Add CRM Order',
  props<{ orders: Order[] }>()
)
export const addCrmOrderSuccess = createAction(
  '[Order] Add CRM Order Success',
  props<{ orders: Order[] }>()
)
export const addCrmOrderFailure = createAction(
  '[Order] Add CRM Order Failure',
  props<{ error: string }>()
)
