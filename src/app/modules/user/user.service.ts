import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
import { UserModel } from "./user.model"
import { Schema } from 'mongoose';

const createUser = async (payload: IUser) => {
    const user = UserModel.create(payload)
    return user
}
const getUserInfo = async (payload: Schema.Types.ObjectId) => {
    const user = UserModel.findById(payload)
    return user
}
const loginUser = async (payload: IUser) => {
    const user = await UserModel.findOne({ email: payload.email }).select("+password")
    if (!user) {
        throw new Error("user not found")
    }
    const isMatch = bcrypt.compare(payload.password, user.password)
    if (user && !isMatch) {
        throw new Error("Password does not match")
    }
    return user
}

export const userService = {
    getUserInfo,
    createUser,
    loginUser
}