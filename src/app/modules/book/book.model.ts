
import { IBook } from './book.interface';
import { Schema, model } from 'mongoose';
const bookSchema = new Schema<IBook>({
    name: { type: String, required: true },
    publicationYear: { type: Date, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    genre: { type: String, required: true },
    addedBy: { type: Schema.ObjectId, required: true }
}, { timestamps: true })

export const BookModel = model<IBook>('books', bookSchema)