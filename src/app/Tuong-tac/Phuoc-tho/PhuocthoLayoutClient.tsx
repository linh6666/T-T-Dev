"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function MillenniaCityLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("id"); // ✅ Lấy từ URL

  useEffect(() => {
    if (projectId) {
      localStorage.setItem("project_id", projectId); // ✅ Lưu vào localStorage để auto-release dùng
    }

    const token = localStorage.getItem("access_token"); // đã lưu lúc login

    let timer: NodeJS.Timeout;

    const handleAutoRelease = async () => {
      try {
        if (projectId && token) {
          const apiUrl = `https://www.vietmodel.com.vn/api/v1/control/release_control/${projectId}`;
          await axios.post(apiUrl, {}, { headers: { Authorization: `Bearer ${token}` } });
          console.log("✅ Đã gọi API release_control");
        } else {
          console.warn("⚠️ Thiếu project_id hoặc token");
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
      } finally {
        router.push("/");
      }
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleAutoRelease, 10 * 60 * 1000); // 1 phút
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [projectId, router]);

  return <>{children}</>;
}
