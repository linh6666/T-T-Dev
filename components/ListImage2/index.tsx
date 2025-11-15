"use client";

import { useState } from "react";
import { Image, SimpleGrid, Modal, Group, Button } from "@mantine/core";
import style from "./listimage.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const images = [
  "/Phuoc-tho/0. TONG THE SANG.jpg",
  "/Phuoc-tho/0. TONG THE TOI.jpg",
   "/Phuoc-tho/1_M1-1 copy.jpg",
    "/Phuoc-tho/1_M1-2 copy.jpg",
     "/Phuoc-tho/1_M1-3 copy.jpg",
      "/Phuoc-tho/1_M3-1 copy.jpg",
       "/Phuoc-tho/1_M3-2 copy.jpg",
        "/Phuoc-tho/1_M3-3 copy.jpg",
         "/Phuoc-tho/1_M3-4 copy.jpg",
          "/Phuoc-tho/1_M5-1 copy.jpg",
           "/Phuoc-tho/1_M5-2 copy.jpg",
            "/Phuoc-tho/1_M5-3 copy.jpg",
             "/Phuoc-tho/1. TONG THE SANG 1.jpg",
              "/Phuoc-tho/1. TONG THE SANG 2.jpg",
               "/Phuoc-tho/1. TONG THE SANG 3.jpg",
                "/Phuoc-tho/2. TONG THE KHU 1.jpg",
                 "/Phuoc-tho/2. TONG THE KHU 2.jpg",
                  "/Phuoc-tho/2. TONG THE KHU 3.jpg",
                   "/Phuoc-tho/3. LK 1.jpg",
                    "/Phuoc-tho/3. LK 2.jpg",
                     "/Phuoc-tho/3. LK 3.jpg",
                      "/Phuoc-tho/3. LK 4.jpg",
                       "/Phuoc-tho/3. LK 5.jpg",
                        "/Phuoc-tho/4. SH 1.jpg",
                         "/Phuoc-tho/4. SH 2.jpg",
             "/Phuoc-tho/4. SH 3.jpg",
              "/Phuoc-tho/4. SH 4.jpg",
               "/Phuoc-tho/5. BT 1.jpg",
                "/Phuoc-tho/5. BT 2.jpg",
                 "/Phuoc-tho/5. BT 3.jpg",
                  "/Phuoc-tho/5. BT 4.jpg",
                   "/Phuoc-tho/5. BT 5.jpg",
                    "/Phuoc-tho/5. BT 6.jpg",
                     "/Phuoc-tho/5. BT 7.jpg",
                      "/Phuoc-tho/5. BT 8.jpg",
                       "/Phuoc-tho/5. BT 9.jpg",
                        "/Phuoc-tho/5. BT 10.jpg",
                         "/Phuoc-tho/5. BT 11.jpg",
             "/Phuoc-tho/5. BT 12.jpg",
              "/Phuoc-tho/5. BT 13.jpg",
               "/Phuoc-tho/5. BT 14.jpg",
                "/Phuoc-tho/6. CONG VIEN 1.jpg",
                 "/Phuoc-tho/6. CONG VIEN 2.jpg",
                  "/Phuoc-tho/6. CONG VIEN XANH.jpg",
                   "/Phuoc-tho/6. KS 1.jpg",
                    "/Phuoc-tho/6. KS 2.jpg",
                     "/Phuoc-tho/6. KS 3.jpg",
                      "/Phuoc-tho/6. MAU GIAO.jpg",
                       "/Phuoc-tho/SH1_1.jpg",
                        "/Phuoc-tho/SH1_2.jpg",
                         "/Phuoc-tho/SH1_5.jpg",
                       "/Phuoc-tho/SH1_6.jpg",
                        "/Phuoc-tho/SH1_7.jpg",
                      
 
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
    onClick={() => router.push(`/Tuong-tac/Phuoc-tho/?id=${project_id}`)}
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