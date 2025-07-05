import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: {
    type: String,
  },
  status:{
    type: String,
    enum: ['Reading', 'Plan to read', 'On hold', 'Completed', 'Dropped'],
    required: true,
  },
  bookId: {
    type: String,
    required: true
  },
  category: [{
    type: String,
    lowercase: true
  }]
}, {timestamps: true})

export const Book = mongoose.model('Book', bookSchema)