"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailHome";

export default function InteractiveClient() {
  const searchParams = useSearchParams();

  // 🔎 Lấy từ URL
  const project_id = searchParams.get("id");
  const phase_vi = searchParams.get("phase");
  const subzone_vi = searchParams.get("subzone_vi");
  const building_type_vi = searchParams.get("building_type_vi"); // ✅ thêm

  // ⚠️ Kiểm tra các tham số bắt buộc
  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!phase_vi) return <div>Không có phase trong URL</div>;
  if (!subzone_vi) return <div>Không có subzone_vi trong URL</div>;
  if (!building_type_vi) return <div>Không có building_type_vi trong URL</div>;

  return (
    <ZoningSystem
      project_id={project_id}
      initialPhase={phase_vi}
      initialSuzone={subzone_vi}
      initialBuildingType={building_type_vi} // ✅ truyền xuống component
    />
  );
}

