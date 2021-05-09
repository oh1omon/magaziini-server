import { createOrder } from './db'
import Validator from './validator'

export const create = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data submitted' })
	if (!Validator.createOrder(req.body)) return res.json({ message: 'Wrong data submitted' })
	createOrder(req.body)
		.then((r: any) =>
			res.json({
				_id: r._id,
				submitter: r.submitter,
				itemId: r.itemId,
				size: r.size,
				color: r.color,
				status: r.status,
			})
		)
		.catch((e) => console.log(e))
}
