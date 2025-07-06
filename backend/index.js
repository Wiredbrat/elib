import express, { urlencoded } from "express";
import { router } from "./routes/user.routes.js";
import cors from 'cors'

const app = express()

app.use(cors())
app.use(urlencoded())
app.use(express.json())
app.use('/api/v1/user', router)

export default app