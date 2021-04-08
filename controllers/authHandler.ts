import Validator from './validator'
import { initializePassport } from './passportInitialize'
import passport from 'passport'
import { findOneUser, signUpUser } from '../db/db'

initializePassport(passport, findOneUser)

/**
 *
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object <- if everything went successfull
 * @returns Response with JSON object containing message <- if wrong data submitted
 * @returns Response with JSON object containing error <- if internal error has occured
 */
export const register = (req: any, res: any) => {
    if (!req.body) {
        res.json({ err: 'No data provided' })
    }
    if (!Validator.singUp(req.body)) {
        return res.json({ message: 'Wrong data submitted' })
    }
    signUpUser(req.body)
        .then((r: any) => {
            if (typeof r !== 'string') {
                return res.json({
                    message: 'User created!',
                    user: {
                        _id: r._id,
                        email: r.email,
                        orders: r.orders,
                        favorites: r.favorites,
                    },
                })
            } else {
                res.json({ err: r })
            }
        })
        .catch((e: Error) => console.log(e))
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object
 */
export const login = (req: any, res: any) => {
    if (!Validator.signIn(req.body)) {
        return res.json({ message: 'Wrong data submitted' })
    }
    passport.authenticate('local', function (err: any, user: any, info: any) {
        if (err) {
            return res.json({ message: err.message })
        }
        if (!user) {
            return res.json({ message: 'user not found' })
        }
        req.login(user, function (err: Error) {
            if (err) {
                return res.json({ message: 'internal error' })
            }
            return res.json({
                message: 'authenticated',
                user: {
                    _id: user._id,
                    email: user.email,
                    orders: user.orders,
                    favorites: user.favorites,
                },
            })
        })
    })(req, res)
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Response with JSON object containing user object
 */
export const retrieve = (req: any, res: any) => {
    return res.json({
        user: {
            _id: req.user._id,
            email: req.user.email,
            orders: req.user.orders,
            favorites: req.user.favorites,
        },
    })
}

/**
 * @param { Request } req
 * @param { Response } res
 * @returns Perfoms log out process and then deletes client side session cookie
 */
export const signout = (req: any, res: any) => {
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
