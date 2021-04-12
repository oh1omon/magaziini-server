import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { Item } from '../db/item/item-model'
import { User } from '../db/user/user-model'
import { ICreateItem, IFilterObj, ISignUpUser, ItemDocument, UserDocument } from '../types'
import Validator from './validator'

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
			useCreateIndex: true
		})
		.catch(error => console.log(error))

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

/**
 * @param filter intakes the string by which field of document to do searches
 * @param value intakes the string of value to compare with the documents
 * @returns  filterObj */
export const createFilterObj = (filter: string, value: any) => {
	if (!Validator.checkString(filter) || !Validator.checkString(value)) {
		return null
	}
	let filterObj: IFilterObj = {}
	filterObj[filter] = value
	return filterObj
}

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
				username: userObj.username,
				favorites: [],
				orders: [],
				type: 'default',
				street: ',',
				city: '',
				country: ''
			},
			(err: Error, doc: UserDocument) => {
				if (err) {
					return reject(err.message)
				}
				return resolve({
					_id: doc._id,
					email: doc.email,
					orders: doc.orders,
					favorites: doc.favorites,
					type: doc.type,
					street: doc.street,
					city: doc.city,
					country: doc.country
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
//FIXME NEED TO TEST
export const updateUser = async (userId: mongoose.Types.ObjectId, updatesObj: any) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('_id', userId)
		if (updatesObj.orders) updatesObj.orders = { $push: updatesObj.orders }
		if (updatesObj.favorites) updatesObj.favorites = { $push: updatesObj.favorites }
		await User.findOneAndUpdate(filterObj, updatesObj, { new: true }, (err, doc) => {
			if (err) return reject(err.message)

			return resolve({
				_id: doc._id,
				email: doc.email,
				orders: doc.orders,
				favorites: doc.favorites,
				type: doc.type,
				street: doc.street,
				city: doc.city,
				country: doc.country
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
				image: itemObj.image,
				sizes: itemObj.sizes,
				inStock: itemObj.inStock,
				price: itemObj.price,
				color: itemObj.color,
				availiableColors: itemObj.availiableColors,
				season: itemObj.season,
				structure: itemObj.structure
			},
			(err: Error, doc: ItemDocument) => {
				if (err) {
					return reject(err)
				}
				return resolve({
					_id: doc._id,
					name: doc.name,
					description: doc.description,
					image: doc.image,
					sizes: doc.sizes,
					inStock: doc.inStock,
					price: doc.price,
					color: doc.color,
					availiableColors: doc.availiableColors,
					season: doc.season,
					structure: doc.structure
				})
			}
		)
	})
}

/**
 * @param itemId
 */
//FIXME NEED TO TEST
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
//FIXME NEED TO TEST
export const updateItem = async (itemId: mongoose.Types.ObjectId, updatesObj: any) => {
	return new Promise(async (resolve, reject) => {
		const filterObj = createFilterObj('_id', itemId)
		await Item.findOneAndUpdate(filterObj, updatesObj, { new: true }, (err, doc) => {
			if (err) return reject(err.message)

			return resolve({
				_id: doc._id,
				name: doc.name,
				description: doc.description,
				image: doc.image,
				sizes: doc.sizes,
				inStock: doc.inStock,
				price: doc.price,
				color: doc.color,
				availiableColors: doc.availiableColors,
				season: doc.season,
				structure: doc.structure
			})
		})
	})
}

//TODO create order
//FIXME NEED TO TEST