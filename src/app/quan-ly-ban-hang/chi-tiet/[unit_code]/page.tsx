"use client";

import { useParams, useRouter } from "next/navigation";
import WarehouseDetail from "../../../../../components/Warehouse/WarehouseDetail";

export default function WarehouseDetailPage() {
  const { unit_code } = useParams();
  const router = useRouter();

  // Ép kiểu unit_code về string
  const unitCodeStr = Array.isArray(unit_code) ? unit_code[0] : unit_code || "";

  

  return (
    <WarehouseDetail
      unit_code={unitCodeStr}
      onBack={() => router.back()}
    />
  );
}
