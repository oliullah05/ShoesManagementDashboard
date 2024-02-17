import config from '../../config'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLogin } from './auth.interface'
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from './auth.utils'

const login = async (payload: TLogin) => {
  const { email, password } = payload
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(404, 'user not found')
  }

  const hashedPassword = user.password
  const isMatchPassword = await bcrypt.compare(password, hashedPassword)

  if (!isMatchPassword) {
    throw new AppError(401, 'password do not matched')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { email } = decoded

  // checking if the user is exist
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(404, 'user not found')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

export const AuthServices = {
  login,
  refreshToken,
}
