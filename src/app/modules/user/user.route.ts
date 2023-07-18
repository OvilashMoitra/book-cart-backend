import express from "express"
import { userController } from "./user.controller"
export const userRouter = express.Router()

userRouter.get('/', userController.getUserInfo)
userRouter.post('/signup', userController.createUser)
userRouter.post('/login', userController.loginUser)