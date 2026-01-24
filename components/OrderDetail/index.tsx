"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);

        // 👉 mock data
        setTimeout(() => {
          setOrder({
            id: orderId,
          });
          setLoading(false);
        }, 500);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [orderId]);

  if (loading) return <div>Đang tải...</div>;
  if (!order) return <div>Không tìm thấy đơn hàng</div>;

  return (
    <div>
      <h1>Chi tiết đơn hàng</h1>
      <p>ID: {order.id}</p>
    </div>
  );
}
