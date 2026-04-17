import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CRMState } from './crm.reducer'

export const selectDataState = createFeatureSelector<CRMState>('CRM')

export const getCRMOrders = createSelector(
  selectDataState,
  (state: CRMState) => state.orders
)

export const getCRMClinets = createSelector(
  selectDataState,
  (state: CRMState) => state.client
)
