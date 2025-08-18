import { useState, useContext } from "react"
import { BookContext } from "../context/BookContext"
import axios from "axios"


const handleCardClick = async (bookId, workKey, imageUrl, setBookData) => {

  try {
    console.log(bookId)
    // setLoading(true)
    const bookDetails = await axios.get(`https://openlibrary.org/books/${bookId}${`.json`}`)
    const rating = await axios.get(`https://openlibrary.org${workKey}/ratings.json`)
    console.log(bookDetails)
    if(!bookDetails.status === 200) {
      // setError(true)
    }
    // setLoading(false)
    const bookFetched = {
      data: bookDetails['data'],
      coverUrl: imageUrl,
      rating: rating.data,
    }
    console.log(bookFetched)
    const authorKey = bookFetched?.data?.authors[0]['key'] || bookFetched?.data?.contributions[0]
    const authorDetails = await axios.get(`https://openlibrary.org${authorKey}${`.json`}`)
    bookFetched.author = authorDetails?.data.name || null
    console.log(bookFetched)

    setBookData(bookFetched)
  } catch (error) {
    // setError(true)
    console.log('Error while fetching data', error)
  }

}

  export {handleCardClick}