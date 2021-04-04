import express from 'express'
import session from 'express-session'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { connectToMongo } from './db/db'
import authRoutes from './routes/authRoutes'
import path from 'path'

//Extracting PORT & HOST variables from .env file
const PORT: number = parseInt(process.env.PORT as string, 10)
const HOST: string = process.env.HOST!

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// to ensure requests made on the frontend are processed on the backend for now add localhost:3000 to .env as ALLOWED_ORIGINS
// app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGINS }))
app.use(cors())

//Initializing Mongo
let db = connectToMongo()

//Initializing Express session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_CONNECTION_LINK,
            stringify: false,
        }),
        cookie: { maxAge: 60 * 60 * 1000 * 24 * 30 },
    })
)

//Applying Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Adding information about authentication routes to express
app.use(authRoutes)

app.get('/', (req, res) => {
    res.json({ hello: 'hello' })
})

// // Only for testing
// app.use(express.static(path.join(__dirname, 'build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build/index.html'))
// })

//Starting server
app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})
