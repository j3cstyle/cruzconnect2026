import { verifyTurnstileToken } from "../services/turnstile.service.js";
import { sendContactEmail } from "../services/email.service.js";

export async function submitContact(req, res, next) {
  try {
    const {firstName,lastName,email,phone,interest,message,website_url,"cf-turnstile-response":token} = req.body;

    if (website_url) {
      return res.status(200).json({success:true,message:"Your message has been received."});
    }

    const verification = await verifyTurnstileToken(token, req.ip);

    if (!verification.success || (verification.action && verification.action !== "contact")) {
      return res.status(403).json({success:false,message:"Security verification failed. Please try again."});
    }

    await sendContactEmail({firstName,lastName,email,phone,interest,message});
    res.status(200).json({success:true,message:"Your message has been sent successfully."});
  } catch (error) {
    next(error);
  }
}