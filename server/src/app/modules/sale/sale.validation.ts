import { z } from 'zod'

export const createSaleValidationSchema = z.object({
  body: z.object({
    shoeId: z.string({ required_error: 'shoe id is required' }),
    quantitySold: z
      .number({ required_error: 'quantitySold is required' })
      .positive(),
    buyerName: z.string({ required_error: 'buyerName is required' }),
    saleDate: z.string({ required_error: 'saleDate is required' }),
  }),
})

export const SaleValidationSchema = {
  createSaleValidationSchema,
}
