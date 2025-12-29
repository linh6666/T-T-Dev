"use client";

import { Image } from "@mantine/core";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { useSearchParams } from "next/navigation";
import { pathsData, SvgItem } from "./Data";
import InfoModal from "./Infomodal/index";

interface ZoningSystemProps {
  project_id: string | null;
  layer2: string | null;
  phase?: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  const searchParams = useSearchParams();
  const urlPhase = searchParams.get("layer3");
  const urlLayer2 = searchParams.get("layer2");

  const [currentLayer2, setCurrentLayer2] = useState(urlLayer2 || "");
  const [currentPhase, setCurrentPhase] = useState(urlPhase || "");

  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);

  // ⭐ QUAN TRỌNG: phân biệt load & click
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // ===== POPUP =====
  const [opened, setOpened] = useState(false);
  const [clickedModel, setClickedModel] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(project_id);

  // ----------------------------------------
  // IMAGE
  // ----------------------------------------
  const getImageByLayer = (layerName: string | null) => {
    if (!layerName) return "/image/TIMES_HOME.png";
    return `/TIMES SQUARE/${layerName.trim().toUpperCase()}.png`;
  };

  const [imageSrc, setImageSrc] = useState("/image/TIMES_HOME.png");

  useEffect(() => {
    const img = new window.Image();
    const src = getImageByLayer(currentLayer2);
    img.src = src;
    img.onload = () => setImageSrc(src);
    img.onerror = () => setImageSrc("/image/TIMES_HOME.png");
  }, [currentLayer2]);

  // ----------------------------------------
  // SVG FILTER (KHÔNG TÔ KHI CHƯA CLICK)
  // ----------------------------------------
  const filteredPaths = useMemo(() => {
    if (!activeModels.length) return [];

    return pathsData.map((item: SvgItem) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");

      Array.from(svgDoc.querySelectorAll("rect, path")).forEach((el) => {
        const svgEl = el as SVGElement;

        const elId = svgEl.id || "";
        const cleanElId = elId.replace(/\s+/g, "_").toUpperCase();

        svgEl.setAttribute("data-model", elId);
        svgEl.style.cursor = "pointer";

        const isMatch = activeModels.some((m) => {
          const cm = m.replace(/\s+/g, "_").toUpperCase();
          return cleanElId.includes(cm) || cm.includes(cleanElId);
        });

        if (!isMatch) {
          svgEl.style.display = "none";
          return;
        }

        svgEl.removeAttribute("style");

        // ⭐ CHƯA CLICK → CHỈ HIỆN SVG GỐC
        if (!hasUserInteracted) {
          const original =
            svgEl.getAttribute("data-original-fill") ||
            svgEl.getAttribute("fill") ||
            "none";

          svgEl.setAttribute("data-original-fill", original);
          svgEl.setAttribute("fill", original);
          svgEl.removeAttribute("stroke");
          return;
        }

        // ⭐ SAU CLICK → MỚI TÔ
        if (
          activeMode === "multi" ||
          (selectedModel &&
            cleanElId.includes(
              selectedModel.replace(/\s+/g, "_").toUpperCase()
            ))
        ) {
          svgEl.setAttribute("fill", "#bb8d38");
          svgEl.setAttribute("stroke", "white");
        }
      });

      return { ...item, svg: svgDoc.documentElement.outerHTML };
    });
  }, [activeModels, selectedModel, activeMode, hasUserInteracted]);

  // ----------------------------------------
  // CLICK SVG
  // ----------------------------------------
  const handleSvgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const model = (e.target as SVGElement).getAttribute("data-model");
    if (!model) return;

    // setHasUserInteracted(true);

    setOpened(false);
    requestAnimationFrame(() => {
      setClickedModel(model);
      setSelectedProjectId(project_id);
      setOpened(true);
    });
  };

  // ----------------------------------------
  // SINGLE SELECT
  // ----------------------------------------
  const handleModelSelect = (modelName: string | null) => {
    setHasUserInteracted(true);
    setActiveMode("single");

    if (!modelName) {
      setSelectedModel(null);
      setActiveModels([]);
      return;
    }

    setSelectedModel((prev) => (prev === modelName ? null : modelName));
  };

  // ----------------------------------------
  // PHASE
  // ----------------------------------------
  const handlePhaseChange = (phase: string) => {
    setCurrentPhase(phase);
    setCurrentLayer2(phase);
    setHasUserInteracted(false); // reset màu khi đổi tầng
  };

  // ----------------------------------------
  // MULTI LOAD (❌ KHÔNG set user interacted)
  // ----------------------------------------
  const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null);
  }, []);

  return (
    <>
      <InfoModal
        opened={opened}
        onClose={() => setOpened(false)}
        clickedModel={clickedModel}
        projectId={selectedProjectId}
        initialPhase={currentPhase}
        initialLayer2={currentLayer2}
      />

      <div className={styles.box}>
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <Image src={imageSrc} className={styles.img} alt="Ảnh" />

            {filteredPaths.map((item) => (
              <div
                key={item.id}
                className={styles.overlaySvg}
                style={{
                  top: `${item.topPercent}%`,
                  left: `${item.leftPercent}%`,
                }}
                onClick={handleSvgClick}
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            ))}
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
    </>
  );
}
