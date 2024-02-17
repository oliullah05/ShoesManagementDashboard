import z from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    password: z.string().min(6).max(20),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

export const AuthValidationSchema = {
  loginValidationSchema,
  refreshTokenValidationSchema,
}
