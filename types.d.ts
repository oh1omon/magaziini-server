/// <reference types="node" />

import mongoose, { Document } from 'mongoose'

//Interfaces for User Schema and Model
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

//Interface for createNewUSer function
interface ISignUpUser {
    email: string
    password: string
    username: string
}

//Interfaces for Item Schema and Model
interface IItem {
    _id: mongoose.Schema.Types.ObjectId
    name: string
    description: string
    image: string
    sizes: string[]
    inStock: number
    price: number
    color: string
    availiableColors: string[]
    season: string
    structure: object
}

type ItemDocument = IItem & Document

interface ICreateItem {
    name: string
    description: string
    image: string
    sizes: string[]
    inStock: number
    price: number
    color: string
    availiableColors?: string[]
    season: string
    structure: object
}
