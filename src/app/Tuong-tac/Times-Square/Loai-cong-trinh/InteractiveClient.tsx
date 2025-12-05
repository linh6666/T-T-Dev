// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Detail3";

export default function InteractiveClient() {
  // Lấy project_id và phase_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const layer3 = searchParams.get("layer3"); // ← phase_vi được truyền từ Menu

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!layer3) return <div>Không có phase trong URL</div>;

  // Truyền cả project_id và phase vào component ZoningSystem
  return <ZoningSystem project_id={project_id} phase={layer3} />;
}
