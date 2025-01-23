import nodemailer from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const organization = formData.get("organization") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.RECIPIENT,
    subject: `Consultation Request from ${name}`,
    text: `Name: ${name}\nOrganization: ${organization}\nPhone: ${phone}\nEmail: ${email}\n\n ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
