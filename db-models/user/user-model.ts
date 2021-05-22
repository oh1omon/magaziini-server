import mongoose, { Model, model, Schema } from 'mongoose'
import { UserDocument } from '../../types'

const UserSchema: Schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true, maxLength: [50, 'Too long email address'] },
	password: { type: String, required: true },
	name: { type: String, required: false, maxLength: [30, 'Too long name'] },
	favorites: { type: [mongoose.Schema.Types.ObjectId], required: false },
	orders: { type: [mongoose.Schema.Types.ObjectId], required: false },
	street: { type: String, required: false, maxLength: [30, 'Too long street'] },
	city: { type: String, required: false, maxLength: [30, 'Too long city'] },
	country: { type: String, required: false, maxLength: [30, 'Too long country'] },
	type: { type: String, required: false },
})

export const User: Model<UserDocument> = model<UserDocument>('User', UserSchema)
