import * as dotenv from "dotenv"
dotenv.config()

import { getLogger } from "@configs/log.config"
import app from "@/app"
import { closeDatabase, initDatabase } from "@/configs/db.config"

const logger = getLogger("Application")
const port: number = Number(process.env.PORT) || 3000

async function startServer() {
  await initDatabase();
  const appInstance = app.listen(port, () => {
    logger.info(`Application is running on port ${port}`)
  })

  process.on("SIGINT", async () => {
    await closeDatabase()
    appInstance.close(() => logger.warn("Application exited"))
  })
}

startServer();