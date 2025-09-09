import {Server} from 'http'
import mongoose from 'mongoose'
import { app } from './app'

let server: Server

const startServer = async() => {
    try {
        await mongoose.connect("mongodb+srv://mongo-juna:mongodb@cluster0.8ujknfb.mongodb.net/riding-management-backend?retryWrites=true&w=majority&appName=Cluster0")

        console.log("connecting to db");

        server = app.listen(5000, () => {
            console.log("Server is listening 5000")
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()