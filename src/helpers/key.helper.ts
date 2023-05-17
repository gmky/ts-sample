import { getLogger } from "@/configs/log.config"
import { HttpStatusCode } from "@/constants/http-code.enum"
import { HttpError } from "@/errors/http.error"
import { readFileSync } from "fs"
import { join } from "path"

const log = getLogger("KeyHelper")

export const getPrivateKey = () => {
  try {
    const data = readFileSync(join(__dirname, "..", "certificates", "private.key"))
    return data;
  } catch (error) {
    log.error("Failed to get private key", error)
    throw new HttpError(500, HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong")
  }
}