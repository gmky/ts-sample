import { HttpStatusCode } from "@constants/http-code.enum"

export class HttpError extends Error {
  status: number

  message: string

  code: HttpStatusCode

  constructor(status: number, code: HttpStatusCode, message: string) {
    super();
    this.status = status
    this.message = message
    this.code = code
  }
}