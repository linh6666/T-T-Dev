"use client";

import { useState, useEffect } from "react";
import { IconUser } from "@tabler/icons-react";
import { Text } from "@mantine/core";
import Link from "next/link";
import useAuth from "../../../hook/useAuth";
import ProfileModal from "./Profile";
import ButtonsCollection from "../../../common/ButtonsCollection";

export default function LoginButton() {
  const { user, isLoggedIn, error } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Fix: tránh lỗi hydration + kiểm tra localStorage token
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isLoggedIn && user ? (
        <Link
          href="/Tai-khoan"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ButtonsCollection background hover>
            <Text w={"100%"} fw={"700"} c={"white"} truncate="end">
              {user.full_name || "Tài khoản"}
            </Text>
          </ButtonsCollection>
        </Link>
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
        </Link>
      )}

      {/* 🔹 Modal hiển thị thông tin tài khoản */}
      <ProfileModal
        opened={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* 🔹 Hiển thị lỗi nếu có */}
      {error && (
        <div style={{ color: "red", fontSize: 12, marginTop: 8 }}>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
