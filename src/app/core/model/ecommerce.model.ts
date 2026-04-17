export interface product {
  id: number
  name: string
  category: string
  image: string
  added_date: string
  rating: number
  price: number
  quantity: number
  status: boolean
}

export interface Orders {
  id: number
  order_id: string
  order_date: string
  order_time: string
  icon: string
  payment_status: string
  total: string
  payment_method: string
  order_status: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  location: string
  created_on: string
  status: string
  avatar: string
}

export interface Seller {
  id: number
  name: string
  store: string
  products: number
  created_on: string
  balance: string
  image: string
  chart?: any
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: string
  total: string
}

export interface ShippingAddress {
  provider: string
  address_1: string
  address_2: string
  phone: string
  mobile: string
}

export interface Billing {
  type: string
  provider: string
  valid: string
}

export interface DeliveryInfoItem {
  provider: string
  order_id: string
  payment_mode: string
}

export interface OrderDetailsItem {
  id: string
  order_status?: string
  items: OrderItem[]
  gross_total: string
  shipping_charge: string
  tax: string
  net_total: string
  shipping: ShippingAddress
  billing: Billing
  delivery: DeliveryInfoItem
}

export interface CartItem {
  id: number
  image: string
  name: string
  size: string
  color: string
  price: number
  qty: number
  total: number
}

export interface CartSummaryItem {
  gross_total: number
  discount: number
  shipping_charge: number
  tax: number
  net_total: number
}
