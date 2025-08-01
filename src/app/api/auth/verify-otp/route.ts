import { dbConnect } from "@/lib/dbConnect";
import UserOtp from "@/lib/UserOtp";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: "Email and OTP are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await dbConnect();

    const record = await UserOtp.findOne({ email, otp: otp.toString() });
    if (!record) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await UserOtp.deleteMany({ email });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
