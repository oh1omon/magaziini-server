import bcrypt from 'bcrypt'
import { ObjectId } from 'mongoose'
import { PassportStatic } from 'passport'
import LocalStrategy from 'passport-local'
import { IFindOneUser, IUser } from '../types'
// const LocalStrategy = require('passport-local').Strategy

/**
 * @param passport
 * @param findOneUser
 * Intakes passport instance,
 * function to find user by email to let authenticating able,
 * function to find user by id to deserialize the user*/
export const initializePassport = (passport: PassportStatic, findOneUser: IFindOneUser): void => {
	const authenticateUser = async (email: string, password: string, done: any): Promise<any> => {
		const user = await findOneUser('email', email)
		if (!user) {
			return done(null, false, {
				message: `No user found with ${email} email!`,
			})
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user, { message: 'Authorized!' })
			} else {
				return done(null, false, { message: 'Wrong password' })
			}
		} catch (e) {
			return done(e)
		}
	}

	//Initializing local strategy
	passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, authenticateUser))

	//Function for serializing user
	passport.serializeUser((user: IUser, done: any) => {
		done(null, user._id)
	})

	//Function for deserializing user
	passport.deserializeUser(async (id: string | ObjectId, done: any) => {
		return done(null, await findOneUser('_id', id))
	})
}
