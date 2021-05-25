import MongoStore from 'connect-mongo'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { connectToMongo } from './controllers/db'
import mainRoutes from './routes/index'
dotenv.config()

//Extracting PORT & HOST variables from .env file
const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

//Initializing Mongo
connectToMongo()

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
app.use('/api', mainRoutes)

//Responding to the all others routes with this message
app.get('*', (req, res) => {
	res.send('This is an api server only')
})

//Starting server
app.listen(PORT, () => {
	console.log(`server is listening on ${PORT}`)
})
