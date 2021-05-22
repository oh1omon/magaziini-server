/// <reference types="node" />

import mongoose, { Document } from 'mongoose'

//Interfaces for User Schema and Model
interface IUser {
	_id: mongoose.Types.ObjectId
	email: string
	password?: string
	name: string
	favorites: mongoose.Types.ObjectId[]
	orders: mongoose.Types.ObjectId[]
	type: string
	street: string
	city: string
	country: string
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
	name: string
}

//Interfaces for Item Schema and Model
interface IItem {
	_id: mongoose.Schema.Types.ObjectId
	name: string
	description: string
	sex: string
	image: string
	sizes: string[]
	inStock: number
	price: number
	color: string
}

type ItemDocument = IItem & Document

interface ICreateItem {
	name: string
	description: string
	sex: string
	image: string
	sizes: string[]
	inStock: number
	price: number
	color: string
}

//Interfaces for Order Schema and Model

interface IOrder {
	_id: mongoose.Schema.Types.ObjectId
	itemId: mongoose.Schema.Types.ObjectId
	size: string
	color: string
	status: string
}

type IOrderDocument = IOrder & Document

//Interfaces for Subs Schema and model

interface ISub {
	_id: mongoose.Schema.Types.ObjectId
	email: string
}

type ISubDocument = ISub & Document
