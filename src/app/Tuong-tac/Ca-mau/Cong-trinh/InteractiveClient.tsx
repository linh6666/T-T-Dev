// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Construction";

export default function InteractiveClient() {
  // Lấy project_id và phase_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const layer5 = searchParams.get("layer5");
   const layer4 = searchParams.get("layer4");
   const layer3 = searchParams.get("layer3");



    // ← phase_vi được truyền từ Menu

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!layer5) return <div>Không có phase trong URL</div>;
    if (!layer4) return <div>Không có phase trong URL</div>;
        if (!layer3) return <div>Không có phase trong URL</div>;

  // Truyền cả project_id và phase vào component ZoningSystem
  return <ZoningSystem project_id={project_id} phase={layer5} layer4={layer4} layer3={layer3}/>;
}
