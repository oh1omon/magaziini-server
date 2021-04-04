/// <reference types="node" />

import mongoose, { Document } from 'mongoose'

//For User Schema and Model
interface IUser {
    _id: mongoose.Types.ObjectId
    email: string
    password?: string
    username: string
    favorites: mongoose.Types.ObjectId[]
    orders: mongoose.Types.ObjectId[]
}

type UserDocument = IUser & Document

//Interface for finOneUser function
interface IFilterObj {
    [filter: string]: any
}

//
interface ISignUpUser {
    email: string
    password: string
    username: string
}
