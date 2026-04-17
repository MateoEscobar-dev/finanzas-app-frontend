import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EcommerceState } from './ecommerce.reducer'

export const selectDataState =
  createFeatureSelector<EcommerceState>('Ecommerce')

export const getproducts = createSelector(
  selectDataState,
  (state: EcommerceState) => state.products
)

export const getOrders = createSelector(
  selectDataState,
  (state: EcommerceState) => state.orders
)

export const getCustomers = createSelector(
  selectDataState,
  (state: EcommerceState) => state.customers
)

export const getSellers = createSelector(
  selectDataState,
  (state: EcommerceState) => state.sellers
)
