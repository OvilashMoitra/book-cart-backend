import express from 'express'
import { BookController } from './book.controller'

export const bookRouter = express.Router()

bookRouter.get('/:id', BookController.getSingleBook)
bookRouter.post('/', BookController.createBook)
bookRouter.get('/', BookController.getAllBooks)