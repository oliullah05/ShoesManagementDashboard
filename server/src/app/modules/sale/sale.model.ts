import { Schema, model } from 'mongoose'
import { TSale } from './sale.interface'

const saleSchema = new Schema<TSale>({
  shoeId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Shoe ID is required'],
    ref:"Shoe"
  },
  quantitySold: {
    type: Number,
    required: [true, 'Quantity sold is required'],
    min: [1, 'Quantity sold must be at least 1'],
  },

  buyer: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  polishId: {
    type: Schema.Types.ObjectId,
    ref:"ShoePolish"
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: [true, 'Seller name is required'],
    ref:"User"
  },
  saleDate: {
    type: String,
    required: [true, 'Sale date is required'],
  },
  unAuthorizedbuyerName: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a non-negative value'],
  },
  totalAmount: {
    type: Number,
    min: [0, 'Total amount must be a non-negative value'],
  },
  paymentMethod: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
    default:false
  },
  deliveryDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  discount: {
    type: Number,
    min: [0, 'Discount must be a non-negative value'],
  },
  tax: {
    type: Number,
    min: [0, 'Tax must be a non-negative value'],
  }
})

export const Sale = model<TSale>('Sale', saleSchema)
