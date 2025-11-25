import React from "react";
import { Metadata } from "next";
import Managent from "../../../../../components/Warehouse";

export const metadata: Metadata = {
  title: "Kho hàng T&T Homes",
  description: "Quản lý kho hàng về T&T Homes",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function QuanLyBanHangPage({ params }: PageProps) {
  const { id } = params; // đây chính là project.id

  return (
    <>
      <Managent projectId={id} />
    </>
  );
}