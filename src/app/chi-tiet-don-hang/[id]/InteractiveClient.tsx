"use client";

import { useParams, useSearchParams } from "next/navigation";
import OrderDetailPage from "../../../../components/OrderDetail";

export default function InteractiveClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const projectId = searchParams.get("project_id");

  if (!projectId) {
    return <div>Không có project_id trong URL</div>;
  }

  return <OrderDetailPage orderId={id} projectId={projectId} />;
}
