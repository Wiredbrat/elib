import { asyncHandler } from "./asyncHandler.js";
import ApiError from "./errorHandler.js";
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer'
import { Otp } from '../models/otp.model.js'
import ApiResponse from "./responseHandler.js";

const sendOTP = asyncHandler(async(req, res) => {
  const { email } = req.body

  if(!email) {
    throw ApiError(400, 'enter a valid email')
  }

  //otp-generator for generating otp
  const generateOTP = otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  console.log(generateOTP)

  const otp = generateOTP

  await Otp.create(
    {
      email,
      otp
    }
  )

  //nodemailer setup for sending email
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // secure: true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.APP_PASSWORD,
    }
  })

  transporter.verify((err, success) => {
    if(err) {
      throw new ApiError(500, `SMTP Config Error: , ${err}`)
    }
    else{
      return new ApiResponse(200, success, 'SMTP is Ready to send message') 
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'OTP from elib',
    text: `your OTP for elib account is ${otp}, this otp will expire in 5 minutes. \n This is computer generated email don't reply.`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      throw new ApiError(500, 'error while sending message', err)
    }

    return res
    .status(200)
    .json(new ApiResponse(200, info, 'OTP sent sucessfully'))
  })

})

const verifyOTP = asyncHandler(async(req, res) => {
  const { otp, email } = req.body

  const otpMatch = await Otp.findOne({ email, otp })
  // console.log(otpMatch)
  if(!otpMatch) {
    throw new ApiError(400, 'Invalid OTP')
  }

  await Otp.deleteMany({ email })
  return res
  .status(200)
  .json(new ApiResponse(200, '', 'Email Verified'))
})

export { sendOTP, verifyOTP}

