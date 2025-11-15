"use client";

import React from "react";
import { Image } from "@mantine/core";
import Menu from "./Menu/index";
import { pathsData } from "./Data";
import styles from "./ZoningSystem.module.css";

// ⚙️ Props ZoningSystem
interface ZoningSystemProps {
  project_id: string | null;
  initialPhase?: string | null;  
  initialSuzone?: string | null;
  initialBuildingType?: string | null; // ✅ thêm prop
}

export default function ZoningSystem({
  project_id,
  initialPhase,
  initialSuzone,
  initialBuildingType, // ✅ nhận prop mới
}: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      {/* Hình bên trái */}
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image
            src="/image/home_bg.png"
            alt="Ảnh"
            className={styles.img}
          />
          {pathsData.map((item) => (
            <div
              key={item.id}
              className={styles.overlaySvg}
              style={{
                top: `${item.topPercent}%`,
                left: `${item.leftPercent}%`,
              }}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          ))}
        </div>
      </div>

      {/* Menu bên phải */}
      <div className={styles.right}>
      <Menu
  project_id={project_id}
  initialPhase={initialPhase}
  initialSubzone={initialSuzone}        // ✅ sửa lại
  initialBuildingType={initialBuildingType}
/>
      </div>
    </div>
  );
}
