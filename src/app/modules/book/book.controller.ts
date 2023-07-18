import jwt from 'jsonwebtoken';
import { IBookFilters } from './book.interface';


/* eslint-disable no-console */
import { Request, RequestHandler, Response } from "express";
import { BookService } from "./book.service";
import { bookFilter } from './book.constant';
import { IJWTPayload } from '../../common/common';


const getSingleBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const book = await BookService.getSingleBook(id as string)
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
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get book",
        });
    }
}
const createBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const bookInfo = req.body
        const token = req.headers.authorization
        console.log(token)
        // decoding the token and adding added by in the bookInfo
        const decodedToken = jwt.verify(token!, 'secret') as IJWTPayload
        console.log("decodedToken", decodedToken)
        const book = await BookService.createBook({ ...bookInfo, addedBy: decodedToken.data._id })

        res.json({ message: "book created successfully", code: 200, data: book })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Failed to create book",
        });
    }
}
const deleteBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        // const token = req.headers.authorization
        // console.log(token)
        // decoding the token and adding added by in the bookInfo
        // const decodedToken = jwt.verify(token!, 'secret') as IJWTPayload
        // console.log("decodedToken", decodedToken)
        const book = await BookService.deleteBook(id)

        res.json({ message: "book deleted successfully", code: 200, data: book })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
        });
    }
}
const editBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const bookedit = req.body
        console.log("req.body", bookedit);
        const book = await BookService.editBook(bookedit, id)

        res.json({ message: "book edited successfully", code: 200, data: book })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Failed to edit book",
        });
    }
}

const getAllBooks: RequestHandler = async (req: Request, res: Response) => {
    try {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const finalObj: any = {};

        for (const key of ["searchTerm", ...bookFilter]) {
            if (req.query[key]) {
                finalObj[key] = req.query[key];
            }
        }
        console.log(finalObj)
        const book = await BookService.getAllBooks(finalObj as IBookFilters)
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
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get book",
        });
    }
}

export const BookController = {
    getSingleBook,
    createBook,
    getAllBooks,
    deleteBook,
    editBook
}