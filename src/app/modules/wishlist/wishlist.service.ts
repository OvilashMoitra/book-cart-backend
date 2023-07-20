import { WishlistModel } from './wishlist.model';
import { IWishlist } from './wishlist.interface';


const addToWishlist = async (payload: IWishlist) => {
    const addedWishlist = await WishlistModel.create(payload)
    return addedWishlist
}

const getSingleUserWishlist = async (id: string) => {
    // console.log(id);
    const addedWishlist = await WishlistModel.find({ userId: id }).populate("userId").populate("bookId")
    // console.log(addedWishlist);
    return addedWishlist
}

const deleteFromWishlist = async (payload: IWishlist) => {
    const deletedWishlist = await WishlistModel.deleteOne({ userId: payload.userId, bookId: payload.bookId })
    return deletedWishlist
}

export const WishlistService = {
    addToWishlist,
    getSingleUserWishlist,
    deleteFromWishlist
}
