import { Request, Response } from 'express'
import { AuthServices } from './auth.service'
import sendResponse from '../../../utils/sendResponse'
import catchAsync from '../../../utils/catchAsync'
import config from '../../config'

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body)
  const { refreshToken, accessToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'log in successful',
    data: { accessToken },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

export const AuthController = {
  login,
  refreshToken,
}
