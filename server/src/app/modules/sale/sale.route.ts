import express from 'express'
import validateRequest from '../../middlewares/ValidateRequest'
import { auth } from '../../middlewares/auth'
import { SaleControllers } from './sale.controller'
import { SaleValidationSchema } from './sale.validation'

const router = express.Router()

router.post(
  '/create-sale',
  auth(),
  validateRequest(SaleValidationSchema.createSaleValidationSchema),
  SaleControllers.createSale,
)

router.get('/single/:saleId', auth(), SaleControllers.getSingleSale)

router.get('/', auth(), SaleControllers.getAllSales)

router.get('/:period', auth(), SaleControllers.getAllSales)

export const SaleRoutes = router
