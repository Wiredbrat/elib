import { Router } from "express";
import { fetchDataFromAPI } from "../utils/fetchData.js";
import { validateToken } from '../middlewares/auth.middleware.js'
import { addBookToCollection, deleteBookFromCollection, updateBookStatus } from '../controllers/book.controller.js'

const bookRouter = Router()

bookRouter.route(`/search`).get(fetchDataFromAPI)

//routes for crud operations on books collection
bookRouter.route('/add-book').post(validateToken, addBookToCollection )
bookRouter.route('/delete-book').post(validateToken, deleteBookFromCollection )
bookRouter.route('/update-book-status').post(validateToken, updateBookStatus)

export {bookRouter}

