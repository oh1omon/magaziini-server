import { Response } from 'express'
import { Item } from '../db-models/item/item-model'
import { IItem, Request } from '../types'
import { createItem, deleteItem, updateItem } from './db'
import { createFilterObj } from './helper'
import Validator from './validator'

/**
 * Function performs validation of request, and then dispatches item creation function.
 * After that it validates response from item creation and sends response to the client according to it
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const add = (req: Request, res: Response): void => {
	if (!req.body) {
		res.json({ err: 'No data provided' })
	}

	if (!Validator.createItem(req.body)) {
		res.json({ err: 'Wrong data submitted' })
		return
	}
	req.user.type === 'admin'
		? createItem(req.body)
				.then((r: IItem) => {
					res.json({ message: 'Item has been added successfully', item: r })
					return
				})
				.catch((e: Error) => {
					res.json({ err: e.message })
				})
		: res.json({ err: 'you have no rights' })
}

/**
 * Function performs validation of request, and then dispatches item update function.
 * After that it validates response from item update and sends response to the client according to it
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const update = (req: Request, res: Response): void => {
	if (!req.body) {
		res.json({ message: 'No data provided' })
		return
	}
	req.user && req.user.type === 'admin'
		? updateItem(req.body._id, Validator.updateItem(req.body))
				.then((r: IItem) => {
					res.json({ message: 'Item has been updated successfully', item: r })
					return
				})
				.catch((e: Error) => {
					res.json({ err: e.message })
				})
		: res.json({ message: 'you have to be an admin to update items' })
}

/**
 * Function performs validation of request (for example, type of the user), and then dispatches item deletion function.
 * After that it validates response from item delete and sends response to the client according to it
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const remove = (req: Request, res: Response): void => {
	if (req.user && req.user.type === 'admin') {
		if (!Validator.objectId(req.body._id)) {
			res.json({ err: 'wrong data submitted' })
			return
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
				console.log(e)
				return
			})
	} else {
		res.json({ err: 'you have no rights' })
	}
}

/**
 * Function dispatches item finding function, based on provided or not id of this item.
 * If there was that id in req.params, then it tries to find only one item.
 * If no id provided, it sends the whole list of items
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const get = (req: Request, res: Response): void => {
	const filterObject = createFilterObj('_id', req.params.item, {})
	Item.find(filterObject, (err, doc) => {
		if (err) {
			res.json({ err: 'error has happened' })
			return
		}
		res.json(doc)
	})
}
