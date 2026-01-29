"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifiterutilities3";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initiallayer2?: string | null;
  onModelsLoaded?: (models: string[]) => void;
  onSelectModel?: (modelName: string) => void;
  
}

interface MenuItem {
  label: string;
  phase_vi: string;
  subzone_vi: string;
}

interface NodeAttributeItem {
  layer1?: string;
  group?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initiallayer2,
  onModelsLoaded,
  onSelectModel,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("layer2") || initiallayer2;

  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [isMultiMode, setIsMultiMode] =
    useState<"single" | "multi" | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOn, setLoadingOn] = useState(false);

  // Fetch data
  const fetchData = async () => {
    if (!project_id || !phaseFromQuery) return;

    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          {label: "layer4",values: ["ti"] },
          { label: "layer2", values: [phaseFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        onModelsLoaded?.(data.data.map((i: NodeAttributeItem) => i.layer1));

        const uniqueMap = new Map<string, MenuItem>();

        data.data.forEach((item: NodeAttributeItem) => {
          const subzone: string = item.layer1 || "";
if (subzone.toLowerCase() === "skip") return;
          if (
            subzone.trim() &&
            !subzone.includes(";") &&
            !subzone.includes("Cảnh quan") &&
            !uniqueMap.has(subzone)
          ) {
            uniqueMap.set(subzone, {
              label: subzone,
              phase_vi: phaseFromQuery,
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

  useEffect(() => {
    fetchData();
  }, [project_id, phaseFromQuery, onModelsLoaded]);

  // Khi nhấn 1 item
  const handleMenuClick = async (layer1: string) => {
    if (!project_id || !phaseFromQuery) return;

    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
         {  values: ["ti"] },
          { label: "layer2", values: [phaseFromQuery] },
           { label: "layer1", values: [layer1] },
        ],
      });

      console.log("✅ API trả về cho", layer1, data);
      //   if (isMultiMode !== "multi") {
      //   onSelectModel?.(layer1);
      // }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    }
  };

  // ❗❗ MULTI MODE API
  const handleMultiModeAPI = async () => {
    if (!project_id || !phaseFromQuery) return;

    try {
      console.log("🔄 MULTI MODE → gọi lại API...");
      const res = await createNodeAttribute({
        project_id,
        filters: [
          { values: ["ti"] },
         { label: "layer2", values: [phaseFromQuery] },
         
        ],
      });

      console.log("🔥 MULTI MODE API:", res);

      if (res?.data && Array.isArray(res.data)) {
        onModelsLoaded?.(res.data.map((i: NodeAttributeItem) => i.layer1));
      }
    } catch (error) {
      console.error("❌ Lỗi MULTI MODE API:", error);
    }
  };

  // ON / OFF API
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

  const handleClickOn = async () => {
    if (!project_id) return;
    setActive("on");
    setLoadingOn(true);
    try {
      const res = await createON({ project_id });
      console.log("API ON:", res);
    } catch (err) {
      console.error("Lỗi ON:", err);
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
      console.log("API OFF:", res);
    } catch (err) {
      console.error("Lỗi OFF:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Times-Square/Tien-ich?id=${project_id}`);
  };

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
        <h1>{phaseFromQuery?.toUpperCase()}</h1>
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
            {/* ON */}
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

            {/* OFF */}
            <Button
              style={getButtonStyle(active === "off")}
              onClick={() => {
                if (active !== "off") handleClickOFF();
                setActive(active === "off" ? null : "off");
              }}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

            {/* Back */}
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
