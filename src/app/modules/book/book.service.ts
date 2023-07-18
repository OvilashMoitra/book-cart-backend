
import { bookFilter } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { BookModel } from './book.model';

const getSingleBook = async (id: string) => {
    const book = await BookModel.findById(id)
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
    const data = BookModel.find(whereConditions).sort({ createdAt: -1 });
    return data
}

const createBook = (payload: IBook) => {
    const book = BookModel.create(payload)
    return book
}
const deleteBook = async (id: string) => {
    const book = await BookModel.deleteOne({ _id: id })
    return book
}
const editBook = async (payload: Partial<IBook>, id: string) => {
    // console.log("coming from frontend", payload);
    const book = await BookModel.findByIdAndUpdate({ _id: id }, payload)
    return book
}

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    editBook
}