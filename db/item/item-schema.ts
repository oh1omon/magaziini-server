import { Schema } from 'mongoose'
import mongoose from 'mongoose'

export const ItemSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    image: String,
    sizes: [String],
    inStock: Number,
    price: Number,
    color: String,
    availiableColors: { type: [String], required: false },
    season: String,
    structure: Object,
})
