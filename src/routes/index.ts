import { Router } from "express"
import userRoutes from "@routes/user.route"
import authRoutes from "@routes/auth.route"

const router = Router()

router.use("/users", userRoutes)
router.use("/auth", authRoutes)

export default router