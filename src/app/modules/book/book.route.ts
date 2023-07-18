import express from 'express'
import { BookController } from './book.controller'

export const bookRouter = express.Router()

bookRouter.put('/:id', BookController.editBook)
bookRouter.get('/:id', BookController.getSingleBook)
bookRouter.delete('/:id', BookController.deleteBook)
bookRouter.post('/', BookController.createBook)
bookRouter.get('/', BookController.getAllBooks)