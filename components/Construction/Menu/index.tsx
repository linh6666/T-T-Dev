"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
// import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialLayer4?: string | null;
  initialLayer3?: string | null;
  onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
  onPhaseChange?: (phases: string) => void;
}

interface MenuItem {
  label: string;
  layer5: string;
  layer4: string;
  layer3: string;
  layer2: string;
}

interface NodeAttributeItem {
  layer2?: string;
  layer3?: string;
  group?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialPhase,
  initialLayer4,
  initialLayer3,
  onModelsLoaded,
  onSelectModel,
  onPhaseChange,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phaseValue = searchParams.get("layer5") || initialPhase;
  const valuelayer4 = searchParams.get("layer4") || initialLayer4 || "";
  const valuelayer3 = searchParams.get("layer3") || initialLayer3 || "";

  // ⚙️ State
  // const [isMultiMode, setIsMultiMode] =
  //   useState<"single" | "multi" | null>(null);
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [phase, setPhase] = useState<string>(phaseValue || "");
  const [layer4, setlayer4] = useState<string>(valuelayer4 || "");
  const [layer3, setlayer3] = useState<string>(valuelayer3 || "");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect với dependency đầy đủ
  useEffect(() => {
    if (phaseValue && phaseValue !== phase) {
      setPhase(phaseValue);
      setlayer4(valuelayer4);
      setlayer3(valuelayer3);
      onPhaseChange?.(phaseValue);
    }
  }, [phaseValue, phase, onPhaseChange, valuelayer4, valuelayer3]);

  // fetchData với useCallback đầy đủ dependencies
  const fetchData = useCallback(async () => {
    if (!project_id || !phase) return;
    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer6", values: ["ct"] },
          { label: "layer5", values: [phase] },
          { label: "layer4", values: [layer4] },
          { label: "layer3", values: [layer3] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();
        onModelsLoaded?.(data.data.map((i: NodeAttributeItem) => i.layer2));

        data.data.forEach((item: NodeAttributeItem) => {
          const layer2 = item.layer2 || "";
          const groupValue = item.group;

          if (layer2.toLowerCase() === "skip") return;

          if (
            layer2.trim() &&
            !layer2.includes(";") &&
            groupValue !== "ct;ti" &&
            !uniqueMap.has(layer2)
          ) {
            uniqueMap.set(layer2, {
              label: layer2,
              layer5: phase,
              layer4: layer4,
              layer3: layer3,
              layer2: layer2,
            });
          }
        });

        // 🔹 Sắp xếp từ nhỏ đến lớn theo label
        const sortedItems = Array.from(uniqueMap.values()).sort((a, b) =>
          a.label.localeCompare(b.label, "vi", { numeric: true })
        );

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
  }, [project_id, phase, layer4, layer3, onModelsLoaded]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔹 Xử lý khi nhấn 1 nút menu
  const handleMenuClick = async (layer2: string) => {
    if (!project_id || !valuelayer3) return;

    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer6", values: ["ct"] },
          { label: "layer5", values: [phase] },
          { label: "layer4", values: [layer4] },
          { label: "layer3", values: [layer3] },
          { label: "layer2", values: [layer2] },
        ],
      });

      console.log("✅ API trả về cho", layer2, data);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    }
  };

  const handleBack = () => {
    if (!project_id || !phase) return;
    router.push(
      `/Tuong-tac/Ca-mau/Day-cong-trinh?id=${project_id}&layer5=${encodeURIComponent(
        phase
      )}&layer4=${encodeURIComponent(layer4)}`
    );
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

  // const handleMultiModeAPI = async () => {
  //   if (!project_id || !phase || !layer4 || !layer3) return;

  //   try {
  //     console.log("🔄 MULTI MODE → gọi lại API...");

  //     const res = await createNodeAttribute({
  //       project_id,
  //       filters: [
  //         { label: "layer6", values: ["ct"] },
  //         { label: "layer5", values: [phase] },
  //         { label: "layer4", values: [layer4] },
  //         { label: "layer3", values: [layer3] },
  //       ],
  //     });

  //     console.log("🔥 MULTI MODE API:", res);

  //     // 🟢 Gửi layer2 về để SVG hiển thị
  //     if (res?.data && Array.isArray(res.data)) {
  //       const models = res.data
  //         .map((i: NodeAttributeItem) => i.layer2)
  //         .filter((v: string | undefined) => v && v !== "skip");

  //       console.log("🟢 MULTI MODE activeModels:", models);

  //       // cập nhật lại danh sách model để SVG map đúng
  //       onModelsLoaded?.(models);
  //     }
  //   } catch (error) {
  //     console.error("❌ Lỗi MULTI MODE API:", error);
  //   }
  // };

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
      <div className={styles.logo}>
        <Image
          src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      <div className={styles.title}>
        <h1>{layer3?.toUpperCase()}</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
                    <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                className={styles.menuBtn}
                onClick={() => {
                  handleMenuClick(item.label);
                  onSelectModel?.(item.label);
                }}
                variant="filled"
                color="orange"
                style={{
                  marginBottom: "10px",
                  // background:
                  //   isMultiMode === "multi"
                  //     ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
                  //     : undefined,
                }}
                // disabled={isMultiMode === "multi"}
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
          {/* <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeAPI}
            onSelectModel={onSelectModel}
          /> */}
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
