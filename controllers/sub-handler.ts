import { subAdd } from './db'
import Validator from './validator'

export const addSub = (req: any, res: any) => {
	if (!req.body || !req.body.email) return res.json({ type: 'error' })
	if (!Validator.checkString(req.body?.email)) return res.json({ type: 'error' })
	subAdd(req.body.email)
		.then((r: any) =>
			res.json({
				type: 'info',
			})
		)
		.catch((e) => res.json({ type: 'error' }))
}
