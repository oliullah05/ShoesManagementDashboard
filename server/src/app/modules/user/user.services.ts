import { TUSer } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: TUSer) => {
  const result = await User.create(payload)
  return result
}

export const UserServices = {
  createUser,
}
