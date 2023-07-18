import { IJWTPayload } from './../../common/common';

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
        res.status(400).json({
            success: false,
            message: "Failed to create user",
        });
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
        res.status(400).json({
            success: false,
            message: "Failed to logged in",
        });
    }
}

const getUserInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userToken = req.headers.authorization
        // const user = await userService.createUser(userInfo)
        // decoding the token and adding added by in the bookInfo
        const decodedToken = jwt.verify(userToken!, 'secret') as IJWTPayload
        const user = await userService.getUserInfo(decodedToken.data._id)
        res.json({ message: "User get successfully", code: 200, data: user })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to find user",
        });
    }
}

export const userController = {
    createUser,
    loginUser,
    getUserInfo
}