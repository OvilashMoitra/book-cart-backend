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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const wishlist_service_1 = require("./wishlist.service");
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlistInfo = req.body;
        const wishlist = yield wishlist_service_1.WishlistService.addToWishlist(wishlistInfo);
        if (!wishlist) {
            res.json({ message: "Failed to add to wishlist", code: 400 });
        }
        res.json({ message: "wishlist created successfully", code: 200, data: wishlist });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add to wishlist",
        });
    }
});
const removeFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlistInfo = req.body;
        const wishlist = yield wishlist_service_1.WishlistService.deleteFromWishlist(wishlistInfo);
        if (!wishlist) {
            res.json({ message: "Failed to remove from wishlist", code: 400 });
        }
        res.json({ message: "wishlist removed successfully", code: 200, data: wishlist });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add to wishlist",
        });
    }
});
const getSingleUserWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const wishlist = yield wishlist_service_1.WishlistService.getSingleUserWishlist(id);
        if (!wishlist) {
            res.json({ message: "Failed to get wishlist", code: 400 });
        }
        res.json({ message: "wishlist retrieved successfully", code: 200, data: wishlist });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get wishlist",
        });
    }
});
exports.WishlistController = {
    removeFromWishlist,
    addToWishlist,
    getSingleUserWishlist
};
