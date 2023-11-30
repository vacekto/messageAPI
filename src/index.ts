import connectToRedis from "./redis/connect"
import connectToMongo from './mongo/connect'

connectToMongo()
connectToRedis()

console.log('Hello')