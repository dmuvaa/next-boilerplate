import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/mailgun"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  try {
    await sendEmail(
      process.env.CONTACT_EMAIL as string,
      "New Contact Form Submission",
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      `<h1>New Contact Form Submission</h1><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

