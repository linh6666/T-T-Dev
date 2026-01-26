// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Subregion";

export default function InteractiveClient() {
  // 🔹 Lấy project_id và subzone_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const layer4 = searchParams.get("layer4"); // ← subzone_vi được truyền từ Menu

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!layer4) return <div>Không có layer4 trong URL</div>;

  // 🔹 Truyền cả project_id và subzone_vi vào component ZoningSystem
  return <ZoningSystem project_id={project_id} layer4={layer4} />;
}

