"use client";

import { useEffect, useState } from "react";
import { Getlisthome } from "../../../api/apiGetListHome";
import styles from "./App.module.css";
import { IconArrowLeft, IconClipboardText } from "@tabler/icons-react";
import Image from "next/image";
import { AxiosError } from "axios";
import { Text } from "@mantine/core";

interface WarehouseDetailProps {
  unit_code: string;
  projectId: string;
  onBack: () => void;
}

interface WarehouseItem {
  unit_code: string;
  name_vi: string;
  name_en: string;
  description_vi: string;
  description_en: string;
  url: string;
  id: string;
}

export default function WarehouseDetail({ unit_code,projectId, onBack }: WarehouseDetailProps) {
  const [data, setData] = useState<WarehouseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slider index
  const [index, setIndex] = useState(0);

  // Tách riêng ảnh ra khỏi data
  const imageData = data.filter(item => item.url.match(/\.(jpg|jpeg|png|gif)$/i));
  const pdfData = data.filter(item => item.url.match(/\.pdf$/i));

 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!projectId) {
        setError("Project ID không hợp lệ");
        return;
      }
      const response = await Getlisthome({ project_id: projectId, unit_code });
      setData(response);
      setIndex(0); // reset slider khi đổi căn
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          setError("Không có dữ liệu!");
        } else {
          setError(err.message || "Lỗi khi lấy dữ liệu");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [unit_code, projectId]);

  const goNext = () => {
    if (index < imageData.length - 1) setIndex(index + 1);
  };

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const current = imageData[index];

  return (
    <div className={styles.container} style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        <IconArrowLeft />
      </button>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && (
        <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
          {/* Cột trái */}
          <div style={{ flex: 1 }}>
            <h2>Chi tiết căn hộ: {unit_code}</h2>
           <Text>
  <b>Hướng:</b> Nam
</Text>
<Text>
  <b>Phòng ngủ:</b> 2 phòng
</Text>
<Text>
  <b>Giá:</b> 0đ
</Text>
<Text>
  <b>Mô tả:</b> Căn hộ rộng rãi với thiết kế hiện đại, bao gồm 3 phòng ngủ, 2 phòng tắm, phòng khách và bếp mở. Ban công lớn hướng sáng, tầm nhìn đẹp ra thành phố. Nội thất sang trọng, tiện nghi đầy đủ, thích hợp cho gia đình trẻ hoặc người yêu thích không gian thoáng đãng.
</Text>



            {/* Hiển thị tất cả PDF */}
            {pdfData.map(pdf => (
              <div key={pdf.id} style={{ marginTop: "10px" }}>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    textDecoration: "underline",
                  }}
                >
                  <IconClipboardText /> Xem tài liệu: {pdf.name_vi || pdf.name_en || pdf.id}
                </a>
              </div>
            ))}
          </div>

          {/* Cột phải: SLIDER */}
          <div
            style={{
              flex: 2,
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Hiển thị ảnh hiện tại + nút điều hướng */}
            {current && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <Image
                  src={current.url}
                  alt={current.description_en}
                  width={800}
                  height={600}
                  style={{ maxWidth: "100%", borderRadius: "8px", height: "auto" }}
                />

                {/* Nút Previous */}
                <button
                  onClick={goPrev}
                  disabled={index === 0}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  ◀
                </button>

                {/* Nút Next */}
                <button
                  onClick={goNext}
                  disabled={index === imageData.length - 1}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  ▶
                </button>
              </div>
            )}

            {/* Hiển thị thumbnail gallery */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {imageData.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => setIndex(i)}
                  style={{
                    border: i === index ? "2px solid blue" : "1px solid #ccc",
                    padding: "2px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  <Image
                    src={item.url}
                    alt={item.description_en}
                    width={80}
                    height={60}
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

