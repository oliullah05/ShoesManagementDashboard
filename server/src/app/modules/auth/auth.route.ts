import express from 'express'
import validateRequest from '../../middlewares/ValidateRequest'
import { AuthController } from './auth.controller'
import { AuthValidationSchema } from './auth.validation'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthController.login,
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidationSchema.refreshTokenValidationSchema),
  AuthController.refreshToken,
)

export const AuthRouter = router
