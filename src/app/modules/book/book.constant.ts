import { IBook } from './book.interface';


export const bookFilter: Array<keyof IBook> = ["name", "author", "publicationYear", "genre"]