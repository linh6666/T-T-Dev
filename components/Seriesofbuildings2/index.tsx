"use client";

import { Image } from "@mantine/core";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
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

  // ----------------------------------------
  // ⭐ LẤY ẢNH THEO LAYER 2 VÀ FALLBACK
  // ----------------------------------------
  const getImageByLayer = (layerName: string | null) => {
    if (!layerName) return "/image/TIMES_HOME.png";
    const clean = layerName.trim().toUpperCase();
    return `/TIMES SQUARE/${clean}.png`;
  };

  const [imageSrc, setImageSrc] = useState("/image/TIMES_HOME.png");

  useEffect(() => {
    const candidate = getImageByLayer(currentLayer2);
    const img = new window.Image();
    img.src = candidate;

    img.onload = () => setImageSrc(candidate);
    img.onerror = () => setImageSrc("/image/TIMES_HOME.png");
  }, [currentLayer2]);

  // ----------------------------------------
  // ⭐ FILTER SVG
  // ----------------------------------------
  const filteredPaths = useMemo(() => {
    if (!activeModels || activeModels.length === 0) return [];

    return pathsData.map((item: SvgItem) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");

      Array.from(svgDoc.querySelectorAll("rect, path")).forEach((el) => {
        const elId = el.id || "";
        const cleanElId = elId.replace(/\s+/g, "_").toUpperCase();

        const isMatch = activeModels.some((model) => {
          const cleanModel = model.replace(/\s+/g, "_").toUpperCase();
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

  // ----------------------------------------
  // ⭐ MODEL SELECT
  // ----------------------------------------
  const handleModelSelect = (modelName: string | null) => {
    setActiveMode("single");
    if (!modelName) {
      setSelectedModel(null);
      setActiveModels([]);
      return;
    }
    setSelectedModel((prev) => (prev === modelName ? null : modelName));
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
    const timer = setTimeout(() => panToPhase(urlPhase), 150);
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

  return (
    <div className={styles.box}>
      {/* LEFT CONTENT */}
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          {/* ẢNH NỀN */}
          <Image
            src={imageSrc}
            alt="Ảnh"
            className={styles.img}
          />

          {/* SVG LỚP TRÊN */}
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

      {/* RIGHT MENU */}
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
