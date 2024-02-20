import { Schema, Types, model } from 'mongoose'
import { TShoe } from './shoe.interface'
import { array } from 'zod'

export const shoeSchema = new Schema<TShoe>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
    releaseDate: { type: String },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    style: { type: String },
    size: { type: Number },
    color: { type: String },
    material: { type: String },
    closureType: { type: String },
    isDeleted: { type: Boolean, default: false },
    verified: {
      type: Boolean,
      default: true
    },
    authenticityCode: {
      type: String
    },
    review: {
      type: Number
    },
    rating: {
      type: Number
    },
    description: {
      type: String
    },
    sizes:{
      type:[String]
    },
    createdBy:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps: true,
  },
)

export const Shoe = model<TShoe>('Shoe', shoeSchema)
