"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../../../components/DetailZone";

export default function InteractiveClient() {
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const layer6 = searchParams.get("layer6");                // đúng với URL
  const layer3 = searchParams.get("layer3"); // thay subzone_vi

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!layer6) return <div>Không có layer6 trong URL</div>;
  if (!layer3) return <div>Không có layer3 trong URL</div>;

  return (
    <ZoningSystem
      project_id={project_id}
      initialPhase={layer6}
      initialBuildingType={layer3}   // truyền prop mới
    />
  );
}

