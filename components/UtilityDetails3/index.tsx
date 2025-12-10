"use client";

import { Image } from "@mantine/core";
import React, {useCallback, useMemo,useState} from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index"; 
import { pathsData,SvgItem } from "./Data";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


interface ZoningSystemProps {
  project_id: string | null;
  initiallayer2?: string | null; // thêm prop mới
}

export default function ZoningSystem({ project_id, initiallayer2 }: ZoningSystemProps) {
    const [activeModels, setActiveModels] = useState<string[]>([]);
      const [selectedModel, setSelectedModel] = useState<string | null>(null);
        const [activeMode, setActiveMode] = useState<"single" | "multi" | null>(null);
  
  
  
  
    const [currentLayer2] = useState<string>(initiallayer2 || "");
      const getImageByLayer = (layerName: string | null) => {
    if (!layerName) return "/image/TIMES_HOME.png";

    const clean = layerName.trim().toUpperCase();
    return `/TIMES SQUARE/${clean}.png`;
  };


 const layerImage = useMemo(() => getImageByLayer(currentLayer2), [currentLayer2]);

   const imageSrc = useMemo(() => {
      return layerImage; // luôn giữ nguyên ảnh layer2
    }, [layerImage]);




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



 const handleModelSelect = (modelName: string | null) => {
    setActiveMode("single");
    if (!modelName) {
      setSelectedModel(null);
      setActiveModels([]);
      return;
    }
    // setSelectedModel(modelName);
     setSelectedModel((prev) => (prev === modelName ? null : modelName));
  };
 const handleModelsLoaded = useCallback((models: string[]) => {
    setActiveMode("multi");
    setActiveModels(models);
    setSelectedModel(null);
  }, []);
  return (
    <div className={styles.box}>
      <div className={styles.left}>
         {/* <TransformWrapper
          initialScale={1}
     minScale={1} 
          maxScale={5}
          wheel={{ step: 0.2 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent> */}
        <div className={styles.imageWrapper}>
           <Image
            src={imageSrc}
            alt="Ảnh"
            className={styles.img}
            onError={(e) => {
              e.currentTarget.src = "/image/TIMES_HOME.png";
            }}
          />

         {/* {filteredPaths.map((item) => {
  console.log("🟩 SVG được render lên UI:", item.id);

  return (
    <div
      key={item.id}
      className={styles.overlaySvg}
      style={{
        top: `${item.topPercent}%`,
        left: `${item.leftPercent}%`,
      }}
      dangerouslySetInnerHTML={{ __html: item.svg }}
    />
  );
})} */}
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
  {/* </TransformComponent>
        </TransformWrapper> */}

      </div>

      <div className={styles.right}>
        {/* 👇 Truyền project_id và initialBuildingType sang Menu */}
        <Menu project_id={project_id} initiallayer2={initiallayer2} 
        //  onModelsLoaded={setActiveModels}
         onSelectModel={handleModelSelect}
            onModelsLoaded={handleModelsLoaded}
         
        />
      </div>
    </div>
  );
}
