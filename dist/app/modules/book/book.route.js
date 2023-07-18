"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.put('/:id', book_controller_1.BookController.editBook);
exports.bookRouter.get('/:id', book_controller_1.BookController.getSingleBook);
exports.bookRouter.delete('/:id', book_controller_1.BookController.deleteBook);
exports.bookRouter.post('/', book_controller_1.BookController.createBook);
exports.bookRouter.get('/', book_controller_1.BookController.getAllBooks);
