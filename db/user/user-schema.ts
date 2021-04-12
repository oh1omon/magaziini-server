import mongoose, { Schema } from 'mongoose'

export const UserSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    favorites: { type: [mongoose.Schema.Types.ObjectId], required: false },
    orders: { type: [mongoose.Schema.Types.ObjectId], required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    type: { type: String, required: false },
})
