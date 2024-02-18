import { z } from 'zod'

export const createSaleValidationSchema = z.object({
  body: z.object({
    shoeId: z.string(),
    quantitySold: z.number().positive('Quantity sold must be a positive number'),
    buyer: z.string().optional(),
    seller: z.string(),
    saleDate: z.string().min(1, 'Sale date is required'),
    price: z.number().min(0, 'Price must be a non-negative value'),
    totalAmount: z.number().int().min(0, 'Total amount must be a non-negative integer').optional(),
    paymentMethod: z.string().optional(),
    shippingAddress: z.string().optional(),
    isDelivered: z.boolean().optional().default(false),
    deliveryDate: z.date().optional(),
    notes: z.string().optional(),
    discount: z.number().min(0, 'Discount must be a non-negative integer').optional(),
    tax: z.number().min(0, 'Tax must be a non-negative integer').optional(),
  })
})
export const upadteSaleValidationSchema = z.object({
  body: z.object({
    shippingAddress: z.string().optional(),
    isDelivered: z.boolean().optional().default(false),
    deliveryDate: z.date().optional(),
    notes: z.string().optional(),
  }).optional()
})

export const SaleValidationSchema = {
  createSaleValidationSchema,
  upadteSaleValidationSchema
}
