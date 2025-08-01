import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    subject: String,
});

const FormModel = mongoose.models.Form || mongoose.model("Form", FormSchema);

export async function POST(request: Request) {
    try {
        const { fullname, email, phone, subject } = await request.json();

        if (!fullname || !email || !phone || !subject) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        await dbConnect();
        await FormModel.create({ fullname, email, phone, subject });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Form submission error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
