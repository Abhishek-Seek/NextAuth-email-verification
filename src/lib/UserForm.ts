// import mongoose from "mongoose";

// const OtpSchema = new mongoose.Schema({
//   email: String,
//   otp: String,
//   createdAt: { type: Date, default: Date.now, expires: 300 },
// });

// export default mongoose.models.UserOtp || mongoose.model("UserOtp", OtpSchema);
import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

export default mongoose.models.UserForm || mongoose.model("UserForm", userFormSchema);
