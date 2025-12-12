"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { NotificationExtension } from "../../../extension/NotificationExtension";

interface MenuProps {
  project_id: string | null;
  onModelsLoaded?: (models: string[]) => void;
}

interface MenuItem {
  label: string;
}

interface NodeAttributeItem {
  building_code?: string;
  phase_vi?: string;
  layer5?: string; // thêm để tránh cảnh báo TS
  [key: string]: unknown;
}

interface ApiResponse {
  message?: string;
  data?: NodeAttributeItem[];
  [key: string]: unknown;
}

export default function Menu({ project_id, onModelsLoaded }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id) return;

      setLoading(true);
      try {
        const body = {
          project_id,
          filters: [{ label: "layer6", values: ["ct"] }],
        };

        const data: ApiResponse = await createNodeAttribute(body);

        if (data?.message) {
          NotificationExtension.Success(data.message);
        }

        if (data?.data && Array.isArray(data.data)) {
          onModelsLoaded?.(data.data.map((i) => i.building_code as string));

          const allPhases: string[] = data.data.flatMap((item: NodeAttributeItem) =>
            String(item.layer5 || "")
              .split(";")
              .map((z) => z.trim())
              .filter(Boolean)
          );

          const filteredPhases = allPhases.filter(
            (phase) => phase.toLowerCase() !== "skip"
          );

          const uniquePhases = Array.from(new Set(filteredPhases));

          // 🆕 Sắp xếp ưu tiên
          const priorityOrder = ["THE GATE", "COLMAR", "VENICE","SUNRISE","SUNSET","CHUNG CƯ VÀ NHÀ Ở XÃ HỘI"]; // chỉnh theo ý bạn

          const sortedPhases = uniquePhases.sort((a, b) => {
            const indexA = priorityOrder.indexOf(a);
            const indexB = priorityOrder.indexOf(b);

            if (indexA !== -1 && indexB !== -1) {
              return indexA - indexB;
            }
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            const numA = a.match(/\d+/)?.[0];
            const numB = b.match(/\d+/)?.[0];
            if (numA && numB) return Number(numA) - Number(numB);
            return a.localeCompare(b, "vi", { sensitivity: "base" });
          });

          const items: MenuItem[] = sortedPhases.map((phase) => ({
            label: phase,
          }));
          setMenuItems(items);
        } else {
          console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
          NotificationExtension.Fails("Dữ liệu trả về không hợp lệ từ API!");
        }
      } catch (error: unknown) {
        console.error("❌ Lỗi khi gọi API:", error);

        let apiMessage = "Gọi API thất bại!";
        if (error && typeof error === "object") {
          const errObj = error as {
            response?: { data?: { detail?: string; message?: string } };
            message?: string;
          };
          apiMessage =
            errObj.response?.data?.detail ||
            errObj.response?.data?.message ||
            errObj.message ||
            apiMessage;
        }

        NotificationExtension.Fails(apiMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id, onModelsLoaded]);

  const handleNavigate = (layer5: string) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Ca-mau/Mau-cong-trinh?id=${project_id}&layer5=${encodeURIComponent(
        layer5
      )}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Ca-mau?id=${project_id}`);
  };

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image
          src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      <div className={styles.title}>
        <h1>HỆ THỐNG PHÂN KHU</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                className={styles.menuBtn}
                onClick={() => handleNavigate(item.label)}
                variant="outline"
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

      <div className={styles.footer}>
        <Group gap="xs">
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
      </div>
    </div>
  );
}
