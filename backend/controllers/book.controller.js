import { Book } from "../models/book.model";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/errorHandler";
import ApiResponse from "../utils/responseHandler";

const addBookToCollection = asyncHandler(async(req, res) => {

  const bookDetails = req.body//change it after integrating external api

  if(!bookDetails) {
    throw new ApiError(400, 'invalid book data')
  }

  const existingBook = await Book.findById(bookDetails.key)
  if(existingBook) {
    throw new ApiError(403, 'book already in the collection')
  }
  const book = await Book.create({
    bookName: bookDetails.title,
    author: bookDetails.author_name[1], 
    publishYear: bookDetails.first_publish_year,
    bookId: bookDetails.key,
    status: null, //need to chnage when frontend is ready
    category: null, 
  }, {new: true, validateBeforeSave: false})

  if(!book) {
    throw new ApiError(400, 'error while saving book to user collection')
  }
  return res
  .status(200)
  .json(new ApiResponse(200, book, 'book added to user collection'))
})

// const createCategory = asyncHandler(async(req, res) => {

// })

export { addBookToCollection }