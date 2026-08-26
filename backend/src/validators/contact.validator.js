import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().regex(/^[0-9 ]{8,20}$/),
  interest: z.enum(["hiring", "joining", "other"]),
  message: z.string().trim().min(10).max(5000),
  consent: z.coerce.boolean().refine(v => v === true, "Consent is required"),
  website_url: z.string().optional().default(""),
  "cf-turnstile-response": z.string().min(1, "Security verification is required")
});