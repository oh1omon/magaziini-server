import { ObjectId } from 'mongoose'
import { IFilterObj, IItem, ItemDocument, IUser, UserDocument } from '../types'
import Validator from './validator'

/**
 * @param filter intakes the string by which field of document to do searches
 * @param value intakes the string of value to compare with the documents
 * @param baseObject is hte object where new filter object will be destructured
 * @returns  filterObj */
export const createFilterObj = (
	filter: string,
	value: string | ObjectId,
	baseObject: null | Record<string, unknown> = null
): Record<string, unknown> => {
	if (!Validator.checkString(filter) || !Validator.checkString(value as string)) {
		return baseObject !== null ? baseObject : null
	}
	const filterObj: IFilterObj = {}
	filterObj[filter] = value
	return filterObj
}

/**
 *
 * @param {Document} doc - user document
 * @returns object with deleted password and _v fields, also deletes Document properties
 */
export const userDocToObject = (doc: UserDocument): IUser => ({
	_id: doc._id,
	email: doc.email,
	orders: doc.orders,
	favorites: doc.favorites,
	name: doc.name,
	type: doc.type,
	street: doc.street,
	city: doc.city,
	country: doc.country,
})

/**
 *
 * @param {Document} doc - user document
 * @returns object with deleted password and _v fields, also deletes Document properties
 */
export const itemDocToObject = (doc: ItemDocument): IItem => ({
	_id: doc._id,
	name: doc.name,
	description: doc.description,
	sex: doc.sex,
	image: doc.image,
	sizes: doc.sizes,
	price: doc.price,
	color: doc.color,
})
