import connectToRedis from "./redis/connect"
import connectToMongo from './mongo/connect'
import express from "express"
import router from './routes/router'
import errorHandler from './middleware/errorHandler'

const app = express()

app.use(express.json());

app.use(router)

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`server running on port ${process.env.PORT_SERVER} in mode: `, process.env.NODE_ENV)
    connectToMongo()
    connectToRedis()
})
