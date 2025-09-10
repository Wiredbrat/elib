import Router from 'express'
import { userLogin, userRegister, userLogout, changePassword, getUserCollection, deleteUserAccount, getUser } from '../controllers/user.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'
import { isValidUser, sendOTP } from '../utils/otpValidation.js'


const router = Router()

//route for user registration and login
router.route('/register').post(userRegister)
router.route('/login').post(userLogin)

//secured Routes
router.route('/logout').post(validateToken ,userLogout)
router.route('/change-password').post(validateToken, changePassword)
router.route('/get-user/books').get(validateToken, getUserCollection)
router.route('/delete-account').post(validateToken, deleteUserAccount)
router.route('/get-user').get(validateToken, getUser)
router.route('/reset/password').post(isValidUser, sendOTP)

export { router }