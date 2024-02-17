import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import config from '../config'
import { User } from '../modules/user/user.model'
import catchAsync from '../../utils/catchAsync'

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(401, 'You are not authorized!')
    }

    try {
      const decoded = jwt.verify(token, config.jwt_access_secret as string)
      const { email } = decoded as JwtPayload
      const user = User.findOne({ email })
      if (!user) {
        throw new AppError(404, 'user not found')
      }
      req.user = decoded as JwtPayload
    } catch (err) {
      throw new AppError(401, 'you are not authorized')
    }
    next()
  })
}
