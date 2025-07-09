import Router from 'express'
import { userLogin, userRegister, userLogout } from '../controllers/user.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register').post(userRegister)

router.route('/login').post(userLogin)
router.route('/logout').post(validateToken ,userLogout)

export { router }