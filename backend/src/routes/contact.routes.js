import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitContact } from "../controllers/contact.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { contactSchema } from "../validators/contact.validator.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 5,
  standardHeaders: "draft-8", legacyHeaders: false,
  message: {success:false,message:"Too many contact form submissions. Please try again in 15 minutes."}
});

router.post("/", contactLimiter, validate(contactSchema), submitContact);
export default router;
