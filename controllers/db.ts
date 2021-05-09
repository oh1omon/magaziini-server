import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { Item } from '../db-models/item/item-model'
import { Order } from '../db-models/order/order-model'
import { Sub } from '../db-models/subs/subs-model'
import { User } from '../db-models/user/user-model'
import { ICreateItem, IOrderDocument, ISignUpUser, ISubDocument, ItemDocument, UserDocument } from '../types'
import { createFilterObj } from './helper'

let db: any

/**
 * Connects to the Mongo DataBase and adds listeners for success connection and errors
 * @returns connection instance**/
export const connectToMongo = () => {
	//If the db variable already set, then it will not produce any new connections
	if (db) {
		return
	}

	//Connecting to Mongo
	mongoose
		.connect(process.env.DB_CONNECTION_LINK, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.catch((error) => console.log(error))

	//Setting connection instance to the db variable
	db = mongoose.connection

	//Success listener
	db.once('open', async () => console.log('Connected'))

	//Failure listener
	db.on('error', (err: Error) => {
		console.log(err)
	})

	return db
}

// /**
//  * @param filter intakes the string by which field of document to do searches
//  * @param value intakes the string of value to compare with the documents
//  * @returns  filterObj */
// export const createFilterObj = (filter: string, value: any) => {
// 	if (!Validator.checkString(filter) || !Validator.checkString(value)) {
// 		return null
// 	}
// 	let filterObj: IFilterObj = {}
// 	filterObj[filter] = value
// 	return filterObj
// }

/**
 * @param filter intakes the string by which field of document to do searches
 * @param value intakes the string of value to compare with the documents
 * Searching only through the Users collection
 * @returns either found document, or null*/
export const findOneUser = async (filter: string, value: any) => {
	const filterObj = createFilterObj(filter, value)
	return User.findOne(filterObj, (err: Error, data: UserDocument) => {
		if (err) {
			return err.message
		}

		return data
	})
}

/**
 * @param {object} userObj
 * @returns user created -> returns user document with deleted password
 * @returns already user with this email -> returns string with message
 */
export const signUpUser = async (userObj: ISignUpUser) => {
	return new Promise(async (resolve, reject) => {
		if (await findOneUser('email', userObj.email)) {
			return resolve(`There are already an account assigned to ${userObj.email}`)
		}
		User.create(
			{
				_id: new mongoose.Types.ObjectId(),
				email: userObj.email,
				password: await bcrypt.hash(userObj.password, 10),
				name: userObj.name,
				favorites: [],
				orders: [],
				type: 'default',
				street: ',',
				city: '',
				country: '',
			},
			(err: Error, doc: UserDocument) => {
				if (err) {
					return reject(err.message)
				}
				return resolve({
					_id: doc._id,
					email: doc.email,
					name: doc.name,
					orders: doc.orders,
					favorites: doc.favorites,
					type: doc.type,
					street: doc.street,
					city: doc.city,
					country: doc.country,
				})
			}
		)
	})
}

/**
 * @param userId
 * @param updatesObj
 * @returns updated version of user
 */
export const updateUser = async (userId: mongoose.Types.ObjectId, updatesObj: any) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('_id', userId)
		if (updatesObj.orders) updatesObj.orders = { $push: updatesObj.orders }
		if (updatesObj.favorites) updatesObj.favorites = { $push: updatesObj.favorites }
		if (updatesObj.password) {
			updatesObj.password = await bcrypt.hash(updatesObj.password, 10)
		}
		await User.findOneAndUpdate(filterObj, updatesObj, { new: true }, (err, doc) => {
			if (err) return reject(err.message)

			return resolve({
				_id: doc._id,
				email: doc.email,
				name: doc.name,
				orders: doc.orders,
				favorites: doc.favorites,
				type: doc.type,
				street: doc.street,
				city: doc.city,
				country: doc.country,
			})
		})
	})
}

/**
 * @param {ICreateItem} itemObj
 * @returns {} Item document – if document has been added
 */
export const createItem = async (itemObj: ICreateItem) => {
	return new Promise(async (resolve, reject) => {
		Item.create(
			{
				_id: new mongoose.Types.ObjectId(),
				name: itemObj.name,
				description: itemObj.description,
				sex: itemObj.sex,
				image: itemObj.image,
				sizes: itemObj.sizes,
				inStock: itemObj.inStock,
				price: itemObj.price,
				color: itemObj.color,
				availiableColors: itemObj.availiableColors,
				season: itemObj.season,
				structure: itemObj.structure,
			},
			(err: Error, doc: ItemDocument) => {
				if (err) {
					return reject(err)
				}
				return resolve({
					_id: doc._id,
					name: doc.name,
					description: doc.description,
					sex: doc.sex,
					image: doc.image,
					sizes: doc.sizes,
					inStock: doc.inStock,
					price: doc.price,
					color: doc.color,
					availiableColors: doc.availiableColors,
					season: doc.season,
					structure: doc.structure,
				})
			}
		)
	})
}

/**
 * @param itemId
 */
export const deleteItem = async (itemId: mongoose.Types.ObjectId) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('_id', itemId)
		await Item.findOneAndDelete(filterObj, {}, (err, res) => {
			if (err) return reject(err.message)
			return resolve(res)
		})
	})
}

/**
 * @param itemId
 * @param updatesObj
 * @returns updated version of item
 */
export const updateItem = async (itemId: mongoose.Types.ObjectId, updatesObj: any) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('_id', itemId)
		await Item.findOneAndUpdate(filterObj, updatesObj, { new: true }, (err, doc: any) => {
			if (err) return reject(err.message)

			return resolve({
				_id: doc._id,
				name: doc.name,
				description: doc.description,
				sex: doc.sex,
				image: doc.image,
				sizes: doc.sizes,
				inStock: doc.inStock,
				price: doc.price,
				color: doc.color,
				availiableColors: doc.availiableColors,
				season: doc.season,
				structure: doc.structure,
			})
		})
	})
}

/**
 *
 * @param orderObj
 * @returns {IOrderDocument} created document
 */
export const createOrder = async (orderObj: any) => {
	return new Promise(async (resolve, reject) => {
		await Order.create(
			{
				_id: new mongoose.Types.ObjectId(),
				submitter: orderObj.submitter,
				itemId: orderObj.itemId,
				size: orderObj.size,
				color: orderObj.color || 'default',
				status: 'submitted',
			},
			(e: Error, r: IOrderDocument) => {
				if (e) return reject(e)
				return resolve(r)
			}
		)
	})
}

/**
 *
 * @param orderObj
 * @returns {IOrderDocument} created document
 */
export const subAdd = async (email: string) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('email', email)
		if (await Sub.find(filterObj)) {
			return resolve(new Error('already in DB'))
		}

		await Sub.create(
			{
				_id: new mongoose.Types.ObjectId(),
				email: email,
			},
			(e: Error, r: ISubDocument) => {
				if (e) return resolve(e)
				return resolve(r)
			}
		)
	})
}
