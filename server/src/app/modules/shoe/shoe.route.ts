import express from 'express'
import { ShoeControllers } from './shoe.controller'
import { ShoeValidation } from './shoe.validation'
import { auth } from '../../middlewares/auth'
import validateRequest from '../../middlewares/ValidateRequest'

const router = express.Router()

router.post(
  '/create-shoe',
  auth(),
  validateRequest(ShoeValidation.createShoeValidationSchema),
  ShoeControllers.createShoe,
)

router.get('/verify/:authenticityCode', auth(), ShoeControllers.getSingleShoeByAuthenticityCode)
router.get('/:shoeId', auth(), ShoeControllers.getSingleShoe)

router.patch(
  '/:shoeId',
  auth(),
  validateRequest(ShoeValidation.updateShoeValidationSchema),
  ShoeControllers.updateShoe,
)

router.get('/', auth(), ShoeControllers.getAllShoes)

router.delete('/:shoeId', auth(), ShoeControllers.deleteShoe)

router.post('/delete-shoes-many', auth(), ShoeControllers.deleteShoesMany)

export const ShoeRoutes = router
