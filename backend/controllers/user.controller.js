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

const userLogin = asyncHandler(async(req, res) => {
// first check if the user exist 
//check for password 
//if password is correct then generate accesstoken and refreshtoken
//save it into cookies or header
//check for errors at all points 
//if no errors found send response

  const {username, email, password } = req.body

  if(!username || !email) {
    throw new ApiError(400, 'Enter valid username or password')
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

  const accessToken = existingUser.generateAccessToken()
  const refreshToken = existingUser.generateRefreshToken()

  return res
  .status(200)
  .cookie(accessToken, refreshToken)

})

export { 
  userRegister 
}