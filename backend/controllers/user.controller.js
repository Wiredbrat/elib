import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import ApiResponse from "../utils/responseHandler.js";

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

  const newUser = await User.findById(user._id).select('-password, -refreshToken')

  if(!newUser) {
    throw new ApiError(503, 'error while creating user')
  }

  console.log(newUser)
  return res.status(201).json(
    new ApiResponse(200, newUser, 'user created successfully')
  )
})


export { 
  userRegister 
}