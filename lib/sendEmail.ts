import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

type EmailOptions = {
  from?: string;
  to: string;
  cc?: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmail(options: EmailOptions) {
  const defaultFrom = "WebEquate <webequate@gmail.com>";

  return transport.sendMail({
    from: options.from || defaultFrom,
    to: options.to,
    cc: options.cc,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
