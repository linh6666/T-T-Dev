import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export async function sendVerificationEmail(email: string) {
  const url = `${BASE_API_FASTAPI}${API_ROUTE.SENDEMAIL_AUTHENTICATION}?email=${encodeURIComponent(email)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.detail || "Failed to resend verification email"
    );
  }

  return res.json();
}
