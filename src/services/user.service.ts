import { User } from "@/models/user.model"

class UserService {
  listUsers = async () => {
    return User.find().lean();
  }

  findOneByUsername = async (username: string) => {
    return await User.findOne({ username }).exec()
  }
}

export default new UserService()