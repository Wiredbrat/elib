import { asyncHandler } from "./asyncHandler.js";
import axios from 'axios';
import ApiError from "./errorHandler.js";
import ApiResponse from "./responseHandler.js";

const fetchDataFromAPI = asyncHandler(async(req, res, next) => {
  try {
    const { title } = req.params 
    if(!title) {
      throw new ApiError(401, 'enter book name')
    }
    const data = await axios.get(`https://openlibrary.org/search.json?title=${title}`)
    return res
    .status(200)
    .json(new ApiResponse(200, data, 'data fetched successfully'))
  
  } catch (error) {
    return error
    // throw new ApiError(400, 'data not fetched successfully', error.message)
  }
})

export { fetchDataFromAPI }