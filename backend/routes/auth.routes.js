import { Router } from "express";
import { sendOTP, verifyOTP } from "../utils/otpValidation.js";

const authRouter = Router()

authRouter.route('/send-otp').post(sendOTP)
authRouter.route('/verify-otp').post(verifyOTP)

export { authRouter }