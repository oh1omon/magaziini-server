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

	if (req.file) req.body.image = req.file.path

	if (!Validator.createItem(req.body)) {
		return res.json({ message: 'Wrong data submitted' })
	}
	req.user && req.user.type === 'admin'
		? createItem(req.body)
				.then((r: IItem) => {
					return res.json(itemDocToObject(r))
				})
				.catch((e: Error) => console.log(e))
		: res.json({ err: 'you have no rights' })
}

export const update = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data provided' })
	if (req.file) req.body.image = req.file.path
	req.user && req.user.type === 'admin'
		? updateItem(req.body._id, Validator.updateItem(req.body)).then((r: IItem) => {
				return res.json(itemDocToObject(r))
		  })
		: res.json({ err: 'you have no rights' })
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
