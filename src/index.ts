import connectToMongo from './mongo/connect'
import express from "express"
import router from './routes/router'
import errorHandler from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
import './test'

const app = express()

app.use(cookieParser())

app.use(express.json());

app.use(router)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('server running')
    connectToMongo()
})