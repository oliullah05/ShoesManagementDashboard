import { Request, Response } from 'express'
import { UserServices } from './user.services'
// import { resourceLimits } from "worker_threads"; // TODO
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await UserServices.createUser(userData)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
}
