import { Types } from 'mongoose'

export type TSale = {
  shoeId: Types.ObjectId
  quantitySold: number
  buyer?: Types.ObjectId
  seller: Types.ObjectId
  saleDate:string
  price:number
  totalAmount?: number
  paymentMethod?: string
  shippingAddress?: string; 
  isDelivered?: boolean; 
  deliveryDate?: Date;
  notes?: string; 
  discount?: number;
  tax?: number;
}
