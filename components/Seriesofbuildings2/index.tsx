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

  const [currentLayer2, setCurrentLayer2] = useState<string>(urlLayer2 || "");
  const [currentPhase, setCurrentPhase] = useState<string>(urlPhase || "");

  const [activeModels, setActiveModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);

  // ===== POPUP STATE =====
  const [opened, setOpened] = useState(false);
  const [clickedModel, setClickedModel] = useState<string | null>(null);
const [selectedProjectId, setSelectedProjectId] = useState<string | null>(project_id);

  // ----------------------------------------
  // ⭐ LẤY ẢNH THEO LAYER 2 + FALLBACK
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
        const svgEl = el as SVGElement;

        const elId = svgEl.id || "";
        const cleanElId = elId.replace(/\s+/g, "_").toUpperCase();

        svgEl.setAttribute("data-model", elId);
        svgEl.style.cursor = "pointer";

        const isMatch = activeModels.some((model) => {
          const cleanModel = model.replace(/\s+/g, "_").toUpperCase();
          return (
            cleanElId.includes(cleanModel) ||
            cleanModel.includes(cleanElId)
          );
        });

        if (isMatch) {
          svgEl.removeAttribute("style");

          if (activeMode === "multi") {
            svgEl.setAttribute("fill", "#bb8d38");
            svgEl.setAttribute("stroke", "white");
          } else if (
            selectedModel &&
            cleanElId.includes(
              selectedModel.replace(/\s+/g, "_").toUpperCase()
            )
          ) {
            svgEl.setAttribute("fill", "#bb8d38");
            svgEl.setAttribute("stroke", "white");
          } else {
            const originalFill =
              svgEl.getAttribute("data-original-fill") ||
              svgEl.getAttribute("fill") ||
              "#fff";

            if (!svgEl.hasAttribute("data-original-fill")) {
              svgEl.setAttribute("data-original-fill", originalFill);
            }

            svgEl.setAttribute("fill", originalFill);
            svgEl.removeAttribute("stroke");
          }
        } else {
          svgEl.setAttribute("style", "display:none");
        }
      });

      return { ...item, svg: svgDoc.documentElement.outerHTML };
    });
  }, [activeModels, selectedModel, activeMode]);

  // ----------------------------------------
  // ⭐ CLICK SVG → MỞ POPUP
  // ----------------------------------------
  const handleSvgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    const model = target.getAttribute("data-model");

    if (!model) return;

    setOpened(false);
    setClickedModel(null);

    requestAnimationFrame(() => {
      setClickedModel(model);
      setSelectedProjectId(project_id); // gán project_id hiện tại
      setOpened(true);
    });
  };

  // ----------------------------------------
  // ⭐ MODEL SELECT (SINGLE)
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

  // ----------------------------------------
  // ⭐ PHASE CHANGE
  // ----------------------------------------
  const handlePhaseChange = (newPhase: string) => {
    setCurrentPhase(newPhase);
    setCurrentLayer2(newPhase);
  };

  // ----------------------------------------
  // ⭐ LOAD MULTI MODELS
  // ----------------------------------------
  const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null);
  }, []);

  return (
    <>
      {/* ===== POPUP ===== */}
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
            <Image src={imageSrc} alt="Ảnh" className={styles.img} />

            {filteredPaths.length > 0 ? (
              filteredPaths.map((item) => (
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
    </>
  );
}
