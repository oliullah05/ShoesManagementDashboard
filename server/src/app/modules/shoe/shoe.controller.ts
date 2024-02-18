import { Request, Response } from 'express'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { ShoeServices } from './shoe.service'

const createShoe = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req.user;
  const userData = req.body
  const result = await ShoeServices.createShoe(userData,currentUser)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Shoe created successfully',
    data: result,
  })
})

const getAllShoes = catchAsync(async (req, res) => {
  const result = await ShoeServices.getAllShoes(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoe are retrieved successfully',
    data: result,
  })
})

const getSingleShoe = catchAsync(async (req, res) => {
  const { shoeId } = req.params
  const result = await ShoeServices.getSingleShoe(shoeId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoe is retrieved successfully',
    data: result,
  })
})
const getSingleShoeByAuthenticityCode = catchAsync(async (req, res) => {
  const { authenticityCode } = req.params
  const result = await ShoeServices.getSingleShoeByAuthenticityCode(authenticityCode)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoe is retrieved successfully',
    data: result,
  })
})

const updateShoe = catchAsync(async (req, res) => {
  const { shoeId } = req.params
  const result = await ShoeServices.updateShoe(shoeId, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoe is updated successfully',
    data: result,
  })
})

const deleteShoe = catchAsync(async (req, res) => {
  const { shoeId } = req.params
  // console.log(shoeId);
  const result = await ShoeServices.deleteShoe(shoeId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoe is deleted successfully',
    data: result,
  })
})

const deleteShoesMany = catchAsync(async (req, res) => {
  const { shoeIds } = req.body // Assuming you pass an array of shoeIds in the request body
  // console.log(shoeIds);
  const result = await ShoeServices.deleteShoesMany(shoeIds)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shoes are soft deleted successfully',
    data: result,
  })
})

export const ShoeControllers = {
  createShoe,
  getAllShoes,
  getSingleShoe,
  updateShoe,
  deleteShoe,
  deleteShoesMany,
  getSingleShoeByAuthenticityCode
}
