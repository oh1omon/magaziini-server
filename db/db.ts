import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from './User/UserModel'
import Validator from '../controllers/validator'
import { IFilterObj, ISignUpUser, UserDocument } from '../types'

let db: any

/**
 * Connects to the Mongo DataBase and adds listeners for success connection and errors
 * @returns connection instance**/
export const connectToMongo = () => {
    //If the db variable already set, then it will not produce any new connections
    if (db) {
        return
    }

    //Connecting to Mongo
    mongoose
        .connect(process.env.DB_CONNECTION_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .catch((error) => console.log(error))

    //Setting connection instance to the db variable
    db = mongoose.connection

    //Success listener
    db.once('open', async () => console.log('Connected'))

    //Failure listener
    db.on('error', (err: Error) => {
        console.log(err)
    })

    return db
}

/**
 * @param filter intakes the string by which field of document to do searches
 * @param value intakes the string of value to compare with the documents
 * Searching only through the Users collection
 * @returns either found document, or null*/
export const findOneUser = async (filter: string, value: any) => {
    if (
        !Validator.checkEmptyString(filter) ||
        !Validator.checkEmptyString(value)
    ) {
        return
    }
    let filterObj: IFilterObj = {}
    filterObj[filter] = value
    return User.findOne(filterObj, (err: Error, data: UserDocument) => {
        if (err) {
            return err.message
        }
        return data
    })
}

/**
 * @param {object} userObj
 * @returns user created -> returns user document with deleted password
 * @returns already user with this email -> returns string with message
 */
export const signUpUser = async (userObj: ISignUpUser) => {
    return new Promise(async (resolve, reject) => {
        if (await findOneUser('email', userObj.email)) {
            return resolve(
                `There are already an account assigned to ${userObj.email}`
            )
        }
        User.create(
            {
                _id: new mongoose.Types.ObjectId(),
                email: userObj.email,
                password: await bcrypt.hash(userObj.password, 10),
                username: userObj.username,
                favorites: [],
                orders: [],
            },
            (err, doc) => {
                if (err) {
                    return reject(err.message)
                }
                return resolve({
                    _id: doc._id,
                    email: doc.email,
                    orders: doc.orders,
                    favorites: doc.favorites,
                })
            }
        )
    })
}
