/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from 'antd'
import AppError from '../../errors/AppError'
import { Shoe } from '../shoe/shoe.model'
import { User } from '../user/user.model'
import { TSale } from './sale.interface'
import { Sale } from './sale.model'

const createSale = async (payload: TSale, currentUser: any) => {
const user = await User.findOne({email:currentUser.email})
if(!user){
  throw new AppError(404,"user not found")
}

  const isShoeExits = await Shoe.findOne({ _id: payload.shoeId })
  if(payload.seller){
    const isSellerExits = await User.findOne({ _id: payload.seller })
    if (!isSellerExits) {
      throw new AppError(404, 'Seller not found')
    }
  }

  if (!isShoeExits) {
    throw new AppError(404, 'Shoe not found')
  }




  if (isShoeExits?.quantity < payload.quantitySold) {
    throw new AppError(
      400,
      "Oops! It looks like we don't have enough stock for the requested quantity. Please choose a lower quantity or contact support for assistance.",
    )
  }

  payload.buyer = user._id

  const result = await Sale.create(payload)

  if (!result) {
    throw new AppError(400, 'sale not created')
  }

  const removeQuantityFromShoe = await Shoe.findByIdAndUpdate(
    payload.shoeId,
    {
      quantity: isShoeExits.quantity - payload.quantitySold,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  // console.log(removeQuantityFromShoe);

  if (!removeQuantityFromShoe) {
    throw new AppError(400, 'sale not created')
  }

  return result
}

const getAllSales = async (period?: string) => {
  // console.log(period);
  const query: any = {}

  if (period) {
    const endDate = new Date()
    let startDate

    switch (period.toLowerCase()) {
      case 'daily':
        startDate = new Date(endDate)
        startDate.setDate(endDate.getDate() - 1)
        break
      case 'weekly':
        startDate = new Date(endDate)
        startDate.setDate(endDate.getDate() - 7)
        break
      case 'monthly':
        startDate = new Date(endDate)
        startDate.setMonth(endDate.getMonth() - 1)
        break
      case 'yearly':
        startDate = new Date(endDate)
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      default:
        throw new AppError(400, 'Invalid period for sales history')
    }

    query.saleDate = {
      $gte: startDate,
      $lte: endDate,
    }
  }

  const result = await Sale.find(query).populate({
    path: 'shoeId',
    select: 'name img',
  }).populate({
    path: 'buyer',
    select: '-password',
  }).populate({
    path: 'seller',
    select: '-password',
  }).populate("polishId")

  return result
}

const getSingleSale = async (id: string) => {
  const result = await Sale.findById(id)
  return result
}


const updateSale = async (id: string, payload: Partial<TSale>) => {
  const result = await Sale.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const SaleServices = {
  createSale,
  getAllSales,
  getSingleSale,
  updateSale
}
