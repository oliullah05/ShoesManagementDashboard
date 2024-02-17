import { Types } from 'mongoose'

export type TSale = {
  shoeId: Types.ObjectId
  quantitySold: number
  buyerName: string
  saleDate: Date
}
