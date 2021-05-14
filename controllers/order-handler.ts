import { createOrder } from './db'
import Validator from './validator'

export const create = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data submitted' })
	if (!Validator.createOrder(req.body)) return res.json({ message: 'I bet you have forgot to mention size :D' })
	const orderObj = req.body
	orderObj.submitter = req?.user?._id?.toString() || ''
	createOrder(orderObj)
		.then((r: any) =>
			res.json({
				message: 'Order created!',
				order: {
					_id: r._id,
					submitter: r.submitter,
					itemId: r.itemId,
					size: r.size,
					color: r.color,
					status: r.status,
				},
			})
		)
		.catch((e) => console.log(e))
}
