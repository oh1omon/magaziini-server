import { IItem } from '../types'
import { createItem, deleteItem, updateItem } from './db'
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
		return res.json({ message: 'Wrong data submitted' })
	}
	req.user && req.user.type === 'admin'
		? createItem(req.body)
				.then((r: IItem) => {
					return res.json({
						_id: r._id,
						name: r.name,
						description: r.description,
						sex: r.sex,
						image: r.image,
						sizes: r.sizes,
						inStock: r.inStock,
						price: r.price,
						color: r.color,
						availiableColors: r.availiableColors,
						season: r.season,
						structure: r.structure
					})
				})
				.catch((e: Error) => console.log(e))
		: res.json({ err: 'you have no rights' })
}

export const update = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data provided' })
	req.user && req.user.type === 'admin'
		? updateItem(req.body._id, Validator.updateItem(req.body)).then((r: IItem) => {
				return res.json({
					_id: r._id,
					name: r.name,
					description: r.description,
					sex: r.sex,
					image: r.image,
					sizes: r.sizes,
					inStock: r.inStock,
					price: r.price,
					color: r.color,
					availiableColors: r.availiableColors,
					season: r.season,
					structure: r.structure
				})
		  })
		: res.json({ err: 'you have no rights' })
}

export const remove = (req: any, res: any) => {
	if (req.user && req.user.type === 'admin') {
		if (!Validator.objectId(req.body._id)) {
			return res.json({ err: 'wrong data submitted' })
		}
		deleteItem(req.body._id)
			.then(r => {
				if (r) {
					res.json({ message: 'Item deleted' })
				} else {
					res.json({ err: 'No item with this id found' })
				}
			})
			.catch(e => console.log(e))
	} else {
		res.json({ err: 'you have no rights' })
	}
}
