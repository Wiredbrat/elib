import { asyncHandler } from "./asyncHandler.js";
import axios from 'axios';
import ApiError from "./errorHandler.js";
import ApiResponse from "./responseHandler.js";

const fetchDataFromAPI = asyncHandler(async(req, res, next) => {
    const { title } = req.query
    if(!title) {
      throw new ApiError(401, 'enter book name')
    }
    const data = await axios.get(`https://openlibrary.org/search.json?title=${title}`)
    const newData = data.data
    console.log(newData)
    // req.bookData = newData.docs
    // next()

    // this is response for checking 
    return res
    .status(200)
    .json(new ApiResponse(200, newData.docs, 'data fetched successfully'))
})

export { fetchDataFromAPI }