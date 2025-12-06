"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifiterutilities3";

interface MenuProps {
  project_id: string | null;
  onModelsLoaded?: (models: string[]) => void;
    onSelectModel?: (modelName: string) => void;
}

interface MenuItem {
  label: string;
}

interface NodeAttributeItem {
  layer6?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id,onModelsLoaded }: MenuProps) {
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
        filters: [{values: ["ti"] }],
      };

      const data = await createNodeAttribute(body);

      if (data?.data && Array.isArray(data.data)) {
        // ✅ Gọi callback khi models đã load xong
        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.layer2)
        );

        const allZones: string[] = data.data
          .flatMap((item: NodeAttributeItem) =>
            String(item.layer2 || "")
              .split(";")
              .map((z) => z.trim())
              .filter(Boolean)
              .filter(z => z !== "skip") // ✅ bỏ qua "skip"
          );

        const uniqueZones = Array.from(new Set(allZones));


        const fixedOrder = [
          "Trung tâm thương mại",
          // "Trường học",
          // "Giao thông",
          // "Thể dục thể thao",
          // "Hạ tầng kỹ thuật",
          // "Đài phun nước",
        ];

        const sortedZones = fixedOrder.filter((z) => uniqueZones.includes(z));
        const remainingZones = uniqueZones.filter(
          (z) => !fixedOrder.includes(z)
        );
        const finalZones = [...sortedZones, ...remainingZones];

        const items: MenuItem[] = finalZones.map((zone) => ({ label: zone }));
        setMenuItems(items);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [project_id, onModelsLoaded]);


  const handleNavigate = (layer2: string) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Times-Square/Chi-tiet-tien-ich?id=${project_id}&layer2=${encodeURIComponent(layer2)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Times-Square?id=${project_id}`);
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
        <h1>TIỆN ÍCH</h1>
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
                 style={{ margin: "8px", fontSize: "9px" }} 
                
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
