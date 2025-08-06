import mongoose from "mongoose";

const userOtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 mins expiry
});

export default mongoose.models.UserOtp || mongoose.model("UserOtp", userOtpSchema);
