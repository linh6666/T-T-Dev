import React from "react";
import { Metadata } from "next";
import { Suspense } from "react";

import  PdfViewer from "../../../../../components/InstructionsModel copy";
export const metadata: Metadata = {
  title: "Hướng dẫn Mô hình Phước Thọ",
  description: "Hướng dẫn về Mô hình Phước Thọ",
};

export default function Viewer() {
  
  return (
     <Suspense fallback={<div>Đang tải...</div>}>
      <PdfViewer />
    </Suspense>
  );
}