export type TUSer = {
  name: string
  email: string
  password: string
  role: 'buyer' | 'seller'
  isDeleted: boolean
}
