// app/api/send-email/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/interfaces/ContactForm";

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

    // Lazy load email dependencies to avoid build-time issues with mjml
    const [sendMail, Contact] = await Promise.all([
      import("@/emails").then((mod) => mod.default),
      import("@/emails/Contact").then((mod) => mod.default),
    ]);

    await sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC,
      subject: formData.subject,
      component: (
        <Contact
          name={formData.name}
          email={formData.email}
          subject={formData.subject}
          message={formData.message}
        />
      ),
      text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
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
