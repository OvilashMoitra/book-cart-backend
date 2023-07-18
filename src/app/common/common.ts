import { Schema } from 'mongoose';
export type IJWTPayload = {
    data: { email: string, _id: Schema.Types.ObjectId },
    iat: number,
    exp: number
}