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
}

interface MenuItem {
  label: string;
}

interface NodeAttributeItem {
  subzone_vi?: string;
  [key: string]: unknown;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
  };
  message?: string;
}

export default function Menu({ project_id }: MenuProps) {
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
          filters: [{ label: "group", values: ["ct"] }],
        };

        const data = await createNodeAttribute(body);

        // ✅ Hiển thị message nếu backend trả về
        if (data?.message) {
          NotificationExtension.Success(data.message);
        }

        if (data?.data && Array.isArray(data.data)) {
          const allSubzones: string[] = data.data.flatMap((item: NodeAttributeItem) =>
            String(item.subzone_vi || "")
              .split(";")
              .map((z) => z.trim())
              .filter(Boolean)
          );

          if (allSubzones.length === 0) {
            NotificationExtension.Fails("Không có dữ liệu phân khu từ API!");
          }

          const uniqueSubzones = Array.from(new Set(allSubzones));

          const sortedSubzones = uniqueSubzones.sort((a, b) => {
            const numA = a.match(/\d+/)?.[0];
            const numB = b.match(/\d+/)?.[0];
            if (numA && numB) return Number(numA) - Number(numB);
            return a.localeCompare(b, "vi", { sensitivity: "base" });
          });

          const items: MenuItem[] = sortedSubzones.map((subzone) => ({
            label: subzone,
          }));

          setMenuItems(items);

          if (items.length > 0) {
            // NotificationExtension.Success("Tải danh sách phân khu thành công!");
          }
        } else {
          console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
          NotificationExtension.Fails("Dữ liệu trả về không hợp lệ từ API!");
        }
      } catch (error: unknown) {
        const err = error as ApiError;
        console.error("❌ Lỗi khi gọi API:", err);

        const apiMessage =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message;

        NotificationExtension.Fails(apiMessage || "Gọi API thất bại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id]);

  const handleNavigate = (subzone_vi: string) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Phuoc-tho/Loai-cong-trinh?id=${project_id}&subzone_vi=${encodeURIComponent(subzone_vi)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Phuoc-tho?id=${project_id}`);
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
            {menuItems.map((item, index) => (
              <Button
                key={index}
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

