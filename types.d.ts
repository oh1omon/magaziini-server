/// <reference types="node" />

import { Request as IRequest } from 'express'
import { Document, Types } from 'mongoose'

//Request
interface Request extends IRequest {
	user?: IUser
}

//Interfaces for User Schema and Model
interface IUser {
	_id: Types.ObjectId
	email: string
	password?: string
	name: string
	favorites: Types.ObjectId[]
	orders: Types.ObjectId[]
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
	street: string
	city: string
	country: string
}

//Interfaces for Item Schema and Model
interface IItem {
	_id: Types.ObjectId
	name: string
	description: string
	sex: string
	image: string
	sizes: string[]
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
	price: number
	color: string
}

//Interfaces for Order Schema and Model

interface IOrder {
	_id: Types.ObjectId
	itemId: Types.ObjectId
	submitter: string
	submitterName: string
	street: string
	city: string
	country: string
	size: string
	color: string
	status: string
}

type IOrderDocument = IOrder & Document

//Interfaces for Subs Schema and model

interface ISub {
	_id: Types.ObjectId
	email: string
}

type ISubDocument = ISub & Document
