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
  layer4: string | null;
  layer3: string | null;
  phase?: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  const searchParams = useSearchParams();
  const urlPhase = searchParams.get("layer5");
  const urlLayer4 = searchParams.get("layer4");
  const urlLayer3 = searchParams.get("layer3");

  const [currentLayer3, setCurrentLayer3] = useState<string>(urlLayer3 || "");
  const [currentLayer4, setCurrentLayer4] = useState<string>(urlLayer4 || "");
  const [currentPhase, setCurrentPhase] = useState<string>(urlPhase || "");
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);

  // ✅ Lọc và highlight SVG
  const filteredPaths = useMemo(() => {
    if (!activeModels || activeModels.length === 0) {
      console.log("❌ Không có activeModels → Không hiển thị SVG");
      return [];
    }

    console.log("👉 activeModels từ API:", activeModels);

    const result = pathsData.map((item: SvgItem) => {
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

          // MULTI MODE → highlight tất cả models
          if (activeMode === "multi") {
            el.setAttribute("fill", "#bb8d38");
            el.setAttribute("stroke", "white");
          }
          // SINGLE MODE → chỉ highlight model được chọn
          else if (
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

      return {
        ...item,
        svg: svgDoc.documentElement.outerHTML,
      };
    });

    return result;
  }, [activeModels, selectedModel, activeMode]);

  // ✅ Chọn model trong SINGLE MODE
const handleModelSelect = (modelName: string | null) => {
  setActiveMode("single");

  if (!modelName) {
    // Nếu nhấn nút single mà không truyền model → clear hết
    setSelectedModel(null);
    setActiveModels([]);
    return;
  }

  // Nếu chọn model cụ thể thì toggle
  setSelectedModel((prev) => (prev === modelName ? null : modelName));
};

  // ✅ MULTI MODE callback ổn định
  const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null); // bỏ chọn riêng lẻ khi multi
  }, []);

  // ✅ Hàm pan/zoom tới phase tương ứng
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
      default:
        break;
    }
  };

  // ✅ Khi load URL lần đầu → tự động pan
  useEffect(() => {
    if (!transformRef.current || !urlPhase) return;
    const timer = setTimeout(() => {
      panToPhase(urlPhase);
    }, 150);
    return () => clearTimeout(timer);
  }, [urlPhase]);

  // ✅ Khi click hoặc chọn từ Menu
  const handlePhaseChange = (newPhase: string) => {
    setCurrentPhase(newPhase);
    setCurrentLayer4(newPhase);
    setCurrentLayer3(newPhase);
    panToPhase(newPhase);
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
              <Image src="/image/Home_ca_mau.png" alt="Ảnh" className={styles.img} />
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
          initialPhase={currentPhase}
          initialLayer4={currentLayer4}
          initialLayer3={currentLayer3}
          onModelsLoaded={handleModelsLoaded}
          onSelectModel={handleModelSelect}
          onPhaseChange={handlePhaseChange}
        />
      </div>
    </div>
  );
}
