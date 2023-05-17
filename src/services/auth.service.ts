import { HttpStatusCode } from "@/constants/http-code.enum";
import { UserStatusEnum } from "@/constants/user-status.enum";
import { LoginDTO } from "@/dtos/login.dto";
import { RegisterDTO } from "@/dtos/register.dto";
import { HttpError } from "@/errors/http.error";
import { UnauthorizedError } from "@/errors/unauthorized.error";
import { getPrivateKey } from "@/helpers/key.helper";
import { User } from "@/models/user.model";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

class AuthService {
  login = async (data: LoginDTO) => {
    const existedUser = await User.findOne({ username: data.username }).exec()
    if (!existedUser) throw new UnauthorizedError()

    const isPasswordMatched = compareSync(data.password, existedUser.get("password", null, { getters: false }))
    if (!isPasswordMatched) throw new UnauthorizedError()

    if (UserStatusEnum.ACTIVE != existedUser.status) throw new UnauthorizedError("User has not been activated yet")

    const privateKey = getPrivateKey()
    const accessToken = sign(existedUser.toJSON(), privateKey, { algorithm: "RS256", expiresIn: "10h" })

    const { username, email, id } = existedUser
    const idToken = sign({ username, email, id }, privateKey, { algorithm: "RS256", expiresIn: "10h" })

    const refreshToken = sign(existedUser.toJSON(), privateKey, { algorithm: "RS256", expiresIn: "30d" })

    return { idToken, accessToken, refreshToken }
  }

  register = async (data: RegisterDTO) => {
    let existedUser = await User.exists({ username: data.username }).exec()
    if (existedUser) throw new HttpError(400, HttpStatusCode.USER_EXISTED, "Username already existed")
    existedUser = await User.exists({ email: data.email }).exec()
    if (existedUser) throw new HttpError(400, HttpStatusCode.USER_EXISTED, "Email already existed")
    const user = new User(data)
    return await user.save()
  }
}

export default new AuthService()