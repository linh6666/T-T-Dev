"use client";

import { Suspense } from "react";
import MillenniaCityLayoutClient from "./MillenniaCityLayoutClient";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <MillenniaCityLayoutClient>{children}</MillenniaCityLayoutClient>
    </Suspense>
  );
}

