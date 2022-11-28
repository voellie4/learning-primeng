export interface Product {
    id: number,
    name: string,
    price: number,
    category: string,
    status: string,
    remarks: string
}
  
export interface Customer {
    id: number,
    productId: number,
    orderNumber: string,
    customerName: string,
    quantity: number,
    totalPrice: number
}