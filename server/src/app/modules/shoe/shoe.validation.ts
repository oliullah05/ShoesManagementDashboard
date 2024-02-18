import z from 'zod'
const createShoeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
    img: z.string(),
    releaseDate: z.string().optional(),
    brand: z.string(),
    model: z.string(),
    style: z.string().optional(),
    size: z.number().positive().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    closureType: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
    authenticityCode:z.string().optional(),
    verified:z.boolean().optional(),
    review:z.number().optional(),
    rating:z.number().optional(),
    description:z.string().optional(),
    sizes: z.array(z.string()).optional(),
    createdBy:z.string().optional()
  }),
})

const updateShoeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    quantity: z.number().positive().optional(),
    img: z.string().optional(),
    releaseDate: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    style: z.string().optional(),
    size: z.number().positive().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    closureType: z.string().optional(),
    isDeleted: z.boolean().optional(),
    authenticityCode:z.string().optional(),
    verified:z.boolean().optional(),
    review:z.number().optional(),
    rating:z.number().optional(),
    description:z.string().optional(),
  }),
})

export const ShoeValidation = {
  createShoeValidationSchema,
  updateShoeValidationSchema,
}
