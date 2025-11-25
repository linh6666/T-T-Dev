"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import WarehouseDetail from "../../../../../components/Warehouse/WarehouseDetail";

export default function WarehouseDetailPage() {
  const { unit_code } = useParams(); // dynamic route
  const searchParams = useSearchParams(); // query param
  const router = useRouter();

  // Ép kiểu unit_code về string
  const unitCodeStr = Array.isArray(unit_code) ? unit_code[0] : unit_code || "";

  // Lấy projectId từ query param
  const projectId = searchParams.get("projectId") || "";

  return (
    <WarehouseDetail
      unit_code={unitCodeStr}
      projectId={projectId}   // truyền xuống component
      onBack={() => router.back()}
    />
  );
}
