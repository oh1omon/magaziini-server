import { Model, model } from 'mongoose'
import { UserDocument } from '../../types'
import { UserSchema } from './user-schema'

export const User: Model<UserDocument> = model<UserDocument>('User', UserSchema)
