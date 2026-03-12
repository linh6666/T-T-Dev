"use client";

import React, { useState } from "react";
// import { Tabs } from "@mantine/core";
import styles from "./App.module.css";
import TotalWarehouse from "./TotalWarehouse";
import MyOder from "./MyOder";
// import { useRouter } from "next/navigation";
import { Group } from "@mantine/core";

interface AppProps {
  projectId: string;
   projectName?: string;
  target?: string;
}

// 💡 Nhận props projectId
export default function Managent({ projectId,target, projectName }: AppProps) {
//   const [activeTab, setActiveTab] = useState<string | null>("all"); 
  const [activeView, setActiveView] = useState<string>("warehouse"); // main view

  // giả lập zoneNames để render tab (không gọi API)
//  const router = useRouter();

  return (
    <div className={styles.containerr}>
 <h2 style={{ fontWeight: "bold", color: "#762f0b", fontSize: "25px" }}>
  Dự án {projectName}
</h2>
     <div className={styles.headerList}>
  {/* Tabs bên trái */}
  <Group  align="center">
    <h1
      className={`${styles.titleTab} ${activeView === "warehouse" ? styles.titleTabActive : ""}`}
      onClick={() => setActiveView("warehouse")}
    >
      Kho hàng
    </h1>
    <h1
      className={`${styles.titleTab} ${activeView === "amenities" ? styles.titleTabActive : ""}`}
      onClick={() => setActiveView("amenities")}
    >
      Tài liệu
    </h1>
    <h1
      className={`${styles.titleTab} ${activeView === "houseType" ? styles.titleTabActive : ""}`}
      onClick={() => setActiveView("houseType")}
    >
      Danh sách giá
    </h1>
    <h1
      className={`${styles.titleTab} ${activeView === "note" ? styles.titleTabActive : ""}`}
      onClick={() => setActiveView("note")}
    >
      Đơn hàng
    </h1>
  </Group>



</div>

      {/* Nội dung view */}
      {activeView === "warehouse" &&  <TotalWarehouse projectId={projectId} target={target} />}
  {activeView === "note" &&  <MyOder projectId={projectId}/>}
    </div>
  );
}
