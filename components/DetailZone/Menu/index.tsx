"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
  onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
  onPhaseChange?: (phases: string) => void;
}

interface MenuItem {
  model_building_vi: string;
  phase_vi: string;
}

interface NodeAttributeItem {
  model_building_vi?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialPhase,
  initialBuildingType,
  onModelsLoaded,
  onSelectModel,
  onPhaseChange
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("layer6") || initialPhase;
  const buildingTypeFromQuery =
    searchParams.get("layer3") || initialBuildingType;

  // 🟡 Ban đầu không sáng nút nào
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(null);
  const [loadingOn, setLoadingOn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [phase, setPhase] = useState<string>(phaseFromQuery || "");

    useEffect(() => {
      if (phaseFromQuery && phaseFromQuery !== phase) {
        setPhase(phaseFromQuery);
        onPhaseChange?.(phaseFromQuery);
      }
    }, [phaseFromQuery, phase, onPhaseChange]);

  // 🔹 Lấy danh sách model theo khu & loại nhà
  const fetchData = async () => {
    if (!project_id || !phaseFromQuery || !buildingTypeFromQuery) return;

    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer7", values: ["ct"] },
          { label: "layer6", values: [phaseFromQuery] },
          { label: "layer3", values: [buildingTypeFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data)) {
        const uniqueMap = new Map<string, MenuItem>();

        // Gọi callback nếu có
        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.layer1)
        );

        data.data.forEach((item: NodeAttributeItem) => {
          const modelLabel = item.layer2 as string;
          if (modelLabel?.toLowerCase() === "skip") {
            return;
          }

          if (modelLabel && !uniqueMap.has(modelLabel)) {
            uniqueMap.set(modelLabel, {
              model_building_vi: modelLabel,
              phase_vi: phaseFromQuery!,
            });
          }
        });

        const sortedItems = Array.from(uniqueMap.values()).sort((a, b) => {
          const getNumber = (label: string) => {
            const match = label.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          };
          return getNumber(a.model_building_vi) - getNumber(b.model_building_vi);
        });

        setMenuItems(sortedItems);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [project_id, phaseFromQuery, buildingTypeFromQuery, onModelsLoaded]);

  // 🔹 Khi chọn model
  const handleSelectModel = async (modelName: string) => {
    if (!project_id || !phaseFromQuery || !buildingTypeFromQuery) return;

    try {
      const result = await createNodeAttribute({
        project_id,
        filters: [
        { label: "layer7", values: ["ct"] },
          { label: "layer6", values: [phaseFromQuery] },
          { label: "layer3", values: [buildingTypeFromQuery] },
          { label: "layer2", values: [modelName] },
        ],
      });

      console.log("📦 Dữ liệu model cụ thể:", result);
      // onModelsLoaded?.([modelName]); // svg hiển thị theo từng nút
    } catch (error) {
      console.error("❌ Lỗi khi gọi lại API model:", error);
    }
  };

  // 🔹 Điều hướng quay lại
  const handleBack = () => {
    if (!project_id || !phaseFromQuery) return;
    router.push(
      `/Tuong-tac/Millennia-City/Mau-cong-trinh?id=${project_id}&phase=${encodeURIComponent(phaseFromQuery)}`
    );
  };

  // 🔹 Xử lý nút ON/OFF
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

  // 🔹 Khi bấm MULTI
  const handleMultiModeClick = () => {
    setIsMultiMode("multi");
    fetchData();
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
          src="/Logo/logo-tt-city-millennia.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Title */}
      <div className={styles.title}>
        <h1>{buildingTypeFromQuery?.toUpperCase()}</h1>
      </div>

      {/* Menu Buttons */}
      <div className={styles.Function}>
        {menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => {
                  handleSelectModel(item.model_building_vi);
                  onSelectModel?.(item.model_building_vi);
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
                {item.model_building_vi}
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
            onMultiModeClick={handleMultiModeClick}
          />
          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() => {
                if (active !== "on") handleClickOn();
                setActive(active === "on" ? null : "on");
              }}
              disabled={loadingOn}
            >
              <Text style={{ fontSize: "13px" }}>ON</Text>
            </Button>

            <Button
              style={getButtonStyle(active === "off")}
              onClick={() => {
                if (active !== "off") handleClickOFF();
                setActive(active === "off" ? null : "off");
              }}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

            <Button
              onClick={handleBack}
              variant="filled"
              style={getButtonStyle(false)}
            >
              <IconArrowLeft size={18} color="#752E0B" />
            </Button>
          </Group>
        </Stack>
      </div>
    </div>
  );
}
