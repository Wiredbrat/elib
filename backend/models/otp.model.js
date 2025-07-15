import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date, 
    default: Date.now,
    expires: 300
  }
})

export const Otp = mongoose.model('Otp', otpSchema)