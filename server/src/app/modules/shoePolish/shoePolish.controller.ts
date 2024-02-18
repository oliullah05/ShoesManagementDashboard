import { Request, Response } from "express"
import catchAsync from "../../../utils/catchAsync"
import { shoePolishPolishServices } from "./shoePolish.service"
import sendResponse from "../../../utils/sendResponse"


const createShoePolish = catchAsync(async (req: Request, res: Response) => {
    const currentUser = req.user
    const userData = req.body
    const result = await shoePolishPolishServices.createshoePolish(userData,currentUser)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'ShoePolish created successfully',
        data: result,
    })
})

const getAllShoePolish = catchAsync(async (req, res) => {
    const result = await shoePolishPolishServices.getAllShoePolish(req.query)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'ShoePolish are retrieved successfully',
        data: result,
    })
})

const getSingleShoePolish = catchAsync(async (req, res) => {
    const { shoeId } = req.params
    const result = await shoePolishPolishServices.getSingleShoePolish(shoeId)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'ShoePolish is retrieved successfully',
        data: result,
    })
})

const updateShoePolish = catchAsync(async (req, res) => {
    const { shoeId } = req.params
    const result = await shoePolishPolishServices.updateShoePolish(shoeId, req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'ShoePolish is updated successfully',
        data: result,
    })
})



export const ShoePolishControllers = {
    createShoePolish,
    getAllShoePolish,
    getSingleShoePolish,
    updateShoePolish,
}
