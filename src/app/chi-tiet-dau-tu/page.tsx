import React from "react";
import { Metadata } from "next";

import ZoningSystem from "../../../components/InvestmentDetails";
export const metadata: Metadata = {
  title: "Chi tiết đầu tư",
  description: "Tìm hiểu về chi tiết đầu tư trong dự án bất động sản của chúng tôi.",
};

export default function Interactive() {
  
  return (
    <>
      <ZoningSystem />
    </>
  );
}