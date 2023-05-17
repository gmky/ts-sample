import { LoginDTO } from "@/dtos/login.dto";
import { RegisterDTO } from "@/dtos/register.dto";
import authService from "@/services/auth.service";
import { Request, Response } from "express";

class AuthController {
  login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    const { body: data } = req
    const result = await authService.login(data)
    return res.status(200).json(result)
  }

  register = async (req: Request<{}, {}, RegisterDTO>, res: Response) => {
    const result = await authService.register(req.body)
    return res.status(201).json(result)
  }
}

export default new AuthController()