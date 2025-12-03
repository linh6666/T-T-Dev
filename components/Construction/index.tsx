"use client";

import { Image } from "@mantine/core";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import { pathsData, SvgItem } from "./Data";

interface ZoningSystemProps {
  project_id: string | null;
  layer4: string | null;
  layer3: string | null;
  phase?: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  const [currentLayer3, setCurrentLayer3] = useState<string>("");
  const [currentLayer4, setCurrentLayer4] = useState<string>("");
  const [currentPhase, setCurrentPhase] = useState<string>("");

  const transformRef = useRef<ReactZoomPanPinchContentRef | null>(null);

  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);

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
    setSelectedModel((prev) => (prev === modelName ? null : modelName));
  };

  const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null);
  }, []);

  // ✅ Zoom mặc định khi mở trang (có delay để chắc chắn mount xong)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (transformRef.current) {
        transformRef.current.setTransform(-117, -81, 1.2);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handlePhaseChange = (newPhase: string) => {
    setCurrentPhase(newPhase);
    setCurrentLayer4(newPhase);
    setCurrentLayer3(newPhase);
    // không zoom nữa
  };

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <TransformWrapper
          ref={(ref) => {
            if (ref) transformRef.current = ref;
          }}
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
