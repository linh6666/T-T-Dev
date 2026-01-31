"use client";

import { useState, useEffect } from "react";
import { IconUser } from "@tabler/icons-react";
import { Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import useAuth from "../../../hook/useAuth";
import ProfileModal from "./Profile";
import ButtonsCollection from "../../../common/ButtonsCollection";

export default function LoginButton() {
  const { user, isLoggedIn, error } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ✅ Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) return null;

  return (
    <>
      {isLoggedIn && user ? (
        <Tooltip
          label="Tài Khoản"
          position="bottom"
          styles={{
            tooltip: {
              backgroundColor: "#f1eeeeff",
              color: "#000",
            },
          }}
        >
          <Link
            href="/Tai-khoan/thong-tin-cua-ban"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ButtonsCollection background hover>
              <Text w="100%" fw={700} c="white" truncate="end">
                {user.full_name || "Tài khoản"}
              </Text>
            </ButtonsCollection>
          </Link>
        </Tooltip>
      ) : (
        <Link
          href="/dang-nhap"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip
            label="Đăng Nhập"
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
              }}
            >
              <IconUser size={17} color="#752E0B" stroke={1.5} />
            </div>
          </Tooltip>
        </Link>
      )}

      {/* 🔹 Modal cảnh báo tài khoản chưa active */}
      <ProfileModal
        opened={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        email={user?.email || ""}
      />

      {/* 🔹 Hiển thị lỗi */}
      {error && (
        <div style={{ color: "red", fontSize: 12, marginTop: 8 }}>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
