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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.BookModel.findById(id);
    return book;
});
const getAllBooks = (filter) => {
    const { searchTerm } = filter, filterTerm = __rest(filter, ["searchTerm"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookFilter.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filterTerm).length) {
        andConditions.push({
            $and: Object.entries(filterTerm).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const data = book_model_1.BookModel.find(whereConditions).sort({ createdAt: -1 });
    return data;
};
const createBook = (payload) => {
    const book = book_model_1.BookModel.create(payload);
    return book;
};
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.BookModel.deleteOne({ _id: id });
    return book;
});
const editBook = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("coming from frontend", payload);
    const book = yield book_model_1.BookModel.findByIdAndUpdate({ _id: id }, payload);
    return book;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    editBook
};
