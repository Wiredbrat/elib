import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import ApiError from "../utils/errorHandler.js";

const validateToken = asyncHandler(async(req, _, next) => {
  //check if user is login or not
  //get access token from cookies
  // find the user and save it in req

  const token = req.cookies?.accessToken || req.header('authorization')?.replace('Bearer ', '') 
  
  if(!token) {
    throw new ApiError(401, "unauthorized User")
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  if(!decodedToken) {
    throw new ApiError(400, 'error while getting user data from cookies')
  }

  const user = await User.findById(decodedToken?._id)

  if(!user) {
    throw new ApiError(404, 'no user found')
  }
  req.user = user
  next()
})

export { validateToken }