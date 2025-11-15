"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "@mantine/core";
import { jwtDecode } from "jwt-decode";
import { IconPhoneCall, IconShoppingCart } from "@tabler/icons-react";
import LoginButton from "./ButtonLogin/index";
import styles from "./Header.module.css";

// 🧭 Danh sách menu gốc
const baseLinks = [
  // { label: "TRANG CHỦ", href: "/", highlight: true },
   { label: "GIỚI THIỆU", href: "/gioi-thieu" },
    { label: "MÔ HÌNH TƯƠNG TÁC", href: "/Tuong-tac",highlight: true },
 

  // { label: "QUẢN LÝ BÁN HÀNG", href: "/quan-ly-ban-hang" },
  { label: "QUẢN TRỊ DỰ ÁN", href: "/quan-tri-du-an" },
  { label: "QUẢN TRỊ HỆ THỐNG", href: "/quan-ly-he-thong" },
];

// 🧩 Interface cho token
interface DecodedToken {
  is_superuser?: boolean;
  exp?: number;
  iat?: number;
  [key: string]: unknown; // Cho phép thêm field khác nếu token có
}

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    // ✅ thử đọc cả hai tên token
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");

    if (!token) {
      setIsLoggedIn(false);
      setIsSuperUser(false);
      return;
    }

    try {
      // ✅ Giải mã token có kiểu rõ ràng
      const decoded = jwtDecode<DecodedToken>(token);
      // console.log("🔍 Giải mã token:", decoded);

      setIsLoggedIn(true);
      setIsSuperUser(decoded?.is_superuser === true);
    } catch (err) {
      console.error("❌ Token không hợp lệ:", err);
      setIsLoggedIn(false);
      setIsSuperUser(false);
    }
  }, []);

  // 🔎 Hiển thị menu theo trạng thái đăng nhập
  const visibleLinks = baseLinks.filter((link) => {
    if (!isLoggedIn) {
      // ❌ Chưa đăng nhập → chỉ hiển thị 4 mục public
      return [
        "TRANG CHỦ",
        "GIỚI THIỆU",
        "MÔ HÌNH TƯƠNG TÁC",
        "QUẢN LÝ BÁN HÀNG",
      ].includes(link.label);
    } else if (isSuperUser) {
      // ✅ Admin → hiển thị tất cả
      return true;
    } else {
      // 👤 User thường → chỉ 4 trang public
      return [
        "TRANG CHỦ",
        "GIỚI THIỆU",
        "MÔ HÌNH TƯƠNG TÁC",
        "QUẢN LÝ BÁN HÀNG",
      ].includes(link.label);
    }
  });
const isActive = (href: string, highlight?: boolean) => {
  const current = pathname.toLowerCase();
  const link = href.toLowerCase();

  // ✅ Nếu đang ở "/" thì coi như là /tuong-tac
  if (current === "/" && link === "/tuong-tac") {
    return styles.navActive;
  }

  // ✅ Nếu pathname bắt đầu bằng đường dẫn cha (kể cả trang con)
  if (current === link || current.startsWith(link + "/")) {
    return styles.navActive;
  }

  // ✅ Nếu có gắn highlight mặc định
  if (highlight) {
    return styles.navHighlight;
  }

  return styles.navNormal;
};


  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.mobileHeader}>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/Logo/TTHOMES logo-01.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* 🧭 MENU */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {visibleLinks.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link href={href}>
                  <span
                    className={`${styles.navLink} ${isActive(href, highlight)}`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 ICON + LOGIN */}
        <div
          className={`hidden md:flex ${styles.loginLangBlock}`}
          style={{ display: "flex", gap: "20px" }}
        >
          <div
            style={{
              border: "1px solid #752E0B",
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconPhoneCall size={17} color="#752E0B" stroke={1.5} />
          </div>
          <div
            style={{
              border: "1px solid #752E0B",
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconShoppingCart size={17} color="#752E0B" stroke={1.5} />
          </div>
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
