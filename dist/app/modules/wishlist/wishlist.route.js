"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRouter = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
exports.wishlistRouter = express_1.default.Router();
exports.wishlistRouter.get('/:id', wishlist_controller_1.WishlistController.getSingleUserWishlist);
exports.wishlistRouter.post('/', wishlist_controller_1.WishlistController.addToWishlist);
exports.wishlistRouter.delete('/', wishlist_controller_1.WishlistController.removeFromWishlist);
