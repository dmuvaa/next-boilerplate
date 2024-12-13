import formData from "form-data"
import Mailgun from "mailgun.js"

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
})

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  const data = {
    from: "Your Name <noreply@yourdomain.com>",
    to,
    subject,
    text,
    html,
  }

  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN || "", data)
    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

