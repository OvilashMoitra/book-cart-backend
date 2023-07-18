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
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.UserModel.create(payload);
    return user;
});
const getUserInfo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.UserModel.findById(payload);
    return user;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new Error("user not found");
    }
    const isMatch = bcryptjs_1.default.compare(payload.password, user.password);
    if (user && !isMatch) {
        throw new Error("Password does not match");
    }
    return user;
});
exports.userService = {
    getUserInfo,
    createUser,
    loginUser
};
