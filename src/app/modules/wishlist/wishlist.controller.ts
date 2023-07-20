import { Request, RequestHandler, Response } from 'express';
import { WishlistService } from './wishlist.service';
const addToWishlist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const wishlistInfo = req.body
        const wishlist = await WishlistService.addToWishlist(wishlistInfo)
        if (!wishlist) {
            res.json({ message: "Failed to add to wishlist", code: 400 })
        }
        res.json({ message: "wishlist created successfully", code: 200, data: wishlist })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add to wishlist",
        });
    }
}
const removeFromWishlist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const wishlistInfo = req.body
        const wishlist = await WishlistService.deleteFromWishlist(wishlistInfo)
        if (!wishlist) {
            res.json({ message: "Failed to remove from wishlist", code: 400 })
        }
        res.json({ message: "wishlist removed successfully", code: 200, data: wishlist })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add to wishlist",
        });
    }
}
const getSingleUserWishlist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const wishlist = await WishlistService.getSingleUserWishlist(id as string)
        if (!wishlist) {
            res.json({ message: "Failed to get wishlist", code: 400 })
        }
        res.json({ message: "wishlist retrieved successfully", code: 200, data: wishlist })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get wishlist",
        });
    }
}

export const WishlistController = {
    removeFromWishlist,
    addToWishlist,
    getSingleUserWishlist
}

