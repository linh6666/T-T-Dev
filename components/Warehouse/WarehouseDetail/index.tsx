"use client";
import { useEffect, useState } from "react";
import { Text, Button, Image } from "@mantine/core";
import { IconArrowLeft, IconClipboardText } from "@tabler/icons-react";
import { Getlisthome } from "../../../api/apiGetListHome";
import styles from "./App.module.css";
import { AxiosError } from "axios";

export interface WarehouseItem {
  id: string;
  unit_code: string;
  color: string;
  zone: string;
  building_type: string;
  layer6:string;
  layer3:string;
  description_vi:string;
  status_unit:string;
  bedroom: number;
  bathroom: number;
  direction: string;
  price: number;
}

interface WarehouseDetailProps {
  item: WarehouseItem;
   projectId: string;
  onBack: () => void;
}
export interface WarehouseItemdeltall {
  unit_code: string;
  name_vi: string;
  name_en: string;
  description_vi: string;
  description_en: string;
  url: string;
  id: string;
  direction?: string;
  bedroom?: number;
  bathroom?: number;
  price?: number;
}


export default function WarehouseDetail({ item, onBack , projectId,}: WarehouseDetailProps)
 {
  const [data, setData] = useState<WarehouseItemdeltall[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const [index, setIndex] = useState(0);

  const imageData = data.filter(item => item.url.match(/\.(jpg|jpeg|png|gif)$/i));
  const pdfData = data.filter(item => item.url.match(/\.pdf$/i));
 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!projectId || !item.unit_code) {
        setError("Project ID hoặc Unit Code không hợp lệ");
        return;
      }

      const response = await Getlisthome({ 
        project_id: projectId, 
        unit_code: item.unit_code 
      });

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
}, [item, projectId]);
 // item thay vì unit_code

 
  const goNext = () => {
    if (index < imageData.length - 1) setIndex(index + 1);
  };

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const current = imageData[index];

  return (
    <div className={styles.container}style={{ padding: "20px" }}>
      {/* Nút quay lại */}
      <Button
        onClick={onBack}
        variant="light"
        leftSection={<IconArrowLeft />}
        style={{ marginBottom: "20px" }}
      >
        Quay lại
      </Button>
       {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Card hiển thị chi tiết */}
      {/* <Card shadow="md" radius="lg" padding="lg">
        <Text fw={700} mb={12} style={{ fontSize: "18px" }}>
          Chi tiết căn hộ: {item.unit_code}
        </Text>
        <Text style={{ fontSize: "15px" }}>Phân khu: {item.zone}</Text>
        <Text style={{ fontSize: "15px" }}>Loại công trình: {item.building_type}</Text>
        <Text style={{ fontSize: "15px" }}>Phòng ngủ: {item.bedroom}</Text>
        <Text style={{ fontSize: "15px" }}>Phòng tắm: {item.bathroom}</Text>
        <Text style={{ fontSize: "15px" }}>Hướng: {item.direction}</Text>
              <Text style={{ fontSize: "15px" }}>Trạng thái: {item.status_unit}</Text>
        <Text style={{ fontSize: "15px" }}>
          Giá: {item.price ? item.price.toLocaleString() + "đ" : "Chưa có"}
        </Text>
          <Text>
                  <b>Mô tả:</b> {item.description_vi}
                </Text>
           {pdfData.map(pdf => (
              <div key={pdf.id} style={{ marginTop: "10px" }}>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", textDecoration: "underline" }}
                >
                  <IconClipboardText /> Xem tài liệu: {pdf.name_vi || pdf.name_en || pdf.id}
                </a>
              </div>
            ))}
      </Card> */}
        <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
               {/* Cột trái */}
               <div style={{ flex: 1 }}>
                 {/* Lấy dữ liệu từ item đầu tiên */}
                 
                   <>
                     <Text fw={700} mb={12} style={{ fontSize: "18px" }}>
          Chi tiết căn hộ: {item.unit_code}
        </Text>
        <Text style={{ fontSize: "15px" }}>Phân khu: {item.layer6}</Text>
        <Text style={{ fontSize: "15px" }}>Loại công trình: {item.layer3}</Text>
        <Text style={{ fontSize: "15px" }}>Phòng ngủ: {item.bedroom}</Text>
        <Text style={{ fontSize: "15px" }}>Phòng tắm: {item.bathroom}</Text>
        <Text style={{ fontSize: "15px" }}>Hướng: {item.direction}</Text>
              <Text style={{ fontSize: "15px" }}>Trạng thái: {item.status_unit}</Text>
        <Text style={{ fontSize: "15px" }}>
          Giá: {item.price ? item.price.toLocaleString() + "đ" : "Chưa có"}
        </Text>
          <Text>
                  <b>Mô tả:</b> {item.description_vi}
                </Text>
                   </>
              
     
                 {/* Hiển thị PDF */}
                 {pdfData.map(pdf => (
                   <div key={pdf.id} style={{ marginTop: "10px" }}>
                     <a
                       href={pdf.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       style={{ display: "flex", textDecoration: "underline" }}
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
     
                 {/* Thumbnail gallery */}
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
    </div>
  );
}

