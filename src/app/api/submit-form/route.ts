import { dbConnect } from "@/lib/dbConnect";
import UserForm from "@/lib/UserForm";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject } = await request.json();

    if (!name || !email || !phone || !subject) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
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
      html: `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #eee;">
    <!-- Header -->
    <div style="background-color: #1e40af; color: white; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
      <h2 style="margin: 0;">Mabsol Infotech Pvt. Ltd.</h2>
      <p style="margin: 5px 0 0; font-size: 13px;">Secure & Smart Form Submission</p>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
      <h3 style="color: #1e40af; margin-top: 0;">New Form Submission</h3>

      <p><strong>Dear Admin,</strong></p>
      <p>You have received a new contact form submission. Here are the details:</p>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${subject}</p>
       <hr style="margin: 20px 0;" />
      <p>If you have any questions or need further details, please reach out to the user directly
      <br />
       <strong>Submitted on:</strong> ${new Date().toLocaleString("en-IN", {
         timeZone: "Asia/Kolkata",
       })}
      </p>

      <br />
      <p style="font-family: cursive; font-size: 16px;">Best regards,</p>
      <p><strong>Team Mabsol</strong></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 13px; color: #777;">
      Visit us: <a href="https://mabsolinfotech.com" style="color: #1e40af; text-decoration: none;">mabsolinfotech.com</a><br />
      &copy; ${new Date().getFullYear()} Mabsol Infotech. All rights reserved.
    </div>
  </div>
`,
    });

    // console.log("Email sent:***************************************", info.messageId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
