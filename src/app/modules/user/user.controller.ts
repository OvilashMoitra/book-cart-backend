/* eslint-disable no-console */
import jwt from "jsonwebtoken"
import { Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";

const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body
        const user = await userService.createUser(userInfo)
        const token = jwt.sign({
            data: { email: user.email, _id: user._id }
        }, 'secret', { expiresIn: '7d' });
        res.json({ message: "User created successfully", token, code: 200 })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to create user')
    }
}
const loginUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body
        const user = await userService.loginUser(userInfo)
        const token = jwt.sign({
            data: { email: user.email, _id: user._id }
        }, 'secret', { expiresIn: '7d' });
        res.json({ message: "User logged in successfully", token, code: 200, data: user })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to create user')
    }
}

export const userController = {
    createUser,
    loginUser
}