import mongoose from 'mongoose'
import { User } from './User/UserModel'
import Validator from '../controllers/validator'
import { IFilterObj, UserDocument } from '../types'

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
