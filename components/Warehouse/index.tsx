"use client";

import React, { useState } from "react";
// import { Tabs } from "@mantine/core";
import styles from "./App.module.css";
import TotalWarehouse from "./TotalWarehouse";

interface AppProps {
  projectId: string;
  target?: string;
}

// 💡 Nhận props projectId
export default function Managent({ projectId,target }: AppProps) {
//   const [activeTab, setActiveTab] = useState<string | null>("all"); 
  const [activeView, setActiveView] = useState<string>("warehouse"); // main view

  // giả lập zoneNames để render tab (không gọi API)
 

  return (
    <div className={styles.container}>
      {/* Header view */}
      <div className={styles.headerList}>
        <h1
          className={`${styles.titleTab} ${
            activeView === "warehouse" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("warehouse")}
        >
          Kho hàng
        </h1>
        <h1
          className={`${styles.titleTab} ${
            activeView === "amenities" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("amenities")}
        >
          Tài liệu
        </h1>
        <h1
          className={`${styles.titleTab} ${
            activeView === "houseType" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("houseType")}
        >
          Danh sách giá
        </h1>
        <h1
          className={`${styles.titleTab} ${
            activeView === "note" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("note")}
        >
          Ghi chú
        </h1>
      </div>

      {/* Nội dung view */}
      {activeView === "warehouse" &&  <TotalWarehouse projectId={projectId} target={target} />}

      {/* 
      {activeView === "amenities" && <AmenityContent projectId={projectId} />}
      {activeView === "houseType" && <HouseTypeContent projectId={projectId} />}
      {activeView === "note" && <Note projectId={projectId} />} 
      */}
    </div>
  );
}
