import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcryptjs';
export const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, select: 0 }
},
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    await bcrypt.hash(this.password, 12);
    next()
})

export const UserModel = model<IUser>("users", userSchema)