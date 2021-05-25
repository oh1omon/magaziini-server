import { Response } from 'express'
import { Request } from '../types'
import { subAdd } from './db'
import Validator from './validator'

/**
 * Function validates user input and then dispatcher sub add function.
 * After receiving response from that function we, sending response to the user
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const addSub = (req: Request, res: Response): void => {
	if (!req.body || !req.body.email) {
		res.json({ type: 'error' })
		return
	}
	if (!Validator.checkString(req.body?.email)) {
		res.json({ type: 'error' })
		return
	}
	subAdd(req.body.email)
		.then(() =>
			res.json({
				type: 'info',
			})
		)
		.catch((e: Error) => {
			console.log(e)
			res.json({ type: 'error' })
		})
}
