"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index"; 
import { pathsData } from "./Data";

interface ZoningSystemProps {
  project_id: string | null;
  initialBuildingType?: string | null;      // building_type_vi
  initialModelBuilding?: string | null;     // model_building_vi mới
}

export default function ZoningSystem({
  project_id,
  initialBuildingType,
  initialModelBuilding, // <-- thêm
}: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg2.png" alt="Ảnh" className={styles.img} />

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

      <div className={styles.right}>
        {/* 👇 Truyền project_id, building_type_vi và model_building_vi sang Menu */}
        <Menu
          project_id={project_id}
          initialBuildingType={initialBuildingType}
          initialModelBuilding={initialModelBuilding} // <-- thêm
        />
      </div>
    </div>
  );
}

