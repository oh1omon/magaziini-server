import { IItem } from '../types'
import { createItem } from './db'
import Validator from './validator'

/**
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const addItem = (req: any, res: any) => {
	if (!req.body) {
		res.json({ err: 'No data provided' })
	}
	if (!Validator.createItem(req.body)) {
		return res.json({ message: 'Wrong data submitted' })
	}
	createItem(req.body)
		.then((r: IItem) => {
			return res.json({
				message: 'Item successfully added',
				item: r
			})
		})
		.catch((e: Error) => console.log(e))
}

//TODO update

//TODO delete
