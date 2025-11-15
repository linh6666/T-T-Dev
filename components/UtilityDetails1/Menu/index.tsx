"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifiterutilities";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialBuildingType?: string | null;
  onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
}

interface MenuItem {
  label: string;
  subzone_vi: string;
}

interface NodeAttributeItem {
  building_code?: string;
  group?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialBuildingType,
  onModelsLoaded,
  onSelectModel,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("model") || initialBuildingType;

  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOn, setLoadingOn] = useState(false);
  const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(null);

  // ✅ Hàm fetchData được đưa ra ngoài để tái sử dụng
  const fetchData = async () => {
    if (!project_id || !phaseFromQuery) return;

    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ti"] },
          { label: "model_building_vi", values: [phaseFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.building_code)
        );
        const uniqueMap = new Map<string, MenuItem>();

        data.data.forEach((item: NodeAttributeItem) => {
          const subzone: string = item.building_code || "";
          if (
            subzone.trim() &&
            !subzone.includes(";") &&
            !subzone.includes("Cảnh quan") &&
            !uniqueMap.has(subzone)
          ) {
            uniqueMap.set(subzone, {
              label: subzone,
              subzone_vi: subzone,
            });
          }
        });

        let finalItems = Array.from(uniqueMap.values());
        
        // 🚀 BẮT ĐẦU PHẦN SẮP XẾP DỮ LIỆU
        finalItems = finalItems.sort((a, b) => {
            // Sử dụng localeCompare để sắp xếp chuỗi (từ A-Z) một cách chuẩn xác
            // hoặc chuyển thành số nếu chuỗi là số (ví dụ: "1", "2", "10")
            const labelA = a.label;
            const labelB = b.label;

            // Thử chuyển thành số để sắp xếp số đúng cách (ví dụ: 1, 2, 10 thay vì 1, 10, 2)
            const numA = parseInt(labelA, 10);
            const numB = parseInt(labelB, 10);

            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB;
            }

            // Nếu không phải số, sắp xếp theo bảng chữ cái
            return labelA.localeCompare(labelB, 'vi', { sensitivity: 'base' });
        });
        // 🚀 KẾT THÚC PHẦN SẮP XẾP DỮ LIỆU

        setMenuItems(finalItems);
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

  useEffect(() => {
    fetchData();
  }, [project_id, phaseFromQuery, onModelsLoaded]);

  const handleMenuClick = async (subzoneLabel: string) => {
    if (!project_id || !phaseFromQuery) return;

    try {
      console.log("🧩 Gọi lại API với:", {
        project_id,
        model_building_vi: phaseFromQuery,
        building_code: subzoneLabel,
      });

      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ti"] },
          { label: "model_building_vi", values: [phaseFromQuery] },
          { label: "building_code", values: [subzoneLabel] },
        ],
      });

      console.log("✅ API trả về:", data);
    } catch (error) {
      console.error("❌ Lỗi khi gọi lại API:", error);
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
      console.log("✅ API OFF result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API OFF:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Phuoc-tho/Tien-ich?id=${project_id}`);
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

  const handleMultiModeClick = () => {
    setIsMultiMode("multi");
    fetchData();
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
        <h1>{(phaseFromQuery || "LOẠI TIỆN ÍCH").toUpperCase()}</h1>
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
                onClick={() => {
                  handleMenuClick(item.label);
                  onSelectModel?.(item.label);
                }}
                variant="filled"
                color="orange"
                style={{
                  marginBottom: "10px",
                  background:
                    isMultiMode === "multi"
                      ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
                      : undefined,
                }}
                disabled={isMultiMode === "multi"}
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
        <Stack align="center" gap="xs">
          <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeClick}
          />
          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() => {
                if (active !== "on") {
                  setActive("on");
                  handleClickOn();
                } else {
                  setActive(null);
                }
              }}
              disabled={loadingOn}
            >
              <Text style={{ fontSize: "13px" }}>ON</Text>
            </Button>

            <Button
              style={getButtonStyle(active === "off")}
              onClick={() => {
                if (active !== "off") {
                  setActive("off");
                  handleClickOFF();
                } else {
                  setActive(null);
                }
              }}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

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