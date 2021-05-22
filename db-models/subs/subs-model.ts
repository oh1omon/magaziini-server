import mongoose, { Model, model, Schema } from 'mongoose'
import { ISubDocument } from '../../types'

const SubSchema: Schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		unique: true,
		maxLength: [50, 'Too long email address'],
	},
})

export const Sub: Model<ISubDocument> = model<ISubDocument>('Sub', SubSchema)
