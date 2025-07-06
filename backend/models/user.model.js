import mongoose, { Schema } from "mongoose";
import { jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiError from "../utils/errorHandler";

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
  refreshToken: {
    type: String
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)

//function for encrypting password
const encryptPassword = async (password) => {  
  try {  
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
  } catch (error) {
    throw new ApiError(400, 'error while encrypting password', error)
  }
}

//middleware for encrypting password
userSchema.pre('save', function(next) {
  if(this.isModified(password)) {
    encryptPassword(this.password)
    next()
  }else{
    next()
  }
})

//function for comparing encrypted password and normal password for verification:
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password) 
}

//function to create accessToken
userSchema.methods.generateAccessToken = async function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    fullName: this.fullName,
    email: this.email
  }),
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  }
}

//function to create refreshToken
userSchema.methods.generateRefreshToken = async function() {
  return jwt.sign({
    _id: this._id,
  }),
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  }
}
