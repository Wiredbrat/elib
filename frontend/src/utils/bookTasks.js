import axios from "axios"
import bookRoutes from "../routes/book.routes"
// import { toast, ToastContainer } from "react-toastify"
import userRoutes from "../routes/user.routes"

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
  // return(
  //   <ToastContainer>
  //   </ToastContainer>
  // )
}

const deleteBook = async (databaseId) => {
  try {
    const unlinkBook = await axios.get(userRoutes.deleteBook, { _id: databaseId }, {withCredentials: true})

    if(unlinkBook.status !== 200) {
      console.log(unlinkBook)
      // toast.error('Unable to Remove', {position: "bottom-right"})
      return
    }
    // toast.success('Book Removed', {position: 'bottom-right'})

  } catch (error) {
    // toast.error('Unable to Remove', {position: "bottom-right"})
    console.log('unable to remove book from userList', error)
  }

}

const updateBookStatus = async (databaseId, status) => {
  try {
    const updateStatus = await axios.get(userRoutes.updateBookStatus, { _id: databaseId, status: status }, {withCredentials: true})
    
    if(updateStatus.status !== 200) {
      toast.error('Status not Updated', {position: "bottom-right"})
      console.log(updateStatus)
      return
    } 
    toast.success('Book Removed', {position: 'bottom-right'})

  } catch (error) {
    console.log('unable to update status', error)
  }

}

export { addBook, deleteBook, updateBookStatus }