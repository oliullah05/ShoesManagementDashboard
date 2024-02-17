import { Schema, model } from 'mongoose'
import { TUSer } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUSer>({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    min: 6,
    max: 20,
  },
  role: {
    type: String,
    default: 'user',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
})

export const User = model<TUSer>('User', userSchema)
