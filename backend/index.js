import express, { urlencoded } from "express";
import { router } from "./routes/user.routes.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { bookRouter } from "./routes/book.routes.js";

const app = express()

app.use(cors())
app.use(urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user', router)
app.use('/api/v1/books', bookRouter)

export default app