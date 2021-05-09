import { IFilterObj } from '../types'
import Validator from './validator'

/**
 * @param filter intakes the string by which field of document to do searches
 * @param value intakes the string of value to compare with the documents
 * @returns  filterObj */
export const createFilterObj = (filter: string, value: any, baseObject: any = null) => {
	if (!Validator.checkString(filter) || !Validator.checkString(value)) {
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
export const userDocToObject = (doc: any) => ({
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
export const itemDocToObject = (doc: any) => ({
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
