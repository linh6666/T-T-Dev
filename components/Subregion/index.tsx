"use client";
import React, { useState, useMemo,useRef,useEffect } from "react";
import { Image } from "@mantine/core";
// import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { pathsData, SvgItem } from "./Data";
import { TransformWrapper, TransformComponent,  ReactZoomPanPinchRef, } from "react-zoom-pan-pinch";
import { useSearchParams } from "next/navigation";


interface ZoningSystemProps {
  project_id: string | null;
  subzone_vi?: string | null; // ✅ đổi từ phase → subzone_vi
}

export default function ZoningSystem({ project_id, subzone_vi }: ZoningSystemProps) {
   const [activeModels, setActiveModels] = useState<string[]>([]);
    const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
       const searchParams = useSearchParams();
      const urlPhase = searchParams.get("subzone_vi"); 
        const [, setCurrentPhase] = useState<string>(urlPhase || "");

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
        }
      });

      return {
        ...item,
        svg: svgDoc.documentElement.outerHTML,
      };
    });

    return result;
  }, [activeModels]);



useEffect(() => {
  // Kiểm tra giá trị của transformRef
  if (!transformRef.current || !urlPhase)return;
  

  const timer = setTimeout(() => {
   
    zoomToPhase(urlPhase);
  }, 300);
  return () => clearTimeout(timer);
}, [urlPhase]);


const zoomToPhase = (subzone: string) => {
  if (!transformRef.current) return;
  switch (subzone) {
    case "ĐA LỘC":
      transformRef.current.setTransform(-35, -155, 1.5);
      break;
    case "ĐA PHÚC":
      transformRef.current.setTransform(-249, -142, 1.3);
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
              <Image src="/image/home_bg4.png" alt="Ảnh" className={styles.img} />

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
        {/* 👇 Truyền cả project_id và subzone_vi xuống Menu */}
        <Menu project_id={project_id} initialSubzone={subzone_vi}
            onModelsLoaded={setActiveModels}
              onPhaseChange={handlePhaseChange} />
      </div>
    </div>
  );
}
