import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from "./routes/postRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import {v2 as cloudinary} from 'cloudinary'
dotenv.config()
connectDB()

const app = express()
const PORT=process.env.PORT || 5000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())// to parse cookies

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/messages", messageRoutes)


const __dirname=path.resolve()

if(process.env.NODE_ENV==='production'){

    app.use(express.static(path.join(__dirname,'frontend/dist')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend','dist','index.html'))
    }
    )
} else {
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}
app.listen(PORT, () => {console.log(`Server started at http://localhost:${PORT}`)})