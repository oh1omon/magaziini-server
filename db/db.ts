import mongoose from 'mongoose'

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
