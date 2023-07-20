"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistModel = void 0;
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'users' },
    bookId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "books" }
});
exports.WishlistModel = (0, mongoose_1.model)('wishlists', wishlistSchema);
