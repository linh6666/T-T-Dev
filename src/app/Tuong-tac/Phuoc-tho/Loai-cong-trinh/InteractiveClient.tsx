// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/Subregion";

export default function InteractiveClient() {
  // 🔹 Lấy project_id và subzone_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const subzone_vi = searchParams.get("subzone_vi"); // ← subzone_vi được truyền từ Menu

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!subzone_vi) return <div>Không có subzone_vi trong URL</div>;

  // 🔹 Truyền cả project_id và subzone_vi vào component ZoningSystem
  return <ZoningSystem project_id={project_id} subzone_vi={subzone_vi} />;
}

