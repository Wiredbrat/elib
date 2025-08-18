import axios from "axios"
import bookRoutes from "../routes/book.routes"
import { toast, ToastContainer } from "react-toastify"
import { useContext } from "react"
import { BookContext } from "../context/BookContext"

const addBook = async (bookData) => {
  try {
    console.log(bookData)
    const newBook = await axios.post(bookRoutes.addBook, { bookDetails: bookData }, {withCredentials: true})
    if(newBook.status === 200) {
      console.log(newBook)
      toast.success('Book Added', {position: "bottom-right"})
      return
    }
    console.log('error while saving book', newBook)
  } catch (error) {
    console.log(error)
  }
  return(
    <ToastContainer>
    </ToastContainer>
  )
}

export { addBook, }