import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  email: String,
  otp: Number,
  createdAt: {
    type: Date, 
    default: Date.now,
    expires: 300
  }
})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Otp = mongoose.model('Otp', otpSchema)