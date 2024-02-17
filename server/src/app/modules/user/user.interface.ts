export type TUSer = {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isDeleted: boolean
}
