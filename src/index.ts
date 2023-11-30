import connectToRedis from "./redis/connect"
import connectToMongo from './mongo/connect'
import express from "express"

const app = express()

app.get('/test', (req, res) => {
    console.log('TESTING')
    res.status(200)
})

app.listen(3000, ()=>{
    console.log(`server running on port ${process.env.PORT_SERVER} in mode: `, process.env.NODE_ENV)
    connectToMongo()
    connectToRedis()
})


console.log('Hello')