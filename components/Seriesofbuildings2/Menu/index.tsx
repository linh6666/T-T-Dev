"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter3";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";
import ModalItem from "./ModalItem"; // 👉 import modal riêng

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialLayer2?: string | null;
  onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
  onPhaseChange?: (phases: string) => void;
}

interface MenuItem {
  label: string;
  layer3: string;
  layer2: string;
}

interface NodeAttributeItem {
  layer1?: string;
  group?: string;
  description?: string;
  id?: number;
  [key: string]: unknown;
}

// 👉 Kiểu dữ liệu chi tiết để truyền vào Modal
interface DataDetail {
 id: number;
  unit_code: string;
  layer1?: string;
  layer2?: string;
  layer3?: string;
  zone?: string;
  building_type?: string;
  bedroom?: number | string;
  bathroom?: number | string;
  view?: string;
  status_unit?: string;
  price?: number;
  describe?: string;
  describe_vi?: string;
  main_door_direction?: string;
  balcony_direction?: string;
  direction?: string;
  url?: string;
  name_vi?: string;
  name_en?: string;
  description_en?: string;
 
}

export default function Menu({
  project_id,
  initialPhase,
  initialLayer2,
  onModelsLoaded,
  onSelectModel,
  onPhaseChange,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phaseValue = searchParams.get("layer3") || initialPhase;
  const valuelayer2 = searchParams.get("layer2") || initialLayer2 || "";

  // STATE
  const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(null);
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [phase, setPhase] = useState<string>(phaseValue || "");
  const [layer2, setLayer2] = useState<string>(valuelayer2 || "");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 👉 State cho Modal (object thay vì string)
  const [opened, setOpened] = useState(false);
  const [selectedData, setSelectedData] = useState<DataDetail | null>(null);

  // Cập nhật phase khi user đổi URL
  useEffect(() => {
    if (phaseValue && phaseValue !== phase) {
      setPhase(phaseValue);
      setLayer2(valuelayer2);
      onPhaseChange?.(phaseValue);
    }
  }, [phaseValue, phase, onPhaseChange, valuelayer2]);

  // Gọi API
  const fetchData = useCallback(async () => {
    if (!project_id || !phase) return;

    setLoading(true);

    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { values: ["ct"] },
          { label: "layer3", values: [phase] },
          { label: "layer2", values: [layer2] },
        ],
      });

      if (Array.isArray(data?.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();

        onModelsLoaded?.(data.data.map((i: NodeAttributeItem) => i.layer1));

        data.data.forEach((item: NodeAttributeItem) => {
          const layer1 = item.layer1 || "";
          const groupValue = item.group;

          if (layer1.toLowerCase() === "skip") return;

          if (
            layer1.trim() &&
            !layer1.includes(";") &&
            groupValue !== "ct;ti" &&
            !uniqueMap.has(layer1)
          ) {
            uniqueMap.set(layer1, {
              label: layer1,
              layer3: phase,
              layer2: layer2,
            });
          }
        });

        const sortedItems = Array.from(uniqueMap.values()).sort((a, b) => {
          const numA = parseInt(a.label, 10);
          const numB = parseInt(b.label, 10);

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }
          return a.label.localeCompare(b.label);
        });

        setMenuItems(sortedItems);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }, [project_id, phase, layer2, onModelsLoaded]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Khi bấm 1 item
 const handleMenuClick = async (layer1: string) => {
  if (!project_id) return;

  try {
    const res = await createNodeAttribute({
      project_id,
      filters: [
        { values: ["ct"] },
        { label: "layer3", values: [phase] },
        { label: "layer2", values: [layer2] },
        { label: "layer1", values: [layer1] },
      ],
    });

    console.log("✅ API trả về cho", layer1, res);

    // Chỉ cần lấy dữ liệu đầu tiên trả về từ API
    const itemData = res?.data?.[0] ?? null;

    if (itemData) {
      setSelectedData(itemData); // truyền trực tiếp vào modal
      setOpened(true);

      if (isMultiMode !== "multi") {
        onSelectModel?.(layer1);
      }
    }
  } catch (error) {
    console.error("❌ Lỗi khi gọi API:", error);
  }
};


  // MULTI MODE – Lấy toàn bộ model thuộc tầng
  const handleMultiModeAPI = async () => {
    if (!project_id || !phase || !layer2) return;

    try {
      console.log("🔄 MULTI MODE → gọi lại API...");

      const res = await createNodeAttribute({
        project_id,
        filters: [
          { values: ["ct"] },
          { label: "layer3", values: [phase] },
          { label: "layer2", values: [layer2] },
        ],
      });

      console.log("🔥 MULTI MODE API:", res);

      if (Array.isArray(res?.data)) {
        const models = res.data
          .map((i: NodeAttributeItem) => i.layer1)
          .filter((v: string | undefined) => v && v !== "skip");

        console.log("🟢 MULTI MODE activeModels:", models);

        onModelsLoaded?.(models);
      }
    } catch (error) {
      console.error("❌ Lỗi MULTI MODE API:", error);
    }
  };

  // Back
  const handleBack = () => {
    if (!project_id || !phase) return;

    router.push(
      `/Tuong-tac/Times-Square/Loai-cong-trinh?id=${project_id}&layer3=${encodeURIComponent(
        phase
      )}`
    );
  };

  // ON OFF
  const handleClickOn = async () => {
    if (!project_id) return;
    setActive("on");
    try {
      const res = await createON({ project_id });
      console.log("✅ API ON result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API ON:", err);
    }
  };

  const handleClickOFF = async () => {
    if (!project_id) return;
    setActive("off");
    try {
      const res = await createOFF({ project_id });
      console.log("✅ API OFF result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API OFF:", err);
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
    background: isActive ? "linear-gradient(to top, #FFE09A,#FFF1D2)" : "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  });

  return (
    <div className={styles.box}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image src="/Logo/TTHOMES logo-01.png" alt="Logo" className={styles.imgea} />
      </div>

      {/* Title */}
      <div className={styles.title}>
        <h1>{layer2?.toUpperCase()}</h1>
      </div>

      {/* Menu list */}
      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleMenuClick(item.label)}
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

      {/* Footer */}
      <div className={styles.footer}>
        <Stack align="center" gap="xs">
          <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeAPI}
            onSelectModel={onSelectModel}
          />

          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() => (active !== "on" ? handleClickOn() : setActive(null))}
            >
              <Text style={{ fontSize: "13px" }}>ON</Text>
            </Button>

            <Button
              style={getButtonStyle(active === "off")}
              onClick={() =>
                active !== "off" ? handleClickOFF() : setActive(null)
              }
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

      {/* 👉 Modal hiển thị dữ liệu nút */}
      <ModalItem
        opened={opened}
        onClose={() => setOpened(false)}
        data={selectedData}
        projectId={project_id}
      />
    </div>
  );
}
