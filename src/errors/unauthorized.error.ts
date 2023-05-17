import { HttpStatusCode } from "@/constants/http-code.enum";
import { HttpError } from "./http.error";

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Access denied") {
    super(401, HttpStatusCode.UNAUTHORIZED_ERROR, message)
  }
}