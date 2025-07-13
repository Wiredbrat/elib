import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiError from "../utils/errorHandler.js";

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
userSchema.pre('save', async function(next) {
try {
    if(this.isModified('password')) {
      this.password = await encryptPassword(this.password)
    }
    next()
} catch (error) {
  next(new ApiError(401, 'password encryption failed', error))
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
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '2d',
  })
}

//function to create refreshToken
userSchema.methods.generateRefreshToken = async function() {
  return jwt.sign({
    _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_SECRET || '15d',
  })
}

// add user data updation functions with option to add profile image //

export const User = mongoose.model('User', userSchema)