"use client";

import React, { useState } from "react";
// import { Tabs } from "@mantine/core";
import styles from "./App.module.css";
import TotalWarehouse from "./TotalWarehouse";
import { Group } from "@mantine/core";

interface AppProps {
  projectId: string;
   projectName?: string;
  target?: string;
}

// 💡 Nhận props projectId
export default function Managent({ projectId,target }: AppProps) {
//   const [activeTab, setActiveTab] = useState<string | null>("all"); 
  const [activeView, setActiveView] = useState<string>("warehouse"); // main view

  // giả lập zoneNames để render tab (không gọi API)
//  const router = useRouter();

  return (
    <div className={styles.containerr}>
      {/* Header view */}
     <div className={styles.headerList}>
  {/* Tabs bên trái */}
  <Group  align="center">
    <h1
      className={`${styles.titleTab} ${activeView === "warehouse" ? styles.titleTabActive : ""}`}
      onClick={() => setActiveView("warehouse")}
    >
      Kho hàng
    </h1>
    {/* <h1
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
      Ghi chú
    </h1> */}
  </Group>

  {/* Nút Quay lại bên phải */}
 {/* <Button
    variant="outline"
    color="gray"
    onClick={() => router.push("/project")}
    style={{ marginLeft: "auto" }} // đẩy sang phải
  >
    ← Quay lại
  </Button> */}
{/* <h1
  style={{ marginLeft: "auto", cursor: "pointer", color: "#1c7ed6" }}
onClick={() =>
  router.push(
    `/Thong-tin-san-pham/tong-mat-bang/${projectId}?name=${encodeURIComponent(projectName || "")}`
  )
}
>
  ← Quay lại
</h1> */}

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
