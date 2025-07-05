import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/errorHandler";

const userSignup = asyncHandler(async(req, res) => {
  const { username, password, fullName, email } = req.body

  if(!username) {
    throw new ApiError(400, 'username is required') 
  }else if(!email) {
    throw new ApiError(400, "email is required")
  }else if(!password) {
    throw new ApiError(400, "email is required")
  }else if(!fullName){
    throw new ApiError(400, "fullname is required")
  }

  const existingEmail = await User.findOne(email)
  
  if(existingEmail) {
    throw ApiError(401, 'Email Exists')
  }
  
  const existingUsername = await User.findOne(username)
  
  if(existingUsername) {
    throw ApiError(401, 'Username Exists')
  }


})