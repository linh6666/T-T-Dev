// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Detail";

export default function InteractiveClient() {
  // Lấy project_id và phase_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const phase = searchParams.get("phase"); // ← phase_vi được truyền từ Menu

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!phase) return <div>Không có phase trong URL</div>;

  // Truyền cả project_id và phase vào component ZoningSystem
  return <ZoningSystem project_id={project_id} phase={phase} />;
}
