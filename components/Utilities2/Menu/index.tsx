"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifiterutilities";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

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

export default function Menu({ project_id,onModelsLoaded, onSelectModel }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
    const [active, setActive] = useState<"on" | "off" | null>(null);
      const [isMultiMode, setIsMultiMode] =
        useState<"single" | "multi" | null>(null);
      // const [loading, setLoading] = useState(false);
      const [loadingOn, setLoadingOn] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    if (!project_id) return;

    setLoading(true);
    try {
      const body = {
        project_id,
        filters: [{ label: "layer6", values: ["ti"] }],
      };

      const data = await createNodeAttribute(body);

      if (data?.data && Array.isArray(data.data)) {
        // ✅ Gọi callback khi models đã load xong
        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.building_code)
        );

        const allZones: string[] = data.data
          .flatMap((item: NodeAttributeItem) =>
            String(item.layer4 || "")
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


const handleMultiModeAPI = async () => {
    if (!project_id ) return;

    try {
      console.log("🔄 MULTI MODE → gọi lại API...");
      const res = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer6", values: ["ti"] },
         
        ],
      });

      console.log("🔥 MULTI MODE API:", res);

      if (res?.data && Array.isArray(res.data)) {
        onModelsLoaded?.(res.data.map((i: NodeAttributeItem) => i.building_code));
      }
    } catch (error) {
      console.error("❌ Lỗi MULTI MODE API:", error);
    }
  };





  const handleMenuClick = async (phaseFromQuery: string) => {
    if (!project_id ) return;

    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "layer6", values: ["ti"] },
          { label: "layer4", values: [phaseFromQuery] },
        
        ],
      });

      console.log("✅ API trả về cho", phaseFromQuery, data);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    }
  };

  // const handleNavigate = (layer4: string) => {
  //   if (!project_id) return;
  //   router.push(
  //     `/Tuong-tac/Ca-mau/Chi-tiet-tien-ich?id=${project_id}&layer4=${encodeURIComponent(layer4)}`
  //   );
  // };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Ca-mau?id=${project_id}`);
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
                  onClick={() => {
                  handleMenuClick(item.label);
                  onSelectModel?.(item.label);
                }}
                // onClick={() => handleNavigate(item.label)}
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
                 {/* <Function
                   activeMode={isMultiMode}
                   setActiveMode={setIsMultiMode}
                   onMultiModeClick={handleMultiModeAPI}
                 /> */}
       
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
