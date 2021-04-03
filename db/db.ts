import mongoose from 'mongoose'

let database: any

/**
 * Connects to the Mongo DataBase and adds listeners for success connection and errors
 * @returns connection instance**/
export const connectToMongo = () => {
    //If the database variable already set, then it will not produce any new connections
    if (database) {
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

    //Setting connection instance to the database variable
    database = mongoose.connection

    //Success listener
    database.once('open', async () => console.log('Connected'))

    //Failure listener
    database.on('error', (err: Error) => {
        console.log(err)
    })

    return database
}
