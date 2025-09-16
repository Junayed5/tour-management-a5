import {Server} from 'http'
import mongoose from 'mongoose'
import { app } from './app'
import { envVars } from './app/config/env'
import adminCreate from './app/utils/adminCreate'

let server: Server

const startServer = async() => {
    try {
        await mongoose.connect(envVars.MONGODB_URL)

        console.log("connecting to db");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening ${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();
adminCreate()