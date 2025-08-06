import { dbConnect } from "@/lib/dbConnect";
import UserOtp from "@/lib/UserOtp";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  await dbConnect();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await UserOtp.create({ email, otp });

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"Mabsol Infotech" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    text: `Your OTP is: ${otp}`,
  });

  return Response.json({ success: true });
}
