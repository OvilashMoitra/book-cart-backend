import express from "express"
import { WishlistController } from "./wishlist.controller"

export const wishlistRouter = express.Router()

wishlistRouter.get('/:id', WishlistController.getSingleUserWishlist)
wishlistRouter.post('/', WishlistController.addToWishlist)
wishlistRouter.delete('/', WishlistController.removeFromWishlist)