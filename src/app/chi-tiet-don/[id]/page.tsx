import React from "react";
import { Metadata } from "next";

import OrderDetailPage from "../../../../components/OrderDetail";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng | T&T Group",
  description: "Thông tin chi tiết đơn hàng trong hệ thống T&T Group",
};

export default function OrderDetail() {
  return (
    <>
      <OrderDetailPage />
    </>
  );
}
