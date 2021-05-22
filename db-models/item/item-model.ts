import mongoose, { Model, model, Schema } from 'mongoose'
import { ItemDocument } from '../../types'

const ItemSchema: Schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, maxLength: [50, 'Too long name'] },
	description: { type: String, maxLength: [600, 'Too long description'] },
	sex: { type: String, maxLength: [2, 'Only w or m as sex should be provided'] },
	image: String,
	sizes: [String],
	price: Number,
	color: String,
})

export const Item: Model<ItemDocument> = model<ItemDocument>('Item', ItemSchema)
