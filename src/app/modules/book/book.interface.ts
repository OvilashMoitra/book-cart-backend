import { Date, Schema } from 'mongoose';


export type IBook = {
    imageUrl: string,
    name: string,
    genre: string,
    publicationYear: number;
    author: string,
    addedBy: Schema.Types.ObjectId
}


export type IBookFilters = {
    searchTerm?: string;
    name: string,
    genre: string,
    publicationYear: Date;
    author: string,
};