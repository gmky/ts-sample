import { HttpStatusCode } from "@/constants/http-code.enum";
import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  constructor(message: string = "Not found") {
    super(404, HttpStatusCode.NOT_FOUND_ERROR, message)
  }
}