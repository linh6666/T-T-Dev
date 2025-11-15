"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index"; 
import { pathsData } from "./Data";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoningSystemProps {
  project_id: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
         <TransformWrapper
          initialScale={1}
     minScale={1} 
          maxScale={5}
          wheel={{ step: 0.2 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg4.png" alt="Ảnh" className={styles.img} />

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

           </TransformComponent>
        </TransformWrapper>
      </div>

      <div className={styles.right}>
        {/* 👇 Truyền project_id sang Menu */}
        <Menu project_id={project_id} />
      </div>
    </div>
  );
}
