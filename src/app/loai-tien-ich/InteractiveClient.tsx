"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/utility type";

export default function InteractiveClient() {
  const searchParams = useSearchParams();

  // Lấy các giá trị từ URL
  const project_id = searchParams.get("id");
  const building_type_vi = searchParams.get("building_type_vi");
  const model_building_vi = searchParams.get("model_building_vi"); // <-- thêm

  if (!project_id) return <div>Không có project_id trong URL</div>;

  return (
    <ZoningSystem
      project_id={project_id}
      initialBuildingType={building_type_vi}
      initialModelBuilding={model_building_vi} // <-- truyền xuống component
    />
  );
}
