import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import ApiResponse from "../utils/responseHandler.js";

// register user
const userRegister = asyncHandler(async(req, res) => {
  const { password, username, fullName, email } = req.body

  if(!username) {
    throw new ApiError(400, 'username is required') 
  }
  
  if(!email) {
    throw new ApiError(400, "email is required")
  }

  if(!password) {
    throw new ApiError(400, "email is required")
  }

  if(!fullName){
    throw new ApiError(400, "fullname is required")
  }

  const existingEmail = await User.findOne({email})
  
  if(existingEmail) {
    throw new ApiError(401, 'User with Given Email Exists')
  }
  
  const existingUsername = await User.findOne({username})

  if(existingUsername) {
    throw new ApiError(401, 'User With Given Username Exists')
  }  

  const user = await User.create({
    username,
    fullName: fullName.toLowerCase(),
    email,
    password,
    refreshToken: null,
    avatar: null,
    books: []
  })

  const newUser = await User.findById(user._id).select('-password -refreshToken')

  if(!newUser) {
    throw new ApiError(503, 'error while creating user')
  }

  // console.log(newUser)
  return res.status(201).json(
    new ApiResponse(200, newUser, 'user created successfully')
  )
})

// login user
const userLogin = asyncHandler(async(req, res) => {

  const {username, email, password } = req.body
  console.log(req.body)
  if(!username && !email) {
    throw new ApiError(400, 'Enter valid username or email')
  }

  const existingUser = await User.findOne({
    $or: [ {username}, {email} ]
  })

  if(!existingUser) {
    throw new ApiError(404, 'User not found')
  }

  const isPasswordValid = existingUser.isPasswordCorrect(password)

  if(!isPasswordValid) {
    throw new ApiError(401, "Incorrect password")
  }

  const newAccessToken = await existingUser.generateAccessToken()
  const newRefreshToken = await existingUser.generateRefreshToken()
  
  // existingUser.refreshToken = newRefreshToken
  // existingUser.save({validateBeforeSave: false, new:true})
  
  if(!newAccessToken || !newRefreshToken) {
    throw new ApiError(400, 'error while generating tokens')
  }
  const user = await User.findByIdAndUpdate(existingUser._id, {refreshToken: newRefreshToken}, {new:true, runValidators: false}).select('-password -refreshToken')
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
  }

  return res
  .status(200)
  .cookie("accessToken", newAccessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json(new ApiResponse(200, user, 'user login successfully'))
})

// logout user
const userLogout = asyncHandler(async (req, res) => {
  // method 1
  // const loginUser = req?.user

  // if(!loginUser) {
  //   throw new ApiError(401, 'user not fetched properly')
  // }

  // loginUser.refreshToken = null
  // await loginUser.save()
  
  // method 2
  // console.log('userData', req.user)
  await User.findByIdAndUpdate(
    req.user?._id,
    {$unset: { refreshToken: 1 }},
    {new: true}
  )

  const options = {
    httpOnly: true,
    secure: false,
    expires: new Date(0)
    }

  return res
  .cookie("accessToken", '', options)
  .cookie("refreshToken", '',options)
  .json(new ApiResponse(200, {}, 'user logged out successfully'))
})

// chnage password
const changePassword = asyncHandler(async(req, res) => {
  const {oldPassword, newPassword, confirmPassword} = req.body

  if([oldPassword, newPassword, confirmPassword].some(password => password.trim() === '')) {
    throw new ApiError(400, 'fill all given fields')
  }

  if(newPassword !== confirmPassword) {
    throw new ApiError(401, 'new and confirm passwords does not match')
  }
   
  const loginUser = req.user

  const user = await User.findById(loginUser._id)

  if(!user) {
    throw new ApiError(401, 'user not found')
  }

  const verifyPassword = await user.isPasswordCorrect(oldPassword)

  if(!verifyPassword) {
    throw new ApiError(401, 'password is incorrect')
  }

  user.password = newPassword
  user.save({new:true})

  return res
  .status(200)
  .json(new ApiResponse(200, null, 'password changed Sucessfully'))

})

// get user collection data 
const getUserCollection = asyncHandler(async(req, res) => {
  console.log(req.user._id)
  const user = await User.aggregate([
    {
      $match: {
        _id: req.user._id
      }
    },
    {
      $unwind: '$books'
    },
    {
      $lookup: {
        from: 'books',
        localField: 'books.book',
        foreignField: '_id',
        as: 'bookData',
      }
    },
    {
      $unwind: '$bookData'
    },
    {
      $project: {
        _id: 1,
        title: '$bookData.bookName',
        author: '$bookData.author',
        cover: '$bookData.bookCover',
        publishYear: '$bookData.publishYear',
        status: '$books.status',  
        bookId: '$bookData._id'
      }
    }
  ])

  console.log(user)
  if(!user) {
    throw new ApiError(500, 'Error while fetching user')
  }

  return res
  .status(200)
  .json(new ApiResponse(200, user, 'user data feched successfully'))

})

const deleteUserAccount = asyncHandler(async(req, res) => {

  const user = await User.findByIdAndDelete(req.user._id)

  if(!user) {
    throw new ApiError(500, 'Error While Deleting User Account')
  }

  res
  .status(200)
  .json(new ApiResponse(200, user, 'User Account Deleted Successfully'))
})

export { 
  userRegister,
  userLogin,
  userLogout,
  changePassword,
  getUserCollection,
  deleteUserAccount
}