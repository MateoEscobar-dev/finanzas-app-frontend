import { createReducer, on, Action } from '@ngrx/store'
import {
  fetchEcommerceCustomer,
  fetchEcommerceCustomerSuccess,
  fetchEcommerceOrder,
  fetchEcommerceOrderSuccess,
  fetchEcommerceProduct,
  fetchEcommerceProductSuccess,
  fetchEcommerceSeller,
  fetchEcommerceSellerSuccess,
} from './ecommerce.actions'
import { Customer, Orders, Seller, product } from '@core/model/ecommerce.model'

export type EcommerceState = {
  products: product[]
  orders: Orders[]
  customers: Customer[]
  sellers: Seller[]
}

export const initialState: EcommerceState = {
  products: [],
  orders: [],
  customers: [],
  sellers: [],
}

export const EcommerceReducer = createReducer(
  initialState,
  on(fetchEcommerceProduct, (state) => {
    return { ...state }
  }),
  on(fetchEcommerceProductSuccess, (state, { products }) => {
    return { ...state, products }
  }),

  // Order
  on(fetchEcommerceOrder, (state) => {
    return { ...state }
  }),
  on(fetchEcommerceOrderSuccess, (state, { orders }) => {
    return { ...state, orders }
  }),

  // Customer
  on(fetchEcommerceCustomer, (state) => {
    return { ...state }
  }),
  on(fetchEcommerceCustomerSuccess, (state, { customers }) => {
    return { ...state, customers }
  }),

  // Seller
  on(fetchEcommerceSeller, (state) => {
    return { ...state }
  }),
  on(fetchEcommerceSellerSuccess, (state, { sellers }) => {
    return { ...state, sellers }
  })
)

// Selector
export function reducer(state: EcommerceState | undefined, action: Action) {
  return EcommerceReducer(state, action)
}
