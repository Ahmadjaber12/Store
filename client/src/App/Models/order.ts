export interface order {
    id: number
    buyerId: string
    shipping: Shipping
    dateTime: string
    items: Item[]
    subTotal: number
    deliveryFree: number
    orderStatus: string
    total: number
  }
  
  export interface Shipping {
    fullName: string
    address1: string
    address2: string
    zip: string
    state: string
    city: string
    country: string
  }
  
  export interface Item {
    productId: number
    name: string
    pictureUrl: string
    price: number
    quentity: number
  }