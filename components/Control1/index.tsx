"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./Control.module.css";
import Menu from "./Menu";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ControlPageProps {
  project_id: string | null;
}

export default function ControlPage({ project_id }: ControlPageProps) {
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
        <Image
          src="/image/home_bg4.png"
          alt="Ảnh trang chủ"
          className={styles.img}
        />
           </TransformComponent>
        </TransformWrapper>
      </div>

      <div className={styles.right}>
        {/* Truyền tiếp project_id sang Menu */}
        <Menu project_id={project_id} />
      </div>
    </div>
  );
}

