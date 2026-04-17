import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  clients,
  defaultEvents,
  kanbantasks,
  orderData,
  orders,
  products,
} from '../data'
import { customers, sellers } from '@core/data/ecommerce'
import { projects } from '@core/data/project'
import { EventInput } from '@fullcalendar/core'
import { Client, Order } from '@core/model/crm.model'
import { product, Orders, Customer, Seller } from '@core/model/ecommerce.model'
import { Project } from '@core/model/project.model'
import { KanbanTaskItem } from '@core/model/tasks.model'

@Injectable({ providedIn: 'root' })
export class CrudService {
  constructor() {}

  /***
   * Get
   */
  fetchCalendarEvents(): Observable<EventInput[]> {
    return of(defaultEvents)
  }

  addCalendarEvents(newData: EventInput): Observable<EventInput[]> {
    let newEvents = [...defaultEvents, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newEvents)
  }

  updateCalendarEvents(updatedData: EventInput): Observable<EventInput[]> {
    const index = defaultEvents.findIndex((item) => item.id === updatedData.id)
    let updatedEvents = defaultEvents.slice()
    if (index !== -1) {
      updatedEvents[index] = updatedData
    }
    return of(updatedEvents)
  }

  deleteCalendarEvents(id: string): Observable<EventInput[]> {
    return of(defaultEvents.filter((item) => item.id !== id))
  }

  // CRM Order
  fetchCRMOrder(): Observable<Order[]> {
    return of(orderData)
  }

  // CRM Client
  fetchCRMClient(): Observable<Client[]> {
    return of(clients)
  }

  // Ecommerce Product
  fetchproduct(): Observable<product[]> {
    return of(products)
  }

  // Ecommerce Order
  fetchOrder(): Observable<Orders[]> {
    return of(orders)
  }

  // Ecommerce Customer
  fetchCustomer(): Observable<Customer[]> {
    return of(customers)
  }

  // Ecommerce Seller
  fetchSeller(): Observable<Seller[]> {
    return of(sellers)
  }

  // Project List
  fetchproject(): Observable<Project[]> {
    return of(projects)
  }

  // Task Kanabn List
  fetchkanbantask(): Observable<KanbanTaskItem[]> {
    return of(kanbantasks)
  }

  addkanbantask(newData: KanbanTaskItem): Observable<KanbanTaskItem[]> {
    let newTasks = [...kanbantasks, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newTasks)
  }

  updatekanbantask(updatedData: KanbanTaskItem): Observable<KanbanTaskItem[]> {
    const index = kanbantasks.findIndex((item) => item.id === updatedData.id)
    let updatedEvents = kanbantasks.slice()
    if (index !== -1) {
      updatedEvents[index] = updatedData
    }
    return of(updatedEvents)
  }

  deletekanbantask(id: number): Observable<KanbanTaskItem[]> {
    return of(kanbantasks.filter((item) => item.id !== id))
  }
}
