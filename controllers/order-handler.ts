import { createOrder, retrieveOrders } from './db'
import Validator from './validator'

export const create = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data submitted' })
	if (!Validator.createOrder(req.body)) return res.json({ message: 'I bet you have forgot to mention size :D' })
	const orderObj = req.body
	orderObj.submitter || (orderObj.submitter = req?.user?.id || '')
	orderObj.submitterName || (orderObj.submitterName = req?.user?.id)
	orderObj.street || (orderObj.street = req?.user?.id)
	orderObj.city || (orderObj.city = req?.user?.id)
	orderObj.country || (orderObj.country = req?.user?.id)
	createOrder(orderObj)
		.then((r: any) => {
			return res.json({
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
		})
		.catch((e) => console.log(e))
}

export const retrieve = (req: any, res: any) => {
	if (!req.user) {
		return res.json({ message: 'You have to be logged in to see your orders!' })
	}

	req.user.type === 'admin'
		? retrieveOrders().then((r) => {
				return res.json({ message: 'success', orders: r })
		  })
		: retrieveOrders(req.user.id).then((r) => res.json({ message: 'success', orders: r }))
}
