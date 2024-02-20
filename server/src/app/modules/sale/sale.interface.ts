import { Types } from 'mongoose'

export type TSale = {
  shoeId: Types.ObjectId
  quantitySold: number
  buyer?: Types.ObjectId
  seller?: Types.ObjectId
  saleDate:string,
  unAuthorizedbuyerName?:string,
  price:number
  polishId:Types.ObjectId;
  totalAmount?: number
  paymentMethod?: string
  shippingAddress?: string; 
  isDelivered?: boolean; 
  deliveryDate?: Date;
  notes?: string; 
  discount?: number;
  tax?: number;
}
