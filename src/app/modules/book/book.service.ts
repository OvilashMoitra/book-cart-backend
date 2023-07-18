
import { bookFilter } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { BookModel } from './book.model';

const getSingleBook = (id: string) => {
    const book = BookModel.findById(id)
    return book;
}

const getAllBooks = (filter: IBookFilters) => {
    const { searchTerm, ...filterTerm } = filter
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: bookFilter.map(field => ({
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
    console.log(whereConditions)
    const data = BookModel.find(whereConditions)
    return data
}

const createBook = (payload: IBook) => {
    const book = BookModel.create(payload)
    console.log("book create", book)
    return book
}

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook
}