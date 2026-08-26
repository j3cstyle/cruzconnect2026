import "dotenv/config";
export const env = {
  port: Number(process.env.PORT || 5000),
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:5500").split(",").map(v => v.trim()).filter(Boolean),
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY || "",
    secretKey: process.env.TURNSTILE_SECRET_KEY || ""
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || ""
  },
  contact: {
    to: process.env.CONTACT_TO_EMAIL || "",
    from: process.env.CONTACT_FROM_EMAIL || ""
  }
};
