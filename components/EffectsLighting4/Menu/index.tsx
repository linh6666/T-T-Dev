"use client";

import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

// ✅ Import các API
import { createNodeAttribute } from "../../../api/apiLighting2";      // API 1 cho Bắt đầu
import { createON } from "../../../api/apiON"; 
import { createOFF } from "../../../api/apiOFF"; 
import { createNodeAttributee } from "../../../api/apiLightinggame"; // API 2 cho Trái/Xoay/Phải/Xuống

interface MenuProps {
  project_id: string | null;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [loadingOn, setLoadingOn] = useState(false);

  // 🧭 Quay lại trang điều khiển
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Times-Square?id=${project_id}`);
  };

  // ✅ Call API 1: chỉ dành cho nút "Bắt đầu"
  const handleStart = async () => {
    if (!project_id) return;
    try {
      const body = { project_id };
      const response = await createNodeAttribute(body, {
        type_control: "eff",
        value: 1,
        id:9,
      });
      console.log("✅ API1: Bắt đầu (ID: 1)", response); } catch (error) { console.error("❌ Lỗi API1: Bắt đầu", error); }
  };

  // ✅ Call API 2: dành cho Trái/Xoay/Phải/Xuống
  const handleMove = async (ctrl: string, label: string) => {
    if (!project_id) return;
    try {
      const body = { project_id };
      const response = await createNodeAttributee(body, {
        type_control: "control",
        value: JSON.stringify({ ctrl }),
      });
      console.log(`✅ API2: ${label} (CTRL: ${ctrl})`, response);
    } catch (error) {
      console.error(`❌ Lỗi API2: ${label}`, error);
    }
  };

  // ✅ Nút ON
  const handleClickOn = async () => {
    if (!project_id) return;
    setActive("on");
    setLoadingOn(true);
    try {
      const res = await createON({ project_id });
      console.log("✅ API ON result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API ON:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  // ✅ Nút OFF
  const handleClickOFF = async () => {
    if (!project_id) return;
    setActive("off");
    setLoadingOn(true);
    try {
      const res = await createOFF({ project_id });
      console.log("✅ API OFF result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API OFF:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  // 🎨 Style nút ON/OFF
  const getButtonStyle = (isActive: boolean) => ({
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transition: "background 0.3s",
    background: isActive
      ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
      : "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  });

  return (
    <div className={styles.box}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image src="/Logo/TTHOMES logo-01.png" alt="Logo" className={styles.imgea} />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>HIỆU ỨNG</h1>
      </div>

      {/* Các nút chức năng */}
      <div className={styles.Function}>
        <div className={styles.crossLayout}>
          {/* Hàng trên: Bắt đầu */}
          <div className={styles.rowTop}>
            <div
              className={styles.squareBtn}
                 onClick={handleStart}
            >
              Bắt đầu
            </div>
          </div>

          {/* Hàng giữa: Trái - Xoay - Phải */}
          <div className={styles.rowMiddle}>
            <div
              className={styles.squareBtn}
              onClick={() => handleMove("L", "Trái")}
            >
              Trái
            </div>
            <div
              className={styles.centerBtn}
              onClick={() => handleMove("ROT", "Xoay")}
            >
              Xoay
            </div>
            <div
              className={styles.squareBtn}
              onClick={() => handleMove("R", "Phải")}
            >
              Phải
            </div>
          </div>

          {/* Hàng dưới: Xuống */}
          <div className={styles.rowBottom}>
            <div
              className={styles.squareBtn}
              onClick={() => handleMove("D", "Xuống")}
            >
              Xuống
            </div>
          </div>
        </div>
      </div>

      {/* Footer: ON/OFF + Back */}
      <div className={styles.footer}>
        <Stack align="center" gap="xs">
          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() => active !== "on" ? handleClickOn() : setActive(null)}
              disabled={loadingOn}
            >
              <Text style={{ fontSize: "13px" }}>ON</Text>
            </Button>

            <Button
              style={getButtonStyle(active === "off")}
              onClick={() => active !== "off" ? handleClickOFF() : setActive(null)}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

            <Button
              onClick={handleBack}
              variant="filled"
              style={{
                width: 30, height: 30, padding: 0, borderRadius: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#FFFAEE", color: "#752E0B", border: "1.5px solid #752E0B",
              }}
            >
              <IconArrowLeft size={18} color="#752E0B" />
            </Button>
          </Group>
        </Stack>
      </div>
    </div>
  );
}
