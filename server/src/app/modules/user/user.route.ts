import express from 'express'
import validateRequest from '../../middlewares/ValidateRequest'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
)

export const UserRoutes = router
