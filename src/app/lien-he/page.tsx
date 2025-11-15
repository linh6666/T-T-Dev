import React from "react";
import { Metadata } from "next";

import PageContact from "../../../components/Contact";
export const metadata: Metadata = {
  title: "Liên hệ T&T Group",
  description: "Tìm hiểu về T&T Group",
};

export default function lienhe() {
  
  return (
    <>
      <PageContact/>
    </>
  );
}
