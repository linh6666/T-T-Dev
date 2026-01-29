// import type { Metadata } from "next";
import { Suspense } from "react";
import InteractiveClient from "./InteractiveClient";

// export const metadata: Metadata = {
//   title: "Chi tiết đơn hàng | T&T Group",
//   description: "Thông tin chi tiết đơn hàng trong hệ thống T&T Group",
// };

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InteractiveClient />
    </Suspense>
  );
}
