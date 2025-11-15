"use client";

import React, { useEffect, useState } from "react";
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
  initialSubzone?: string | null;
  initialBuildingTypeVi?: string | null;
  onModelsLoaded?: (models: string[]) => void;
   onPhaseChange?: (subzone: string) => void;
}

interface MenuItem {
  label: string;
  subzone_vi: string;
  building_type_vi: string;
  model_building_vi: string;
}

interface NodeAttributeItem {
  building_type_vi?: string;
  model_building_vi?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialSubzone,
  initialBuildingTypeVi,
  onModelsLoaded,
  onPhaseChange
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subzoneFromQuery =
    searchParams.get("subzone_vi") || initialSubzone || "";
  const buildingTypeViFromQuery =
    searchParams.get("building_type_vi") || initialBuildingTypeVi || "";

  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // ✅ CHỈ SỬA DÒNG NÀY — bỏ "multi" để khi load MULTI MODE không sáng
  // const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>(
  //   null
  // );
   const phaseFromQuery = searchParams.get("subzone") || initialSubzone;

  const [loadingOn, setLoadingOn] = useState(false);
  const [loading, setLoading] = useState(false);
     const [subzone, setSubzone] = useState<string>(phaseFromQuery || "");


useEffect(() => {
        if (phaseFromQuery && phaseFromQuery !== subzone) {
          setSubzone(phaseFromQuery);
          onPhaseChange?.(phaseFromQuery);
        }
      }, [phaseFromQuery, subzone, onPhaseChange]);


  const fetchData = async () => {
    if (!project_id || !subzoneFromQuery) return;

    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ct"] },
          { label: "subzone_vi", values: [subzoneFromQuery] },
          { label: "building_type_vi", values: [buildingTypeViFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();

        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.building_code)
        );

        data.data.forEach((item: NodeAttributeItem) => {
          const type_vi = (item.model_building_vi as string) || "";
          if (
            type_vi.trim() &&
            !uniqueMap.has(type_vi) &&
            type_vi !== "CẢNH QUAN"
          ) {
            uniqueMap.set(type_vi, {
              label: type_vi,
              subzone_vi: subzoneFromQuery,
              building_type_vi: buildingTypeViFromQuery,
              model_building_vi: type_vi,
            });
          }
        });

        const sortedItems = Array.from(uniqueMap.values()).sort((a, b) =>
          a.label.localeCompare(b.label, "vi", { sensitivity: "base" })
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
  };

  useEffect(() => {
    fetchData();
  }, [project_id, subzoneFromQuery, buildingTypeViFromQuery, onModelsLoaded]);

  const handleNavigate = (
    subzone: string,
    building_type_vi: string,
    model_building_vi: string
  ) => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Phuoc-tho/Cong-trinh?id=${project_id}&subzone_vi=${encodeURIComponent(
        subzone
      )}&building_type_vi=${encodeURIComponent(
        building_type_vi
      )}&model_building_vi=${encodeURIComponent(model_building_vi)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(
      `/Tuong-tac/Phuoc-tho/Loai-cong-trinh?id=${project_id}&subzone_vi=${encodeURIComponent(
        subzoneFromQuery
      )}`
    );
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

  // const handleMultiModeClick = () => {
  //   setIsMultiMode("multi");
  //   fetchData();
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
        <h1>{buildingTypeViFromQuery.toUpperCase()}</h1>
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
                onClick={() =>
                  handleNavigate(
                    item.subzone_vi,
                    item.building_type_vi,
                    item.model_building_vi
                  )
                }
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

      <div className={styles.footer}>
        <Stack align="center" gap="xs">
          {/* <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeClick}
          /> */}
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
