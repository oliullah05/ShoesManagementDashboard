import { Request, Response } from 'express'
import catchAsync from '../../../utils/catchAsync'
import { SaleServices } from './sale.service'
import sendResponse from '../../../utils/sendResponse'

const createSale = catchAsync(async (req: Request, res: Response) => {
const currentUser = req.user;

  const userData = req.body
  const result = await SaleServices.createSale(userData,currentUser)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sale created successfully',
    data: result,
  })
})

const getAllSales = catchAsync(async (req, res) => {
  const { period } = req.params
  const result = await SaleServices.getAllSales(period)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sale are retrieved successfully',
    data: result,
  })
})

const getSingleSale = catchAsync(async (req, res) => {
  const { SaleId } = req.params
  const result = await SaleServices.getSingleSale(SaleId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sale is retrieved successfully',
    data: result,
  })
})

export const SaleControllers = {
  createSale,
  getAllSales,
  getSingleSale,
}
