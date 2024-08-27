import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import doctorRoute from "./routes/doctor.js"
import cookieParser from "cookie-parser"
import http from 'http';
import WebSocket from 'ws';


const app = express()
dotenv.config()

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB')
    } catch (error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disocnnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB cnnected")
})

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/Doc',doctorRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong! "
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})


app.listen(3000, ()=>{
    connect()
    console.log('connected to backend')
})