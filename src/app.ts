import express, { Express } from "express"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"
import { errorHandler } from "@middlewares/error.mid"
import routes from "@routes/index"

const app: Express = express()

// Initialize middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())

// Initialize routes
app.use("/", routes)

// Handling errors
app.use(errorHandler)

export default app