import { UserStatusEnum } from "@/constants/user-status.enum"
import { genSaltSync, hashSync } from "bcrypt"
import { Model, Schema, model } from "mongoose"

export interface IUser {
  username: string

  email: string

  password: string

  salt: string

  firstName: string

  lastName: string

  status: UserStatusEnum
}

interface IUserMethods {
  hashPassword(): void
}

export type UserModel = Model<IUser, {}, IUserMethods>

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, get: (): undefined => undefined },
  salt: { type: String, get: (): undefined => undefined },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, enum: UserStatusEnum, default: UserStatusEnum.PENDING, index: true }
}, {
  collection: "users",
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: {
    getters: true
  }
})

UserSchema.method("hashPassword", function hashPassword() {
  if (this.isModified("password")) {
    this.salt = genSaltSync(Number(process.env.SALT_ROUND))
    this.password = hashSync(this.get("password", null, { getters: false }), this.get("salt", null, { getters: false }))
  }
})

UserSchema.pre("save", function (next) {
  this.hashPassword()
  next()
})

export const User = model<IUser, UserModel>("User", UserSchema)