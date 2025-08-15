import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: {
    type: String,
  },
  author: {
    type: Array,
  },
  publishYear: {
    type: Number
  },
  bookId: {
    type: String,
    required: true
  },
  bookCover:{
    type: String,
    required: true
  },
  category: [{
    type: String,
    lowercase: true
  }],
  favorite: {
    type: Boolean
  }  
}, {timestamps: true})

export const Book = mongoose.model('Book', bookSchema)