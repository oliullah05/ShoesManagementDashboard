import z from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),
    role: z.enum(['buyer', 'seller']),
    isDeleted: z.boolean().optional().default(false),
  }),
})

export const UserValidation = {
  createUserValidationSchema,
}
