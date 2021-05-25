import { Response } from 'express'
import { Request } from '../types'
import { createOrder, retrieveOrders } from './db'
import Validator from './validator'

export const create = (req: Request, res: Response): void => {
	if (!req.body) {
		res.json({ err: 'No data submitted' })
		return
	}
	if (!Validator.createOrder(req.body)) {
		res.json({ message: 'I bet you have forgot to mention size :D' })
		return
	}
	const orderObj = req.body
	orderObj.submitter = req?.user?.id || ''
	orderObj.name || (orderObj.name = req?.user?.name)
	orderObj.street || (orderObj.street = req?.user?.street)
	orderObj.city || (orderObj.city = req?.user?.city)
	orderObj.country || (orderObj.country = req?.user?.country)
	createOrder(orderObj)
		.then((r) => {
			res.json({
				message: 'Order created!',
				order: {
					_id: r._id,
					submitter: r.submitter,
					submitterName: r.submitterName,
					street: r.street,
					city: r.city,
					country: r.country,
					itemId: r.itemId,
					size: r.size,
					color: r.color,
					status: r.status,
				},
			})
			return
		})
		.catch((e) => console.log(e))
}

export const retrieve = (req: Request, res: Response): void => {
	if (!req.user) {
		res.json({ message: 'You have to be logged in to see your orders!' })
		return
	}

	req.user.type === 'admin'
		? retrieveOrders().then((r) => {
				res.json({ message: 'success', orders: r })
		  })
		: retrieveOrders(req.user.id).then((r) => res.json({ message: 'success', orders: r }))
}
