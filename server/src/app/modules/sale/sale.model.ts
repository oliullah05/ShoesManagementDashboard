import { Schema, model } from 'mongoose'
import { TSale } from './sale.interface'

const saleSchema = new Schema<TSale>({
  shoeId: {
    type: Schema.Types.ObjectId,
    ref: 'Shoe',
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
})

export const Sale = model<TSale>('Sale', saleSchema)
