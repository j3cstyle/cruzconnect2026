import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.resend.apiKey);

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function sendContactEmail(data) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const { data: result, error } = await resend.emails.send({
    from: env.contact.from,
    to: [env.contact.to],
    replyTo: data.email,
    subject: `CruzConnect enquiry: ${data.interest} — ${fullName}`,
    text: [
      `Name: ${fullName}`, `Email: ${data.email}`, `Phone: ${data.phone}`,
      `Interest: ${data.interest}`, "", "Message:", data.message
    ].join("\n"),
    html: `<h2>New CruzConnect Website Enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Interest:</strong> ${escapeHtml(data.interest)}</p>
      <h3>Message</h3><p>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>`
  });
  if (error) {
    console.error("Resend error:", error);
    throw new Error("Email delivery failed.");
  }
  return result;
}
