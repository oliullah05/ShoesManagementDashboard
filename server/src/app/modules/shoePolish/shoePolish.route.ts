import express from 'express'

import { auth } from '../../middlewares/auth'
import validateRequest from '../../middlewares/ValidateRequest'
import { ShoePolishValidation } from './shoePolish.validation'
import { ShoePolishControllers } from './shoePolish.controller'

const router = express.Router()

router.post(
  '/create-shoe-polish',
  auth(),
  validateRequest(ShoePolishValidation.CreateShoePolishValidationSchema),
  ShoePolishControllers.createShoePolish,
)

router.put(
  '/:shoeId',
  auth(),
  validateRequest(ShoePolishValidation.UpdateShoePolishValidationSchema),
  ShoePolishControllers.updateShoePolish,
)

router.get('/', auth(), ShoePolishControllers.getAllShoePolish)


export const ShoePolishRoutes = router
