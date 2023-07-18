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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const book_service_1 = require("./book.service");
const book_constant_1 = require("./book.constant");
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const book = yield book_service_1.BookService.getSingleBook(id);
        if (!book) {
            res.status(400).json({
                success: false,
                message: "Failed to get book",
            });
        }
        res.json({
            message: "book get successfully",
            code: 200,
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get book",
        });
    }
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookInfo = req.body;
        const token = req.headers.authorization;
        console.log(token);
        // decoding the token and adding added by in the bookInfo
        const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log("decodedToken", decodedToken);
        const book = yield book_service_1.BookService.createBook(Object.assign(Object.assign({}, bookInfo), { addedBy: decodedToken.data._id }));
        res.json({ message: "book created successfully", code: 200, data: book });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to create book",
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // const token = req.headers.authorization
        // console.log(token)
        // decoding the token and adding added by in the bookInfo
        // const decodedToken = jwt.verify(token!, 'secret') as IJWTPayload
        // console.log("decodedToken", decodedToken)
        const book = yield book_service_1.BookService.deleteBook(id);
        res.json({ message: "book deleted successfully", code: 200, data: book });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
        });
    }
});
const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const bookedit = req.body;
        console.log("req.body", bookedit);
        const book = yield book_service_1.BookService.editBook(bookedit, id);
        res.json({ message: "book edited successfully", code: 200, data: book });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to edit book",
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const finalObj = {};
        for (const key of ["searchTerm", ...book_constant_1.bookFilter]) {
            if (req.query[key]) {
                finalObj[key] = req.query[key];
            }
        }
        console.log(finalObj);
        const book = yield book_service_1.BookService.getAllBooks(finalObj);
        if (!book) {
            res.status(400).json({
                success: false,
                message: "Failed to get book",
            });
        }
        res.json({
            message: "book get successfully",
            code: 200,
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get book",
        });
    }
});
exports.BookController = {
    getSingleBook,
    createBook,
    getAllBooks,
    deleteBook,
    editBook
};
