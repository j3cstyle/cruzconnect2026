import { env } from "../config/env.js";

export async function verifyTurnstileToken(token, remoteIp) {
  if (!env.turnstile.secretKey) throw new Error("TURNSTILE_SECRET_KEY is not configured.");

  const body = new URLSearchParams({
    secret: env.turnstile.secretKey,
    response: token
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body }
  );

  if (!response.ok) throw new Error(`Turnstile Siteverify HTTP ${response.status}`);
  return response.json();
}