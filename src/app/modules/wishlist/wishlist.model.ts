import { IWishlist } from './wishlist.interface';
import { Schema, model } from 'mongoose';
const wishlistSchema = new Schema<IWishlist>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "books" }
})

export const WishlistModel = model<IWishlist>('wishlists', wishlistSchema)