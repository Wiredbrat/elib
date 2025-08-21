import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import ApiResponse from "../utils/responseHandler.js";
import mongoose from "mongoose";

const addBookToCollection = asyncHandler(async(req, res) => {

  const { bookDetails } = req.body//change it after integrating external api

  console.log(bookDetails?.data.key)
  if(!bookDetails) {
    throw new ApiError(400, 'invalid book data')
  }

  let book = await Book.findOne({bookId: bookDetails.data.key})
  if(!book) {
    book = await Book.create({
    bookName: bookDetails?.data?.title,
    author: bookDetails?.author, 
    publishYear: bookDetails?.data?.first_publish_year,
    status: 'Plan To Read', //need to chnage when frontend is ready
    bookId: bookDetails.data?.key || "0",
    bookCover: bookDetails?.coverUrl || null,
    category: null, 
    
    })

    // await User.updateMany({}, {$set: {favorite : false}}) 

    if(!book) {
      throw new ApiError(400, 'error while saving book to user collection')
    }

  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {$addToSet: { books: book._id }},
    {new: true}
  )



  return res
  .status(200)
  .json(new ApiResponse(200, updatedUser.books, 'book added to user collection'))
})

const updateBookStatus = asyncHandler(async(req, res) => {
  const {_id, status} = req.body

  if(!status) {
    throw new ApiError(400, 'not a valid status')
  }

  const updatedStatus = await User.findOneAndUpdate(
    {_id: req.user._id, "books._id": new mongoose.Types.ObjectId(_id)}, 
    {$set: {"books.$.status": status}}, 
    {new: true, runValidators: true}
  )
   
  console.log(updatedStatus)

  if(!updatedStatus) {
    throw new ApiError(400, 'error while updating status')
  }
  return res
  .status(200)
  .json(new ApiResponse(200, updatedStatus, 'status updated successfully'))
})

const deleteBookFromCollection = asyncHandler(async(req, res) => {
  const { _id } = req.body
  
  if(!mongoose.Types.ObjectId.isValid(_id )) {
    throw new ApiError(400, 'Not a valid Book ID')
  }


  console.log(await User.findById(req.user._id))

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id }, 
    { $pull: { books: { _id: new mongoose.Types.ObjectId(_id) } } },
    { new: true }
  )

  if(!updatedUser) {
    throw new ApiError(500, 'Error while updating User')
  }
  
  return res
  .status(200)
  .json(new ApiResponse(200, updatedUser.books,'Book Removed Successfully'))
})

const setfavoriteBook = asyncHandler(async(req, res) => {
  const {_id} = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    throw new ApiError(404, 'No such book found in user data')
  } 

  const updatedUser = await User.findByIdAndUpdate(
    {_id: req.user._id, "books._id": new mongoose.Types.ObjectId(_id) },
    {$set: {"books.$.favorite": true}},
    {new: true}
  )

  if(!updatedUser) {
    throw new ApiError(500, 'Error while updating User')
  }

  return res
  .status(200)
  .json(new ApiResponse(200, updatedUser, 'Book set to favorite'))
  
})

const deleteFavoriteBook = asyncHandler(async (req, res) => {
  const {_id} = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    throw new ApiError(404, 'No such book found in user data')
  } 

  const updatedUser = await User.findByIdAndUpdate(
    {_id: req.user._id, "books._id": new mongoose.Types.ObjectId(_id) },
    {$set: {"books.$.favorite": false}},
    {new: true}
  )

  if(!updatedUser) {
    throw new ApiError(500, 'Error while updating User')
  }

  return res
  .status(200)
  .json(new ApiResponse(200, updatedUser, 'Book removed from favorite'))

})

export { 
  addBookToCollection,
  updateBookStatus, 
  deleteBookFromCollection, 
  setfavoriteBook, 
  deleteFavoriteBook 
}