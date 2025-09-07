import express, { urlencoded } from "express";
import { router } from "./routes/user.routes.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { bookRouter } from "./routes/book.routes.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express()

app.use(cors({
  origin: "https://elib-rary.vercel.app/", // frontend origin
  credentials: true
}))

app.use(urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user', router)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/auth', authRouter)
export default app