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
exports.WishlistService = void 0;
const wishlist_model_1 = require("./wishlist.model");
const addToWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const addedWishlist = yield wishlist_model_1.WishlistModel.create(payload);
    return addedWishlist;
});
const getSingleUserWishlist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const addedWishlist = yield wishlist_model_1.WishlistModel.find({ userId: id }).populate("userId").populate("bookId");
    // console.log(addedWishlist);
    return addedWishlist;
});
const deleteFromWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedWishlist = yield wishlist_model_1.WishlistModel.deleteOne({ userId: payload.userId, bookId: payload.bookId });
    return deletedWishlist;
});
exports.WishlistService = {
    addToWishlist,
    getSingleUserWishlist,
    deleteFromWishlist
};
