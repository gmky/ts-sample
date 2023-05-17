import userService from "@/services/user.service"
import { Request, Response } from "express"

class UserController {
  listUsers = async (_req: Request, res: Response) => {
    const result = userService.listUsers()
    return res.json(result)
  }
}

export default new UserController()