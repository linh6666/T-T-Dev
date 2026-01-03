import React from "react";
import { Metadata } from "next";

import PageInteract from "../../../components/Favourite";
export const metadata: Metadata = {
  title: "Trang yêu thích T&T Group",
  description: "Trang yêu thích về T&T Group",
};

export default function 
favourite() {
  
  return (
    <>
      <PageInteract/>
    </>
  );
}