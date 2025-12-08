"use client";

import { Image } from "@mantine/core";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useSearchParams } from "next/navigation";
import { pathsData, SvgItem } from "./Data";

interface ZoningSystemProps {
  project_id: string | null;
  layer2: string | null;
  phase?: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  const searchParams = useSearchParams();
  const urlPhase = searchParams.get("layer3");
  const urlLayer2 = searchParams.get("layer2");
  const [currentLayer2, setCurrentLayer2] = useState<string>(urlLayer2 || "");
  const [currentPhase, setCurrentPhase] = useState<string>(urlPhase || "");
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);

  // --------------------------
  // ⭐ HÀM LẤY ẢNH THEO LAYER2
  // --------------------------
  const getImageByLayer = (layerName: string | null) => {
    if (!layerName) return "/image/TIMES_HOME.png";

    const clean = layerName.trim().toUpperCase();

    // tên file theo folder public
    return `/TIMES SQUARE/${clean}.png`;
  };

  // ⭐ ẢNH ƯU TIÊN THEO LAYER2 (nếu API có layer2)
  const layerImage = useMemo(() => {
    return getImageByLayer(currentLayer2);
  }, [currentLayer2]);

  // ⭐ Nếu chọn model thì ưu tiên ảnh theo model → nếu không thì theo layer2
  // const imageSrc = useMemo(() => {
  //   if (selectedModel) {
  //     return `/TIMES SQUARE/${selectedModel}.png`;
  //   }
  //   return layerImage; // ảnh theo layer2
  // }, [selectedModel, layerImage]);
//   const imageSrc = useMemo(() => {
//     // Giữ logic so sánh cho lần đầu, nhưng không thay đổi sau khi đã chọn
//     if (selectedModel) {
//         return `/TIMES SQUARE/${selectedModel}.png`;
//     }
//     return layerImage; // ảnh theo layer2
// }, [selectedModel, layerImage]);
const imageSrc = useMemo(() => {
  return layerImage;   // ⭐ luôn giữ ảnh ban đầu (theo layer2)
}, [layerImage]);

  // --------------------------
  // ⭐ FILTER SVG
  // --------------------------
  const filteredPaths = useMemo(() => {
    if (!activeModels || activeModels.length === 0) return [];
    return pathsData.map((item: SvgItem) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");
      Array.from(svgDoc.querySelectorAll("rect, path")).forEach((el) => {
        const elId = el.id || "";
        const cleanElId = elId.replace(/\s+/g, "_").toUpperCase();
        const isMatch = activeModels.some((model) => {
          const cleanModel = (model || "").replace(/\s+/g, "_").toUpperCase();
          return cleanElId.includes(cleanModel) || cleanModel.includes(cleanElId);
        });
        if (isMatch) {
          el.removeAttribute("style");
          if (activeMode === "multi") {
            el.setAttribute("fill", "#bb8d38");
            el.setAttribute("stroke", "white");
          } else if (
            selectedModel &&
            cleanElId.includes(selectedModel.replace(/\s+/g, "_").toUpperCase())
          ) {
            el.setAttribute("fill", "#bb8d38");
            el.setAttribute("stroke", "white");
          } else {
            const originalFill =
              el.getAttribute("data-original-fill") ||
              el.getAttribute("fill") ||
              "#fff";
            if (!el.hasAttribute("data-original-fill"))
              el.setAttribute("data-original-fill", originalFill);
            el.setAttribute("fill", originalFill);
            el.removeAttribute("stroke");
          }
        } else {
          el.setAttribute("style", "display:none");
        }
      });
      return { ...item, svg: svgDoc.documentElement.outerHTML };
    });
  }, [activeModels, selectedModel, activeMode]);

  const handleModelSelect = (modelName: string | null) => {
    setActiveMode("single");
    if (!modelName) {
      setSelectedModel(null);
      setActiveModels([]);
      return;
    }
    setSelectedModel(modelName);
  };

  const panToPhase = (phase: string) => {
    if (!transformRef.current) return;

    switch (phase) {
      case "THE MARINA":
        transformRef.current.setTransform(-117, -81, 1.2);
        break;
      case "THE STELLA":
        transformRef.current.setTransform(-50, -20, 1.2);
        break;
      case "THE HERITAGE":
        transformRef.current.setTransform(-200, -150, 1.3);
        break;
      case "THE OPERA":
        transformRef.current.setTransform(-172, -157, 1.2);
        break;
    }
  };

  useEffect(() => {
    if (!transformRef.current || !urlPhase) return;
    const timer = setTimeout(() => {
      panToPhase(urlPhase);
    }, 150);
    return () => clearTimeout(timer);
  }, [urlPhase]);

  const handlePhaseChange = (newPhase: string) => {
    setCurrentPhase(newPhase);
    setCurrentLayer2(newPhase);
    panToPhase(newPhase);
  };

  const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null);
  }, []);

  // --------------------------
  // ⭐ DEBUG LOG (đã thêm theo yêu cầu)
  // --------------------------
  console.log("➡ currentLayer2 =", currentLayer2);
  console.log("➡ selectedModel =", selectedModel);
  console.log("➡ Final imageSrc =", imageSrc);

  return (
    <div className={styles.box}>
      <div className={styles.left}>
       
            <div className={styles.imageWrapper}>
              <Image
                src={imageSrc}
                alt="Ảnh"
                className={styles.img}
                onError={(e) => {
                  e.currentTarget.src = "/image/TIMES_HOME.png";
                }}
              />

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
        
      </div>

      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={currentPhase}
          initialLayer2={currentLayer2}
          onModelsLoaded={handleModelsLoaded}
          onSelectModel={handleModelSelect}
          onPhaseChange={handlePhaseChange}
        />
      </div>
    </div>
  );
}
