import mongoose, { Schema } from "mongoose";
import { jwt } from 'jsonwebtoken';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 50
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'] 
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)

