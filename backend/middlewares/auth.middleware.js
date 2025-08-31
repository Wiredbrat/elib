import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import ApiError from "../utils/errorHandler.js";

const validateToken = asyncHandler(async (req, res, next) => {
  // Get access token from cookies or header
  let token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(404, 'unauthoried user')
  }

  // Validate Access Token
  
  let decodedToken;

  try{
  decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   
  } catch(error) {
    // Fallback: refresh token
    const refreshToken = req.cookies?.refreshToken || null;
    console.log("line 13",refreshToken)

    if (!refreshToken) {
      return next(new ApiError(401, "Unauthorized User"));
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return next(new ApiError(400, "Invalid Refresh Token"));
    }
    console.log("line 25", decodedRefreshToken)

    // Find user
    const user = await User.findById(decodedRefreshToken?._id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Generate new tokens
    const updatedRefreshToken = await user.generateRefreshToken();
    const updatedAccessToken = await user.generateAccessToken();

    user.refreshToken = updatedRefreshToken;
    user.accessToken = updatedAccessToken;
    await user.save();

    // Set cookies again
    res.cookie("accessToken", updatedAccessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", updatedRefreshToken, {
      httpOnly: true,
      secure: true,
    });

    // Use the new access token
    token = updatedAccessToken;

    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  }

  const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  if (!user) {
    return next(new ApiError(404, "No user found"));
  }

  req.user = user;
  next();
});


export { validateToken }