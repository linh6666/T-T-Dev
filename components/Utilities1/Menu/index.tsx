"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image,  Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifiterutilities";

import { NotificationExtension } from "../../../extension/NotificationExtension";

interface MenuProps {
  project_id: string | null;
  onModelsLoaded?: (models: string[]) => void;
}

interface MenuItem {
  label: string;
}

interface NodeAttributeItem {
  model_building_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, onModelsLoaded, }: MenuProps) {
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
        filters: [{ label: "group", values: ["ti"] }],
      };

      const data = await createNodeAttribute(body);

      // ✅ Hiển thị message nếu backend trả về
      if (data?.message) {
        NotificationExtension.Success(data.message);
      }

      if (data?.data && Array.isArray(data.data)) {
        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.building_code)
        );

        // Lấy tất cả item từ API
        const allZones: string[] = data.data
          .flatMap((item: NodeAttributeItem) =>
            String(item.model_building_vi || "")
              .split(";")
              .map((z) => z.trim())
              .filter(Boolean)
          );

        // Loại bỏ trùng lặp
        const uniqueZones = Array.from(new Set(allZones));

        // --- Ẩn các item không muốn hiển thị ---
        const hiddenItems = ["Shophouse 01"];
        const filteredZones = uniqueZones.filter(z => !hiddenItems.includes(z));

        // --- Sắp xếp fix cứng ---
        const fixedOrder = ["Thương mại", "Trường học", "Giao thông"];
        const sortedZones = fixedOrder.filter(z => filteredZones.includes(z));
        const remainingZones = filteredZones.filter(z => !fixedOrder.includes(z));
        const finalZones = [...sortedZones, ...remainingZones];

        // Chuyển thành menu items
        const items: MenuItem[] = finalZones.map((zone) => ({ label: zone }));
        setMenuItems(items);

        if (items.length > 0) {
         
        } else {
          NotificationExtension.Fails("Không có khu vực nào để hiển thị!");
        }
      } else {
        console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
        NotificationExtension.Fails("Dữ liệu trả về không hợp lệ từ API!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      NotificationExtension.Fails("Gọi API thất bại!");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [project_id, onModelsLoaded]);
  const handleNavigate = (model_building_vi: string) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Phuoc-tho/Chi-tiet-tien-ich?id=${project_id}&model_building_vi=${encodeURIComponent(model_building_vi)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Phuoc-tho/?id=${project_id}`);
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
        <h1>TIỆN ÍCHKKK</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
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
          </div>
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
