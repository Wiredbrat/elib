import { asyncHandler } from "./asyncHandler.js";
import axios from 'axios';
import ApiError from "./errorHandler.js";
import ApiResponse from "./responseHandler.js";

const fetchDataFromAPI = asyncHandler(async(req, res, next) => {
    const { title, limit } = req.query
    console.log(title)
    if(!title || !limit) {
      throw new ApiError(401, 'enter book name')
    }

    const data = await axios.get(`https://openlibrary.org/search.json?title=${title}&limit=${limit}`)
    console.log(data.data)
    if(!data.data.docs.length) {
      return new ApiError(404, 'no book found')
    }

    const booksData = data.data.docs?.map((book) => {
      const coverId = book?.cover_edition_key || book.lending_edition_s
      const authorId = book?.author_key 

      return {
        title: book.title,
        coverId: coverId || null,
        authorId: authorId || null,
        author_name: book.author_name?.[0] || null,
        first_publish_year: book.first_publish_year || null,
        subjects: book.subject || [],
        workKey: book.key,
        coverUrl: coverId
          ? `https://covers.openlibrary.org/b/olid/${coverId}-L.jpg?default=false`
          : null,
        authorUrl: authorId
        ? `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg?default=false`
        : null
      }
    })

    return res
    .status(200)
    .json(new ApiResponse(200, booksData, 'data fetched successfully'))

})

export { fetchDataFromAPI }