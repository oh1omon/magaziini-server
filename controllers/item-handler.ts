import { Item } from '../db-models/item/item-model'
import { IItem } from '../types'
import { createItem, deleteItem, updateItem } from './db'
import { createFilterObj, itemDocToObject } from './helper'
import Validator from './validator'

/**
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const add = (req: any, res: any) => {
	if (!req.body) {
		res.json({ err: 'No data provided' })
	}

	if (!Validator.createItem(req.body)) {
		return res.json({ err: 'Wrong data submitted' })
	}
	req.user.type === 'admin'
		? createItem(req.body)
				.then((r: IItem) => {
					return res.json({ message: 'Item has been added successfully', item: itemDocToObject(r) })
				})
				.catch((e: Error) => {
					res.json({ err: e.message })
				})
		: res.json({ err: 'you have no rights' })
}

export const update = (req: any, res: any) => {
	if (!req.body) return res.json({ message: 'No data provided' })
	req.user && req.user.type === 'admin'
		? updateItem(req.body._id, Validator.updateItem(req.body))
				.then((r: IItem) => {
					return res.json({ message: 'Item has been updated successfully', item: itemDocToObject(r) })
				})
				.catch((e: Error) => {
					res.json({ err: e.message })
				})
		: res.json({ message: 'you have to be an admin to update items' })
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const remove = (req: any, res: any) => {
	if (req.user && req.user.type === 'admin') {
		if (!Validator.objectId(req.body._id)) {
			return res.json({ err: 'wrong data submitted' })
		}
		deleteItem(req.body._id)
			.then((r) => {
				if (r) {
					res.json({ message: 'Item deleted' })
				} else {
					res.json({ err: 'No item with this id found' })
				}
			})
			.catch((e) => {
				res.json({ err: 'internal error', e })
				return console.log(e)
			})
	} else {
		res.json({ err: 'you have no rights' })
	}
}

export const get = (req: any, res: any) => {
	const filterObject = createFilterObj('_id', req.params.item, {})
	Item.find(filterObject, (err, doc) => {
		if (err) {
			return res.json({ err: 'error has happened' })
		}
		res.json(doc)
	})
}
