import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";


export async function getUserInfo(token: string) {
  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.LOGIN_USERNAME}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let detail = "Failed to fetch user info";

    try {
      const errorData = await res.json();
      detail = errorData?.detail || detail;
    } catch {
      // đôi khi server trả text hoặc body rỗng
      try {
        detail = await res.text();
      } catch {}
    }

    const err: any = new Error(detail);
    err.status = res.status;          // ✅ quan trọng
    throw err;
  }

  return res.json();
}



