"use client";

import React from "react";
import { Image } from "@mantine/core";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { pathsData } from "./Data";

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
          onPanningStop={(ref) => {
            const { positionX, positionY } = ref.state;
            console.log("📍 Vị trí sau khi kéo:", positionX, positionY);
          }}
        >
          <TransformComponent>
            <div className={styles.imageWrapper}>
              <Image
                src="/image/Home_ca_mau.png"
                alt="Ảnh"
                className={styles.img}
              />

              {/* ⬇️ Hiển thị toàn bộ SVG, không lọc */}
              {pathsData.length > 0 ? (
                pathsData.map((item) => (
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
        <Menu project_id={project_id} />
      </div>
    </div>
  );
}
