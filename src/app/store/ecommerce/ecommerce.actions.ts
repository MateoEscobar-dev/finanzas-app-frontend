import { Customer, Orders, Seller, product } from '@core/model/ecommerce.model'
import { createAction, props } from '@ngrx/store'

// Product
export const fetchEcommerceProduct = createAction(
  '[Order] Fetch Ecommerce Product'
)
export const fetchEcommerceProductSuccess = createAction(
  '[Order] Fetch Ecommerce Product Success',
  props<{ products: product[] }>()
)
export const fetchEcommerceProductFailure = createAction(
  '[Data] Fetch Ecommerce Product Failure',
  props<{ error: string }>()
)

// Order
export const fetchEcommerceOrder = createAction('[Order] Fetch Ecommerce Order')
export const fetchEcommerceOrderSuccess = createAction(
  '[Order] Fetch Ecommerce Order Success',
  props<{ orders: Orders[] }>()
)
export const fetchEcommerceOrderFailure = createAction(
  '[Data] Fetch Ecommerce Order Failure',
  props<{ error: string }>()
)

// Customer
export const fetchEcommerceCustomer = createAction(
  '[Order] Fetch Ecommerce Customer'
)
export const fetchEcommerceCustomerSuccess = createAction(
  '[Order] Fetch Ecommerce Customer Success',
  props<{ customers: Customer[] }>()
)
export const fetchEcommerceCustomerFailure = createAction(
  '[Data] Fetch Ecommerce Customer Failure',
  props<{ error: string }>()
)

// Seller
export const fetchEcommerceSeller = createAction(
  '[Order] Fetch Ecommerce Seller'
)
export const fetchEcommerceSellerSuccess = createAction(
  '[Order] Fetch Ecommerce Seller Success',
  props<{ sellers: Seller[] }>()
)
export const fetchEcommerceSellerFailure = createAction(
  '[Data] Fetch Ecommerce Seller Failure',
  props<{ error: string }>()
)
