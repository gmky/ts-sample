import userController from "@/controllers/user.controller";
import { Router } from "express";

const router = Router()

router.get("/", userController.listUsers)

export default router