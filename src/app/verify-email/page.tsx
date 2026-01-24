import React from "react";
import PageContact from "../../../components/VerifyEmail";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Xác thực",
  description: "Xác thực ",
};


export default function ResePassword() {
  return (
    <>
     <Suspense fallback={<div>Đang tải...</div>}>

     <PageContact />
     </Suspense>
      
    </>
  );
}
