import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/errorHandler";
import ApiResponse from "../utils/responseHandler";

const userRegister = asyncHandler(async(req, res) => {
  const { username, password, fullName, email } = req.body

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

  const existingEmail = await User.findOne(email)
  
  if(existingEmail) {
    throw ApiError(401, 'User with Given Email Exists')
  }
  
  const existingUsername = await User.findOne(username)

  if(existingUsername) {
    throw ApiError(401, 'User With Given Username Exists')
  }  


  const user = await User.create({
    username: username,
    fullName: fullName,
    email: email,
    password: password,
    refreshToken,
    avatar: avatar? avatar : null,
    books: []
  })

  const newUser = user.findById(user._id).select('-password, -refreshToken')

  return res
  .status(201)
  .json(
    new ApiResponse(200, )
  )
})


export { 
  userRegister 
}