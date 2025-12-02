"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter2";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
// import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
   initialLayer4?: string | null; 
     onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
  onPhaseChange?: (phases: string) => void;
}

interface MenuItem {
  label: string;
  layer5: string;
  layer4: string;
 layer3: string;
}

interface NodeAttributeItem {
  layer3?: string;
  group?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialPhase,
      onModelsLoaded,
  // onSelectModel,
  initialLayer4,
  onPhaseChange,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseValue = searchParams.get("layer5") || initialPhase;
   const valuelayer4 = searchParams.get("layer4") || initialLayer4 ||"";

  // ⚙️ State
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [phase, setPhase] = useState<string>(phaseValue || "");
    const [layer4, setlayer4] = useState<string>(valuelayer4 || "");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  // const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(null);

  useEffect(() => {
    if (phaseValue && phaseValue !== phase) {
      setPhase(phaseValue);
      setlayer4(valuelayer4);
      onPhaseChange?.(phaseValue);
    }
  }, [phaseValue, phase, onPhaseChange,valuelayer4]);

  // 📡 Gọi API danh sách nhà
  const fetchData = useCallback(async () => {
    if (!project_id || !phase) return;
    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { lable: "group", values: ["ct"] },
          { lable: "layer5", values: [phase] },
           { lable: "layer4", values: [layer4] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();
                   onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.layer4)
        );

        data.data.forEach((item: NodeAttributeItem) => {
          const layer3 = item.layer3 || "";
          const groupValue = item.group;

          // 🆕 LOGIC LỌC: Bỏ qua nếu building_type_vi là "skip" (không phân biệt chữ hoa/thường)
          if (layer4.toLowerCase() === "skip") {
            return; 
          }

          if (
            layer4.trim() &&
            !layer4.includes(";") &&
            groupValue !== "ct;ti" &&
            !uniqueMap.has(layer4)
          ) {
            uniqueMap.set(layer4, {
              label: layer4,
              layer5: phase,
              layer4: layer4,
               layer3: layer3,
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
  }, [project_id, phase,onModelsLoaded]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🧭 Điều hướng
  const handleNavigate = (layer5: string, layer4: string,layer3: string,) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Ca-mau/Cong-trinh?id=${project_id}&layer5=${encodeURIComponent(
        layer5
      )}&layer4=${encodeURIComponent(layer4)}&layer3=${encodeURIComponent(layer3)}`
    );
  };

  // ⏪ Quay lại
const handleBack = () => {
  if (!project_id || !phase) return;
  router.push(`/Tuong-tac/Ca-mau/Mau-cong-trinh?id=${project_id}&layer5=${encodeURIComponent(phase)}`);
};
  // 🔆 ON / OFF
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

  // 🌗 MULTI
  // const handleMultiModeClick = () => {
  //   setIsMultiMode("multi");
  //   fetchData();
  // };

  // 🎨 Style nút ON/OFF
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
        <Image
          src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>{layer4?.toUpperCase()}</h1>
      </div>

      {/* Danh sách menu */}
      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleNavigate(item.layer5, item.layer4, item.layer3)}
                variant="filled"
                color="orange"
                style={{
                  marginBottom: "10px",
                  // background:
                  //   isMultiMode === "multi"
                  //     ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
                  //     : undefined,
                }}
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
          {/* 🔘 MULTI/SINGLE */}
          {/* <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeClick}
          /> */}

          {/* ⚙️ ON/OFF + Back */}
          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() =>
                active !== "on" ? handleClickOn() : setActive(null)
              }
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
    </div>
  );
}