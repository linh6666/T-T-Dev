// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Constructiondetails";

export default function InteractiveClient() {
  // 🔹 Lấy project_id, subzone_vi, building_type_vi, model_building_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const layer4 = searchParams.get("layer4"); // ← subzone_vi được truyền từ Menu
  const layer3 = searchParams.get("layer3"); // ✅ thêm dòng này
  const layer2 = searchParams.get("layer2"); // Thêm dòng này

  // 🔹 Kiểm tra dữ liệu bắt buộc
  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!layer4) return <div>Không có layer4 trong URL</div>;
  if (!layer3) return <div>Không có layer3 trong URL</div>;
  if (!layer2) return <div>Không có layer2 trong URL</div>; // Kiểm tra model_building_vi

  // 🔹 Truyền cả 4 giá trị vào component ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      subzone_vi={layer4}
      building_type_vi={layer3} // ✅ truyền thêm vào đây
      model_building_vi={layer2} // Truyền thêm model_building_vi vào đây
    />
  );
}