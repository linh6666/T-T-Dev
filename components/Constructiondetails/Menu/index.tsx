"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

// 🧩 Props nhận vào
interface MenuProps {
  project_id: string | null;
  initialSubzone?: string | null;
  initialBuildingTypeVi?: string | null;
  initialModelBuildingVi?: string | null;
   onModelsLoaded?: (models: string[]) => void;
     onSelectModel?: (modelName: string) => void;
     onPhaseChange?: (subzone: string) => void;
}

// 🧱 Kiểu menu item
interface MenuItem {
  label: string;
  subzone_vi: string;
  building_type_vi: string;
  model_building_vi: string;
}

// 🧩 Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  building_type_vi?: string;
  model_building_vi?: string;
  layer1?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialSubzone,
  initialBuildingTypeVi,
  initialModelBuildingVi,
   onModelsLoaded,
    onSelectModel,
    onPhaseChange
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subzoneFromQuery = searchParams.get("layer4") || initialSubzone || "";
  const buildingTypeViFromQuery = searchParams.get("layer3") || initialBuildingTypeVi || "";
  const modelBuildingViFromQuery = searchParams.get("layer2") || initialModelBuildingVi || "";
 const phaseFromQuery = searchParams.get("subzone") || initialSubzone;
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [loadingOn, setLoadingOn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(null);
const [subzone, setSubzone] = useState<string>(phaseFromQuery || "");

useEffect(() => {
        if (phaseFromQuery && phaseFromQuery !== subzone) {
          setSubzone(phaseFromQuery);
          onPhaseChange?.(phaseFromQuery);
        }
      }, [phaseFromQuery, subzone, onPhaseChange]);

  // ✅ Hàm fetchData được đưa ra ngoài useEffect để tái sử dụng
  const fetchData = async () => {
    if (!project_id || !subzoneFromQuery) return;

    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer5", values: ["ct"] },
          { label: "layer4", values: [subzoneFromQuery] },
          { label: "layer3", values: [buildingTypeViFromQuery] },
          { label: "layer2", values: [modelBuildingViFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();
 onModelsLoaded?.(
        data.data.map((i: NodeAttributeItem) => i.layer1)
      );

        data.data.forEach((item: NodeAttributeItem) => {
          const type_vi = item.layer1 as string || "";
          if (type_vi.trim() && !uniqueMap.has(type_vi) && !type_vi.includes("CẢNH QUAN")) {
            uniqueMap.set(type_vi, {
              label: type_vi,
              subzone_vi: subzoneFromQuery,
              building_type_vi: buildingTypeViFromQuery,
              model_building_vi: type_vi,
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

  useEffect(() => {
    fetchData();
  }, [project_id, subzoneFromQuery, buildingTypeViFromQuery, modelBuildingViFromQuery, onModelsLoaded,]);

  const handleBack = () => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Phuoc-tho/Mau-cong-trinh?id=${project_id}&layer4=${encodeURIComponent(
        subzoneFromQuery
      )}&layer3=${encodeURIComponent(buildingTypeViFromQuery)}`
    );
  };

  const handleItemClick = async (modelName: string) => {
    if (!project_id || !subzoneFromQuery || !buildingTypeViFromQuery) return;

    try {
      await createNodeAttribute({
        project_id,
        filters: [
               { label: "layer5", values: ["ct"] },
          { label: "layer4", values: [subzoneFromQuery] },
          { label: "layer3", values: [buildingTypeViFromQuery] },
          { label: "layer2", values: [modelBuildingViFromQuery] }, 
          { label: "layer1", values: [modelName] },
        ],
      });
      //  onModelsLoaded?.([modelName]); đoạn là chỉ hiển thị 1 svg theo từng nút 
    } catch (error) {
      console.error("❌ Lỗi khi click nút:", error);
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
    background: isActive ? "linear-gradient(to top, #FFE09A,#FFF1D2)" : "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  });

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image src="/Logo/TTHOMES logo-01.png" alt="Logo" className={styles.imgea} />
      </div>

      <div className={styles.title}>
        <h1> {modelBuildingViFromQuery.toUpperCase()}</h1>
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
                  handleItemClick(item.model_building_vi);
                onSelectModel?.(item.model_building_vi);
              }}
                variant="filled"
                color="orange"
                style={{
                  marginBottom: "10px",
                  background: isMultiMode === "multi"
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
