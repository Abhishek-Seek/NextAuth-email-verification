"use client";
import { Form, Input, Button, Card, message } from "antd";
import { useState } from "react";

export default function SignIn() {
    const [form] = Form.useForm();
    const [emailVerified, setEmailVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSendOtp = async () => {
        const email = form.getFieldValue("email");
        if (!email) return message.error("Please enter your email");

        const res = await fetch("/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            message.success("OTP sent to your email");
            setOtpSent(true);
        } else {
            message.error("Failed to send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        const email = form.getFieldValue("email");
        if (!email || !otp) return message.error("Enter email and OTP");

        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        if (res.ok) {
            message.success("OTP Verified!");
            setEmailVerified(true);
        } else {
            message.error("Invalid OTP");
        }
    };

    const handleFormSubmit = async (values: any) => {
        if (!emailVerified) return message.warning("Please verify your email first");

        const res = await fetch("/api/submit-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (res.ok) {
            message.success("Form submitted successfully!");
            form.resetFields();
            // setOtp("");
            setEmailVerified(false);
            setOtpSent(false);
        } else {
            message.error("Form submission failed");
        }
    };

    return (
        <div className="h-[100vh] w-[100vw] p-4">
            <div className="text-center">
                <h1 className="text-4xl py-4 font-bold font-sans">Get Demo Login Details</h1>
                <p className="text-gray-800 font-sans">
                    Please fill out the form below to receive demo login details for Human Resource Mabsol Infotech portals.
                </p>
                <Button className="!bg-green-600 !text-white !py-5 !mt-10 !mb-6">
                    Get Pricing Details
                </Button>
            </div>

            <div className="min-h-[600px] max-w-[800px] mx-auto rounded-lg">
                <Card className="shadow-2xl">
                    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[{ required: true, message: "Please enter full name" }]}
                        >
                            <Input size="large" placeholder="Enter your full name" />
                        </Form.Item>

                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter email" },
                                { type: "email", message: "Enter valid email" },
                            ]}
                            style={{ marginBottom: 8,paddingBottom:10 }}
                        >
                            <Input size="large" placeholder="Enter your email" disabled={emailVerified} />
                        </Form.Item>

                        {/* Move OTP logic outside Form.Item */}
                        <div className="">
                            {!otpSent && (
                                <Button
                                    className="!bg-orange-400 !text-gray-600 "
                                    onClick={handleSendOtp}
                                >
                                    Send OTP
                                </Button>
                            )}

                            {otpSent && !emailVerified && (
                                <div className="mt-4">
                                    <Input
                                        size="large"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button
                                        className="!bg-green-600 !mt-2 !text-white"
                                        onClick={handleVerifyOtp}
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            )}

                            {emailVerified && (
                                <p className="text-green-600 mt-2 font-sans">✅ Email Verified</p>
                            )}
                        </div>


                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: "Please enter phone number" }]}
                            style={{paddingTop:12}}
                        >
                            <Input size="large" placeholder="Enter your phone number" />
                        </Form.Item>

                        <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[{ required: true, message: "Please enter subject" }]}
                        >
                            <Input size="large" placeholder="Enter subject" />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
