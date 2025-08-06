
import { dbConnect } from "@/lib/dbConnect";
import UserOtp from "@/lib/UserOtp";

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return Response.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  await dbConnect();

  const record = await UserOtp.findOne({ email, otp });

  if (!record) {
    return Response.json({ verified: false, message: "Invalid OTP" }, { status: 400 });
  }

  await UserOtp.deleteMany({ email });
  return Response.json({ verified: true });
}

