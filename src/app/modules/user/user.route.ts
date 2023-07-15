import express from "express"
import { userController } from "./user.controller"
export const userRouter = express.Router()

userRouter.post('/signup', userController.createUser)
userRouter.post('/login', userController.loginUser)