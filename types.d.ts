/// <reference types="node" />

import { Request as IRequest } from 'express'
import { Document, ObjectId } from 'mongoose'

//Request
interface Request extends IRequest {
	user?: IUser
}

//Interfaces for User Schema and Model
interface IUser {
	_id: ObjectId
	id?: string
	email: string
	password?: string
	name: string
	favorites: ObjectId[]
	orders: ObjectId[]
	type: string
	street: string
	city: string
	country: string
}

type UserDocument = IUser & Document

//Interface for finOneUser function
interface IFilterObj {
	[filter: string]: string | ObjectId
}

interface IUserUpdates {
	password?: string
	name?: string
	favorites?: ObjectId[]
	orders?: ObjectId[]
	street?: string
	city?: string
	country?: string
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
	_id: ObjectId
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

interface IItemUpdate {
	name?: string
	description?: string
	sex?: string
	image?: string
	sizes?: string[]
	price?: number
	color?: string
}

//Interfaces for Order Schema and Model

interface IOrder {
	_id: ObjectId
	itemId: ObjectId
	submitter: string
	submitterName: string
	street: string
	city: string
	country: string
	size: string
	color: string
	status: string
}

interface IOrderCreate {
	itemId?: ObjectId
	submitter?: string
	name?: string
	street?: string
	city?: string
	country?: string
	size?: string
	color?: string
	status?: string
}

type IOrderDocument = IOrder & Document

//Interfaces for Subs Schema and model

interface ISub {
	_id: ObjectId
	email: string
}

type ISubDocument = ISub & Document

//Db.ts types

type IFindOneUser = (filter: string, value: string | ObjectId) => Promise<UserDocument>
