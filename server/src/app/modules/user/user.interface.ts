export type TUSer = {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  isDeleted: boolean
}
