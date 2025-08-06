import { dbConnect } from "@/lib/dbConnect";
import UserForm from "@/lib/UserForm";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject } = await request.json();

    if (!name || !email || !phone || !subject) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    await dbConnect();
    await UserForm.create({ name, email, phone, message: subject });

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const info = await transporter.sendMail({
      from: `"Mabsol Infotech" <${process.env.EMAIL_USER}>`,
      to: "mabsolinfotech@gmail.com",
      subject: `📝 New Form Submission from ${name}`,
      text: `
📥 New Form Submitted:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${subject}
      `,
    });

    console.log("✅ Email sent:***************************************", info.messageId); // 👈 Check if this logs

    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Email Error:", error); // 👈 This will tell us the real issue
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

