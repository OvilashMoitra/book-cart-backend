"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
/* eslint-disable no-console */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = yield user_service_1.userService.createUser(userInfo);
        const token = jsonwebtoken_1.default.sign({
            data: { email: user.email, _id: user._id }
        }, 'secret', { expiresIn: '7d' });
        res.json({ message: "User created successfully", token, code: 200 });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create user",
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = yield user_service_1.userService.loginUser(userInfo);
        const token = jsonwebtoken_1.default.sign({
            data: { email: user.email, _id: user._id }
        }, 'secret', { expiresIn: '7d' });
        res.json({ message: "User logged in successfully", token, code: 200, data: user });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to logged in",
        });
    }
});
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = req.headers.authorization;
        // const user = await userService.createUser(userInfo)
        // decoding the token and adding added by in the bookInfo
        const decodedToken = jsonwebtoken_1.default.verify(userToken, 'secret');
        const user = yield user_service_1.userService.getUserInfo(decodedToken.data._id);
        res.json({ message: "User get successfully", code: 200, data: user });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to find user",
        });
    }
});
exports.userController = {
    createUser,
    loginUser,
    getUserInfo
};
