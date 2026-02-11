// app/api/send-email/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/interfaces/ContactForm";
import { sendEmail } from "@/lib/sendEmail";
import {
  generateContactEmailHTML,
  generateContactEmailText,
} from "@/lib/contactEmailTemplate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData: ContactForm = await request.json();

    // Honeypot check - reject if the hidden field is filled
    if (formData.website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    const emailText = generateContactEmailText({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    const emailHTML = generateContactEmailHTML({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    await sendEmail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || "",
      cc: process.env.EMAIL_CC,
      subject: formData.subject,
      text: emailText,
      html: emailHTML,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email." },
      { status: 500 }
    );
  }
}
