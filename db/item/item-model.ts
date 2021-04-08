import { Model, model } from 'mongoose'
import { ItemDocument } from '../../types'
import { ItemSchema } from './item-schema'

export const Item: Model<ItemDocument> = model<ItemDocument>('Item', ItemSchema)
