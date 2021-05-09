import { subAdd } from './db'
import Validator from './validator'

export const addSub = (req: any, res: any) => {
	if (!req.body) return res.json({ err: 'No data submitted' })
	if (!Validator.checkString(req.body)) return res.json({ message: 'no email sent' })
	subAdd(req.body)
		.then((r: any) =>
			res.json({
				message: 'Email Added',
			})
		)
		.catch((e) => console.log(e))
}
