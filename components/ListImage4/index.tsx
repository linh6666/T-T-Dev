"use client";

import { useState } from "react";
import { Image, SimpleGrid, Modal, Group, Button } from "@mantine/core";
import style from "./listimage.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const images = [
  "/Camau/0.jpg",
  "/Camau/1.jpg",
  "/Camau/2.jpg",
  "/Camau/3.jpg",
  "/Camau/4.jpg",
  "/Camau/5.jpg",
  "/Camau/6.jpg",
  "/Camau/7.jpg",
  "/Camau/8.jpg",
  "/Camau/9.jpg",
  "/Camau/10.jpg",
  "/Camau/11.jpg",
  "/Camau/12.jpg",
  "/Camau/13.jpg",
  "/Camau/14.jpg",
  "/Camau/15.jpg",
  "/Camau/16.jpg",
  "/Camau/17.jpg",
  "/Camau/18.jpg",
  "/Camau/19.jpg",
  "/Camau/20.jpg",
  "/Camau/21.jpg",
  "/Camau/22.jpg",
  "/Camau/23.jpg",
  "/Camau/24.jpg",
  "/Camau/BX01_S1_PA1.jpg",
  "/Camau/BX01_S1.jpg",
  "/Camau/BX01_S3_PA2.jpg",
  "/Camau/BX01_S3.jpg",
  "/Camau/CONG CHAO & BIEU TUONG_1 - Photo.jpg",
  "/Camau/CX01 RAIN GARDEN .jpg",
  "/Camau/CX04 WIND GARDEN.jpg",
  "/Camau/CX13 SUNSHINE GARDEN.jpg",
  "/Camau/LD-4.03. T1.jpg",
  "/Camau/MN_PA1_S1.jpg",
  "/Camau/NOXH (1).jpg",
  "/Camau/NOXH (2).jpg",
  "/Camau/NOXH (3).jpg",
  "/Camau/OXH-1A.jpg",
  "/Camau/OXH-1B.jpg",
  "/Camau/OXH-1C.jpg",
  "/Camau/OXH-1D.jpg",
  "/Camau/OXH2.jpg",
  "/Camau/Quang truong hoa 1.jpg",
  "/Camau/Quang truong hoa.jpg",
  "/Camau/QUANG TRUONG NUOC 1.jpg",
  "/Camau/QUANG TRUONG NUOC.jpg",
  "/Camau/SAN CHOI.jpg",
  "/Camau/SLT.jpg",
  "/Camau/TCL_PA1_S1.jpg",
    "/Camau/TCL_PA1_S2.jpg",
    "/Camau/TCL_PA1_S3.jpg",
    "/Camau/TCL_PA1_TT1.jpg",
    "/Camau/TCL_PA1_TT2.jpg",
    "/Camau/TCL_PA1_TT3.jpg",
      "/Camau/TT1_OP1.jpg",
      "/Camau/TT2_OP1.jpg",
      "/Camau/V2_OP1.jpg",
      "/Camau/V3_OP1.jpg",
      "/Camau/V4.jpg",
       "/Camau/V5.jpg",
        "/Camau/V6_OP1.jpg",














  

  









];
interface ListImageProps {
  project_id: string | null;
}

export default function ListImage({ project_id }: ListImageProps) {
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpened(true);
  };

  return (
    <div className={style.box}>
      {/* Modal hiển thị ảnh lớn */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="70%"
        withCloseButton
      >
        {selectedImage && (
          <div style={{ textAlign: "center" }}>
            <Image
              src={selectedImage}
              alt="Selected"
              fit="contain"
              style={{
                maxHeight: "60vh",
                margin: "0 auto 20px",
              }}
            />
          </div>
        )}

        {/* Thumbnail nhỏ bên dưới */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginTop: "10px",
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`thumb-${index}`}
              onClick={() => setSelectedImage(src)}
              style={{
                height: "60px",
                cursor: "pointer",
                border:
                  selectedImage === src ? "2px solid red" : "0.5px solid #ccc",
                borderRadius: "5px",
              }}
              loading="lazy"
            />
          ))}
        </div>
      </Modal>

      {/* Hiển thị list ảnh ngoài */}
      <SimpleGrid cols={5} spacing="md">
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              width: "90%",
              height: "120px",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
            onClick={() => handleImageClick(src)}
          >
            <Image
              src={src}
              alt={`image-${index}`}
              fit="cover"
              width="100%"
              height="100%"
              radius="md"
            />
          </div>
        ))}
      </SimpleGrid>

      {/* Nút quay lại và truyền project_id đúng cách */}
   <Group gap="xs" mt="md" justify="flex-end">
  <Button
    onClick={() => router.push(`/Tuong-tac/Times-Square?id=${project_id}`)}
    variant="filled"
    style={{
      width: 30,
      height: 30,
      padding: 0,
      borderRadius: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FFFAEE",
      color: "#752E0B",
      border: "1.5px solid #752E0B",
    }}
  >
    <IconArrowLeft size={18} color="#752E0B" />
  </Button>
</Group>

    </div>
  );
}