import { Types } from "mongoose"

export type TShoe = {
  name: string
  price: number
  quantity: number
  img: string
  releaseDate: string
  brand: string
  model: string
  style?: string
  size?: number
  color?: string
  material?: string
  closureType?: string
  isDeleted?: boolean,
  verified:boolean
  review:number
  rating:number
  description:string
  authenticityCode:string
  sizes:[string]
  createdBy?:Types.ObjectId
}
