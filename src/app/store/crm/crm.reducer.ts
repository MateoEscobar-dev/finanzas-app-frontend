import { createReducer, on, Action } from '@ngrx/store'
import {
  addCrmOrderSuccess,
  fetchCrmClient,
  fetchCrmClientSuccess,
  fetchCrmOrder,
  fetchCrmOrderSuccess,
} from './crm.actions'
import { Client, Order } from '@core/model/crm.model'

export type CRMState = {
  orders: Order[]
  client: Client[]
}

export const initialState: CRMState = {
  orders: [],
  client: [],
}

export const CRMReducer = createReducer(
  initialState,
  on(fetchCrmOrder, (state) => {
    return { ...state }
  }),
  on(fetchCrmOrderSuccess, (state, { orders }) => {
    return { ...state, orders }
  }),

  on(addCrmOrderSuccess, (state, { orders }) => {
    return { ...state, events: [...state.orders, orders], error: null }
  }),

  on(fetchCrmClient, (state) => {
    return { ...state }
  }),
  on(fetchCrmClientSuccess, (state, { client }) => {
    return { ...state, client }
  })
  // on(updateCalendarSuccess, (state, { events }) => {
  //   return {
  //     ...state,
  //     events: state.events.map((event) =>
  //       event.id == events.id ? events : event
  //     ),
  //     error: null,
  //   };
  // }),

  // on(deleteCalendarSuccess, (state, { id }) => {
  //   return {
  //     ...state,
  //     events: state.events.filter((event) => event.id !== id),
  //     error: null,
  //   };
  // })
)

// Selector
export function reducer(state: CRMState | undefined, action: Action) {
  return CRMReducer(state, action)
}
