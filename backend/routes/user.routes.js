import Router from 'express'
import { userLogin, userRegister, userLogout, changePassword, getUserCollection, deleteUserAccount } from '../controllers/user.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'


const router = Router()

//route for user registration and login
router.route('/register').post(userRegister)
router.route('/login').post(userLogin)

//secured Routes
router.route('/logout').post(validateToken ,userLogout)
router.route('/change-password').post(validateToken, changePassword)
router.route('/get-user/books').get(validateToken, getUserCollection)
router.route('/delete-account').post(validateToken, deleteUserAccount)

export { router }