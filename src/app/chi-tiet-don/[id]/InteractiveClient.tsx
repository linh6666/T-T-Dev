"use client";

import { useSearchParams } from "next/navigation";
import OrderDetailPage from "../../../../components/OrderDetail";

export default function InteractiveClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project_id");

  if (!projectId) {
    return <div>Không có project_id trong URL</div>;
  }

  return <OrderDetailPage projectId={projectId} />;
}
