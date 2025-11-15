"use client";

import { Image } from "@mantine/core";
import React, { useRef, useState,useEffect } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { pathsData } from "./pathsData/pathsData";

export default function ZoningSystem() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    console.log("selectedId hiện tại:", selectedId);
  }, [selectedId]);

  // Tạo ref cho từng overlay SVG
  const overlayRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // 🔥 Khi click nút Menu, nhận id của vùng SVG
const handleSelect = (id: string) => {
  console.log("Vùng được chọn:", id);
  setSelectedId(id);

  pathsData.forEach((item) => {
    const overlayDiv = overlayRefs.current.get(item.id);
    if (!overlayDiv) return;

    const gElements = overlayDiv.querySelectorAll<SVGGElement>("g");
    gElements.forEach((g) => {
      const shapes = g.querySelectorAll<SVGElement>("rect, polygon, path");
      shapes.forEach((shape) => {
        // ✅ chỉ highlight overlay trùng id, còn lại màu đen
        if (item.id === id) {
          shape.setAttribute("fill", "#f39c12"); // màu highlight
        } else {
          // giữ nguyên fill gốc của shape, nếu muốn reset về màu gốc
          const originalFill = shape.getAttribute("data-original-fill");
          shape.setAttribute("fill", originalFill || "red");
        }
      });
    });
  });
};



  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />

          {pathsData.map((item) => (
            <div
              key={item.id}
              className={styles.overlaySvg}
              data-id={item.id} // để dễ query
              ref={(el) => {
                if (el) overlayRefs.current.set(item.id, el);
              }}
              style={{
                top: `${item.topPercent}%`,
                left: `${item.leftPercent}%`,
              }}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {/* ✅ Truyền callback sang Menu */}
        <Menu onSelect={handleSelect} />
      </div>
    </div>
  );
}

