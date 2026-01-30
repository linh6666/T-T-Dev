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
import { getListProject } from "../../../api/apigetlistProjectControl";
import { releaseControl } from "../../../api/DeleteControl";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Check đăng nhập
   * - Token hợp lệ → cho vào
   * - Token lỗi → đá về trang "/"
   */
  useEffect(() => {
    getCurrentUser().catch(() => {
      router.replace("/");
    });
  }, [router]);

  /**
   * Logout
   * - Cố gắng release control (nếu có)
   * - Dù lỗi API vẫn logout bình thường
   */
  const handleLogout = async () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token") || "";

      if (token) {
        const projectData = await getListProject({ token });
        const projectId = projectData?.data?.[0]?.id;

        if (projectId) {
          await releaseControl(projectId);
        }
      }
    } catch (error) {
      console.error("Logout API error (ignored):", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.replace("/");
    }
  };

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

      <main className={styles.content}>{children}</main>
    </div>
  );
}
