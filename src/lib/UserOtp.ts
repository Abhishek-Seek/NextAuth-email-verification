import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export default mongoose.models.UserOtp || mongoose.model("UserOtp", OtpSchema);
