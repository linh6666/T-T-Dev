"use client";

import React, { useState, useMemo, useRef,useEffect } from "react";
import { Image } from "@mantine/core";
import Menu from "./Menu/index";
import { pathsData, SvgItem } from "./Data";
import styles from "./ZoningSystem.module.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useSearchParams } from "next/navigation";

interface ZoningSystemProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
}

export default function ZoningSystem({
  project_id,
  initialPhase,
  initialBuildingType,
}: ZoningSystemProps) {
  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
   const searchParams = useSearchParams();
    const urlPhase = searchParams.get("phase"); 
    const [, setCurrentPhase] = useState<string>(urlPhase || "");

  // ✅ ref để điều khiển zoom/pan
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const filteredPaths = useMemo(() => {
    if (!activeModels || activeModels.length === 0) return [];

    const result = pathsData.map((item: SvgItem) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");

      Array.from(svgDoc.querySelectorAll("rect, path")).forEach((el) => {
        const elPrefix = el.id?.split(".").slice(0, 2).join(".");
        if (!elPrefix || !activeModels.includes(elPrefix)) {
          el.setAttribute("style", "display:none");
        } else {
          el.removeAttribute("style");
          if (selectedModel && elPrefix === selectedModel) {
            el.setAttribute("fill", "#bb8d38");
            el.setAttribute("stroke", "white");
          }
        }
      });

      return {
        ...item,
        svg: svgDoc.documentElement.outerHTML,
      };
    });

    return result;
  }, [activeModels, selectedModel]);

  // ✅ Khi click model bên Menu
  const handleModelSelect = (modelName: string) => {
    setSelectedModel((prev) => (prev === modelName ? null : modelName));

    // Zoom vào vùng SVG tương ứng (giả sử có id là modelName)
 
  };

    // ✅ Khi phase đổi từ URL -> tự động pan đúng vị trí (chỉ chạy 1 lần khi load)
useEffect(() => {
  if (!transformRef.current || !urlPhase) return;

  const timer = setTimeout(() => {
    zoomToPhase(urlPhase);
  }, 80); // Chờ DOM load đủ để không bị zoom lệch

  return () => clearTimeout(timer);
}, [urlPhase]);

const zoomToPhase = (phase: string) => {
  if (!transformRef.current) return;
  switch (phase) {
    case "THE MARINA":
      transformRef.current.setTransform(-3, -75, 1.2);
      break;
    case "THE STELLA":
      transformRef.current.setTransform(0, -142, 1.3);
      break;
    case "THE HERITAGE":
      transformRef.current.setTransform(-286, -250, 1.4);
      break;
    case "THE OPERA":
      transformRef.current.setTransform(-455, -175, 1.5);
      break;
    default:
      transformRef.current.resetTransform();
  }
};
    // ✅ Cập nhật nếu chọn bằng Menu hoặc click
const handlePhaseChange = (newPhase: string) => {
  setCurrentPhase(newPhase);
  zoomToPhase(newPhase);
};
  

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={1}
          maxScale={5}
          wheel={{ step: 0.2 }}
          doubleClick={{ disabled: true }}
                 onPanningStop={(ref) => {
            const { positionX, positionY } = ref.state;
            console.log("📍 Vị trí sau khi kéo:", positionX, positionY);
          }}
        >
          <TransformComponent>
            <div className={styles.imageWrapper}>
              <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />

              {filteredPaths.length > 0 ? (
                filteredPaths.map((item) => (
                  <div
                    key={item.id}
                    className={styles.overlaySvg}
                    style={{
                      top: `${item.topPercent}%`,
                      left: `${item.leftPercent}%`,
                    }}
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                ))
              ) : (
                <p>Không có SVG nào để hiển thị.</p>
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={initialPhase}
          initialBuildingType={initialBuildingType}
          onModelsLoaded={setActiveModels}
          onSelectModel={handleModelSelect} // ✅ truyền xuống Menu
          onPhaseChange={handlePhaseChange}

        />
      </div>
    </div>
  );
}

