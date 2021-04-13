import mongoose, { Model, model, Schema } from 'mongoose'
import { IOrderDocument } from '../../types'

const OrderSchema: Schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	itemId: mongoose.Schema.Types.ObjectId,
	size: String,
	color: String,
	status: String
})

export const Order: Model<IOrderDocument> = model<IOrderDocument>('Order', OrderSchema)
