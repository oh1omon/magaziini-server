import mongoose, { Model, model, Schema } from 'mongoose'
import { ItemDocument } from '../../types'

const ItemSchema: Schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	description: String,
	sex: String,
	image: String,
	sizes: [String],
	inStock: Number,
	price: Number,
	color: String,
	availiableColors: { type: [String], required: false },
	season: String,
	structure: Object
})

export const Item: Model<ItemDocument> = model<ItemDocument>('Item', ItemSchema)
