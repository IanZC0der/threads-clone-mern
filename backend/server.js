import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
connectDB()

const app = express()
const PORT=process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())// to parse cookies

// Routes
app.use("/api/users", userRoutes)
app.listen(PORT, () => {console.log(`Server started at http://localhost:${PORT}`)})