"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./PersonalInformation.module.css";
import {
  IconUser,
  IconCalendar,
  IconLogout,
  IconBuildingWarehouse,
  IconList,
  IconExchange,
  IconStackBack,
} from "@tabler/icons-react";

import { getCurrentUser } from "../../../api/apiProfile";
import { getListProject } from "../../../api/apigetlistProject";
import { releaseControl } from "../../../api/DeleteControl";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * =========================
   * CHECK ĐĂNG NHẬP
   * =========================
   * - Token hợp lệ → cho vào
   * - Token lỗi → đá về "/"
   */
  useEffect(() => {
    getCurrentUser().catch(() => {
      router.replace("/");
    });
  }, [router]);

  /**
   * =========================
   * LOGOUT
   * =========================
   * 1. Gọi API releaseControl (nếu có)
   * 2. Sau đó mới logout + redirect
   */
  const handleLogout = async () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirmed) return;

    const token = localStorage.getItem("access_token");

    try {
      if (token) {
        const projectData = await getListProject({ token });
        const projectId = projectData?.data?.[0]?.id;

        if (projectId) {
          await releaseControl(projectId); // ✅ GỌI TRƯỚC KHI LOGOUT
        }
      }
    } catch (error) {
      console.error("Release control error:", error);
      // ❗ Tuỳ nghiệp vụ: có thể vẫn cho logout tiếp
    }

    // =========================
    // LOGOUT SAU KHI GỌI API
    // =========================
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Reload toàn bộ app để xoá sạch state
    window.location.href = "/";
  };

  /**
   * =========================
   * MENU SIDEBAR
   * =========================
   */
  const menu = [
    {
      label: "Tài khoản của bạn",
      path: "/Tai-khoan/thong-tin-cua-ban",
      icon: <IconUser size={18} />,
    },
    {
      label: "Dự án của bạn",
      path: "/Tai-khoan/du-an-cua-ban",
      icon: <IconCalendar size={18} />,
    },
    {
      label: "Tổng quan bán hàng",
      path: "/Tai-khoan/tong-quan-ban-hang",
      icon: <IconBuildingWarehouse size={18} />,
    },
    {
      label: "Danh sách khách hàng",
      path: "/Tai-khoan/danh-sach-khach-hang",
      icon: <IconList size={18} />,
    },
    {
      label: "Danh sách đơn hàng",
      path: "/Tai-khoan/danh-sach-don-hang",
      icon: <IconStackBack size={18} />,
    },
    {
      label: "Đổi mật khẩu",
      path: "/Tai-khoan/doi-mat-khau",
      icon: <IconExchange size={18} />,
    },
  ];

  return (
    <div className={styles.Box}>
      {/* ================= SIDEBAR ================= */}
      <aside className={styles.sidebar}>
        <ul>
          {menu.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => router.push(item.path)}
                className={`${styles.menuItem} ${
                  pathname === item.path ? styles.active : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className={`${styles.menuItem} ${styles.logoutBtn}`}
            >
              <IconLogout size={18} />
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
