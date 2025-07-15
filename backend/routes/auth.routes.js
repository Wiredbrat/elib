import { Router } from "express";
import { sendOTP } from "../utils/otpValidation.js";

const authRouter = Router()

authRouter.route('/send-otp').post(sendOTP)

export { authRouter }