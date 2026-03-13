"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Group, Image, Popover, Tooltip } from "@mantine/core";
import { jwtDecode } from "jwt-decode";
import { IconHeart, IconPhoneCall } from "@tabler/icons-react";
import LoginButton from "./ButtonLogin/index";
import Notification from "./Notification/index";
import FavoriteHoverContent from "./favourite";
import styles from "./Header.module.css";

const baseLinks = [
  { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "MÔ HÌNH TƯƠNG TÁC", href: "/Tuong-tac", highlight: true },
  { label: "THÔNG TIN SẢN PHẨM", href: "/Thong-tin-san-pham" },
  { label: "QUẢN LÝ BÁN HÀNG", href: "/quan-ly-ban-hang" },
  { label: "QUẢN TRỊ DỰ ÁN", href: "/quan-tri-du-an" },
  { label: "QUẢN TRỊ HỆ THỐNG", href: "/quan-ly-he-thong" },
];

interface DecodedToken {
  is_superuser?: boolean;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export default function Header() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [opened, setOpened] = useState(false);

  // ⭐ system_name (có thể lấy từ API)
  const [systemName] = useState<string | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");

    if (!token) {
      setIsLoggedIn(false);
      setIsSuperUser(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      setIsLoggedIn(true);
      setIsSuperUser(decoded?.is_superuser === true);
    } catch (err) {
      console.error("❌ Token không hợp lệ:", err);
      setIsLoggedIn(false);
      setIsSuperUser(false);
    }
  }, []);

  // ⭐ Lọc menu
  const visibleLinks = baseLinks.filter((link) => {
    // Nếu system_name = null
    if (systemName === null) {
      return [
        "GIỚI THIỆU",
        "MÔ HÌNH TƯƠNG TÁC",
        "THÔNG TIN SẢN PHẨM",
      ].includes(link.label);
    }

    // Chưa đăng nhập
    if (!isLoggedIn) {
      return [
        "GIỚI THIỆU",
        "MÔ HÌNH TƯƠNG TÁC",
      ].includes(link.label);
    }

    // Admin
    if (isSuperUser) {
      return true;
    }

    // User thường
    return [
      "GIỚI THIỆU",
      "MÔ HÌNH TƯƠNG TÁC",
      "QUẢN LÝ BÁN HÀNG",
      "THÔNG TIN SẢN PHẨM",
    ].includes(link.label);
  });

  const isActive = (href: string, highlight?: boolean) => {
    const current = pathname.toLowerCase();
    const link = href.toLowerCase();

    if (current === "/" && link === "/tuong-tac") {
      return styles.navActive;
    }

    if (current === link || current.startsWith(link + "/")) {
      return styles.navActive;
    }

    if (highlight) {
      return styles.navHighlight;
    }

    return styles.navNormal;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* LOGO */}
        <div className={styles.mobileHeader}>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/Logo/TTHOMES logo-01.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* MENU */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {visibleLinks.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link href={href}>
                  <span
                    className={`${styles.navLink} ${isActive(
                      href,
                      highlight
                    )}`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ICON RIGHT */}
        <div
          className={`hidden md:flex ${styles.loginLangBlock}`}
          style={{ display: "flex", gap: "20px" }}
        >
          {/* LIÊN HỆ */}
          <Link href="/lien-he">
            <Tooltip
              label="Liên Hệ"
              position="bottom"
              styles={{
                tooltip: {
                  backgroundColor: "#f1eeeeff",
                  color: "#000",
                },
              }}
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
                  cursor: "pointer",
                }}
              >
                <IconPhoneCall size={17} color="#752E0B" stroke={1.5} />
              </div>
            </Tooltip>
          </Link>

          {/* YÊU THÍCH */}
          <Group justify="center">
            <Popover
              width={320}
              position="bottom"
              withArrow
              shadow="md"
              opened={opened}
              onChange={setOpened}
            >
              <Tooltip
                label="Yêu Thích"
                position="bottom"
                styles={{
                  tooltip: {
                    backgroundColor: "#f1eeeeff",
                    color: "#000",
                  },
                }}
              >
                <Popover.Target>
                  <div
                    onClick={() => setOpened((o) => !o)}
                    style={{
                      border: "1px solid #752E0B",
                      borderRadius: "50%",
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <IconHeart size={17} color="#752E0B" stroke={1.5} />
                  </div>
                </Popover.Target>
              </Tooltip>

              <Popover.Dropdown>
                <FavoriteHoverContent />
              </Popover.Dropdown>
            </Popover>
          </Group>

          {/* THÔNG BÁO */}
          <Notification />

          {/* LOGIN */}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}