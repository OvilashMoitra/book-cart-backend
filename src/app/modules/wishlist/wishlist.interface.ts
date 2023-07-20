import { Schema } from 'mongoose';
export type IWishlist = {
    userId: Schema.Types.ObjectId,
    bookId: Schema.Types.ObjectId
}