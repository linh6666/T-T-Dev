"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

interface MenuProps {
  project_id: string | null;
  initialBuildingType?: string | null;
  initialModelBuilding?: string | null;
}

interface MenuItem {
  label: string;
  subzone_vi: string;
}

interface NodeAttributeItem {
  building_code?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, initialBuildingType, initialModelBuilding }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
 const phaseFromQuery = searchParams.get("building") || initialBuildingType || "";
const modelFromQuery = searchParams.get("model_building_vi") || initialModelBuilding || "";

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !phaseFromQuery !) return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ti"] },
            { label: "building_type_vi", values: [phaseFromQuery] },
            { label: "model_building_vi", values: [modelFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const subzone: string = item.building_code || "";

            if (subzone.trim() && !subzone.includes(";") && !uniqueMap.has(subzone)) {
              uniqueMap.set(subzone, {
                label: subzone,
                subzone_vi: subzone,
              });
            }
          });

          setMenuItems(Array.from(uniqueMap.values()));
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id, phaseFromQuery,modelFromQuery]);

 

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/tien-ich-1?id=${project_id}`);
  };

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image src="/Logo/TTHOMES logo-01.png" alt="Logo" className={styles.imgea} />
      </div>

      <div className={styles.title}>
        <h1>Chi tiết tiện ích</h1>
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
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
              
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
