"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apiLighting";
import { createON  } from "../../../api/apiON"; 
import { createOFF  } from "../../../api/apiOFF"; // ✅ Gọi đúng file API

// 🧩 Kiểu prop nhận vào
interface MenuProps {
  project_id: string | null;
}

// 🧩 Kiểu dữ liệu item trong menu
interface MenuItem {
  id: number;
  label: string;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
   const [active, setActive] = useState<"on" | "off" | null>(null);
    const [loadingOn, setLoadingOn] = useState(false);

  // 🧩 Khởi tạo danh sách menu (cứng 5 nút)
  useEffect(() => {
    setMenuItems([
      { id: 1, label: "Dòng chảy" },
      { id: 2, label: "Sóng quận" },
      { id: 3, label: "T&T GROUP" },
      { id: 4, label: "Mưa rơi" },
      { id: 5, label: "Ngẫu nhiên" },
    ]);
  }, []);

  // 🧭 Quay lại trang điều khiển
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Times-Square?id=${project_id}`);
  };

  // 🧠 Khi nhấp nút — gọi API
  const handleClick = async (id: number, label: string) => {
    if (!project_id) {
      console.warn("⚠️ Không có project_id để gọi API.");
      return;
    }

    try {
      const body = { project_id };
      const response = await createNodeAttribute(body, {
        type_control: "eff",
        value: 1,
        rs: 0,
        id: id,
      });

      console.log(`✅ Đã gửi hiệu ứng ${label} (ID: ${id})`, response);
    } catch (error) {
      console.error(`❌ Lỗi khi gọi hiệu ứng ${label}:`, error);
    }
  };

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
     const handleClickOFF = async () => {
      if (!project_id) return;
      setActive("off");
      setLoadingOn(true);
      try {
        const res = await createOFF({ project_id });
        console.log("✅ API ON result:", res);
      } catch (err) {
        console.error("❌ Lỗi khi gọi API ON:", err);
      } finally {
        setLoadingOn(false);
      }
    };
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
        <Image
          src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>HIỆU ỨNG</h1>
      </div>

      {/* Các nút chức năng */}
      <div className={styles.Function}>
        {menuItems.length > 0 ? (
          <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                id={`menu-btn-${item.id}`}
                className={styles.menuBtn}
                variant="outline"
                onClick={() => handleClick(item.id, item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Text mt="md" c="dimmed">
            Không có dữ liệu hiển thị
          </Text>
        )}
      </div>

      {/* Nút quay lại */}
      <div className={styles.footer}>
       < Stack align="center" gap="xs">
                
                  <Group gap="xs">
                    {/* ✅ Nút ON có gọi API */}
                  <Button
          style={getButtonStyle(active === "on")}
          onClick={() => {
            if (active !== "on") {
              setActive("on");
              handleClickOn();
            } else {
              setActive(null); // nếu muốn tắt trạng thái ON
            }
          }}
          disabled={loadingOn}
        >
          <Text style={{ fontSize: "13px" }}>ON</Text>
        </Button>
        
                    {/* Nút OFF */}
                  <Button
          style={getButtonStyle(active === "off")}
          onClick={() => {
            if (active !== "off") {
              setActive("off");
              handleClickOFF();
            } else {
              setActive(null); // nếu muốn tắt trạng thái OFF
            }
          }}
        >
          <Text style={{ fontSize: "12px" }}>OFF</Text>
        </Button>
        
                    {/* Nút quay lại */}
                    <Button
                      onClick={handleBack}
                      variant="filled"
                      style={{
                        width: 30,
                        height: 30,
                        padding: 0,
                        borderRadius: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        transition: "background 0.3s",
                        background: "#FFFAEE",
                        color: "#752E0B",
                        border: "1.5px solid #752E0B",
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
