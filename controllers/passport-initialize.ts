import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
// const LocalStrategy = require('passport-local').Strategy

/**
 * @param passport
 * @param getUserByEmail
 * @param getUserById
 * Intakes passport instance,
 * function to find user by email to let authenticating able,
 * function to find user by id to deserialize the user*/
export const initializePassport = (passport: any, findOneUser: any) => {
    const authenticateUser = async (
        email: string,
        password: string,
        done: any
    ) => {
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
    passport.use(
        new LocalStrategy.Strategy({ usernameField: 'email' }, authenticateUser)
    )
    passport.serializeUser((user: any, done: any) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id: any, done: any) => {
        return done(null, await findOneUser('_id', id))
    })
}
