import { Response } from 'express'
import passport from 'passport'
import { IUser, Request } from '../types'
import { findOneUser, signUpUser, updateUser } from './db'
import { userDocToObject } from './helper'
import { initializePassport } from './passport-initialize'
import Validator from './validator'

initializePassport(passport, findOneUser)

/**
 *
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object <- if everything went successfully
 * @returns Response with JSON object containing message <- if wrong data submitted
 * @returns Response with JSON object containing error <- if internal error has occurred
 */
export const register = (req: Request, res: Response): void => {
	if (!req.body) {
		res.json({ err: 'No data provided' })
		return
	}
	if (!Validator.singUp(req.body)) {
		res.json({ message: 'Wrong data submitted' })
		return
	}
	signUpUser(req.body)
		.then((r: string | IUser) => {
			if (typeof r !== 'string') {
				req.login(r, function (err: Error) {
					if (err) {
						res.json({ message: 'internal error' })
						return
					}
					res.json({
						message: 'authenticated',
						user: r,
					})
					return
				})
			} else {
				res.json({ message: r })
			}
		})
		.catch((e: Error) => {
			console.log(e)
			res.json({ message: e })
			return
		})
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object
 */
export const login = (req: Request, res: Response): void => {
	if (!Validator.signIn(req.body)) {
		res.json({ message: 'Wrong data submitted' })
		return
	}
	passport.authenticate('local', function (err: any, user: any) {
		if (err) {
			res.json({ message: err.message })
			return
		}
		if (!user) {
			res.json({ message: 'Wrong email or password!' })
			return
		}
		req.login(user, function (err: Error) {
			if (err) {
				res.json({ message: 'internal error' })
				return
			}
			res.json({
				message: 'authenticated',
				user: userDocToObject(user),
			})
			return
		})
	})(req, res)
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object
 */
export const retrieve = (req: Request, res: Response): void => {
	if (req.user) {
		res.json({ user: req.user })
		return
	}
	res.json({ user: null })
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Perfoms log out process and then deletes client side session cookie
 */
export const signout = (req: Request, res: Response): void => {
	req.logout()
	req.session.destroy(function (err: Error) {
		if (!err) {
			res.status(200)
				.clearCookie('connect.sid', { path: '/' })
				// This one is just for check
				.json({ user: req.user })
		} else {
			// handle error case...
			console.log(err)
		}
	})
}

/**
 * Function performs validation of input, then dispatches user update function.
 * According to the response, we sending different answers to the user.
 * @param req Request
 * @param res Response
 * @returns {void}
 */
export const update = (req: Request, res: Response): void => {
	if (!req.body) {
		res.json({ message: 'No data submitted!' })
		return
	}
	if (!req.user) {
		res.json({ message: 'You have to be logged in to change your profile!' })
		return
	}
	const updateObj = Validator.updateUser(req.body)
	updateUser(req.user._id, updateObj)
		.then((r: IUser) => {
			res.json({ message: 'update successful', user: r })
			return
		})
		.catch((e) => {
			console.log(e)
			res.json({ message: e })
		})
}
