import Router from 'express'
import { userLogin, userRegister, userLogout, changePassword } from '../controllers/user.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'
import { addBookToCollection } from '../controllers/book.controller.js'

const router = Router()

router.route('/register').post(userRegister)

//secured Routes
router.route('/login').post(userLogin)
router.route('/logout').post(validateToken ,userLogout)
router.route('/change-password').post(validateToken, changePassword)

//routes for crud operations on books collection
router.route('/add-book').post(validateToken, addBookToCollection )
export { router }