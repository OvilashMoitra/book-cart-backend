"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    genre: { type: String, required: true },
    addedBy: { type: mongoose_1.Schema.ObjectId, required: true }
}, { timestamps: true });
exports.BookModel = (0, mongoose_1.model)('books', bookSchema);
