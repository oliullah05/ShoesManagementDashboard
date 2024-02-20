import { Types } from 'mongoose'

export type TSale = {
  shoeId: Types.ObjectId //lagbo
  quantitySold: number    //lagbo
  buyer?: Types.ObjectId
  seller?: Types.ObjectId //lagbo
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
