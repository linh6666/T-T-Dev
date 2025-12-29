"use client";

import { Image, Modal, Text } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { createNodeAttribute } from "../../../api/apifilter3";
import { useSearchParams } from "next/navigation";
import { Getlisthome } from "../../../api/apiGetListHome";

// Interface cho dữ liệu từ createNodeAttribute
export interface NodeAttributeItem {
  id: string;
  unit_code: string;
  layer1?: string;
  layer2?: string;
  layer3?: string;
  zone?: string;
  building_type?: string;
  bedroom?: number | string;
  bathroom?: number | string;
  view?: string;
  status_unit?: string;
  price?: number;
  describe?: string;
  describe_vi?: string;
  main_door_direction?: string;
  balcony_direction?: string;
  direction?: string;
  url?: string;
  name_vi?: string;
  name_en?: string;
  description_en?: string;
}

// Interface cho dữ liệu từ Getlisthome
export interface HomeDetailItem {
  id: string;
  unit_code: string;
  name_vi?: string;
  name_en?: string;
  describe_vi?: string;
  description_en?: string;
  url?: string;
  direction?: string;
  bedroom?: number;
  bathroom?: string;
  price?: number;
}

interface InfoModalProps {
  opened: boolean;
  onClose: () => void;
  clickedModel: string | null;
  projectId: string | null;
  initialPhase?: string | null;
  initialLayer2?: string | null;
}

export default function InfoModal({
  opened,
  onClose,
  clickedModel,
  projectId,
  initialPhase,
  initialLayer2,
}: InfoModalProps) {
  const searchParams = useSearchParams();

  const phaseValue = searchParams.get("layer3") || initialPhase || "";
  const valuelayer2 = searchParams.get("layer2") || initialLayer2 || "";

  const [phase] = useState<string>(phaseValue);
  const [layer2] = useState<string>(valuelayer2);
  const [apiData, setApiData] = useState<NodeAttributeItem[]>([]);
  const [homeData, setHomeData] = useState<HomeDetailItem[]>([]);
  const [index, setIndex] = useState(0);

  // Hàm gọi API createNodeAttribute
  const fetchNodeData = useCallback(async () => {
    if (!projectId) return;
    try {
      const data = await createNodeAttribute({
        project_id: projectId,
        filters: [
          { values: ["ct"] },
          { label: "layer3", values: [phase] },
          { label: "layer2", values: [layer2] },
        ],
      });

      if (Array.isArray(data)) {
        setApiData(data as NodeAttributeItem[]);
      } else if (Array.isArray(data?.data)) {
        setApiData(data.data as NodeAttributeItem[]);
      } else {
        setApiData([]);
      }
      setIndex(0);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API createNodeAttribute:", error);
      setApiData([]);
    }
  }, [projectId, phase, layer2]);

  // Hàm gọi API Getlisthome
  const fetchHomeData = useCallback(async () => {
    if (!projectId || !clickedModel) return;
    try {
      const response = await Getlisthome({
        project_id: projectId,
        unit_code: clickedModel,
      });
      setHomeData(response as HomeDetailItem[]);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API Getlisthome:", error);
      setHomeData([]);
    }
  }, [projectId, clickedModel]);

  useEffect(() => {
    if (opened) {
      fetchNodeData();
      fetchHomeData();
    }
  }, [opened, fetchNodeData, fetchHomeData]);

  // Lọc dữ liệu theo clickedModel
  const filteredData = Array.isArray(apiData)
    ? apiData.filter((item) => item.layer1 === clickedModel)
    : [];

  // Tách ảnh và PDF
  const imageData = filteredData.filter((item) =>
    item.url?.match(/\.(jpg|jpeg|png|gif)$/i)
  );
  const pdfData = filteredData.filter((item) => item.url?.match(/\.pdf$/i));

  const current = imageData[index];

  const goNext = () => {
    if (index < imageData.length - 1) setIndex(index + 1);
  };
  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Thông Tin Chi Tiết" size="70%">
      {filteredData.length > 0 ? (
        filteredData.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: "20px", height: "80vh" }}>
            {/* Cột trái */}
            <div style={{ flex: 1 }}>
              <Text fw={700} mb={12} style={{ fontSize: "18px" }}>
                Chi tiết căn hộ: {item.unit_code}
              </Text>
              <Text style={{ fontSize: "15px" }}>Tòa: {item.layer3}</Text>
              <Text style={{ fontSize: "15px" }}>
                {item.building_type
                  ? `Loại công trình: ${item.building_type}`
                  : `Vị trí: ${item.layer2}`}
              </Text>
              <Text style={{ fontSize: "15px" }}>Phòng ngủ: {item.bedroom}</Text>
              <Text style={{ fontSize: "13px" }}>
                Phòng tắm:{" "}
                {item.bathroom?.toString().trim().toLowerCase() === "skip"
                  ? "chưa có"
                  : item.bathroom}
              </Text>
              <Text style={{ fontSize: "15px" }}>Cảnh quang: {item.view}</Text>
              <Text style={{ fontSize: "15px" }}>Trạng thái: {item.status_unit}</Text>
              <Text style={{ fontSize: "15px" }}>
                Giá: {item.price ? item.price.toLocaleString() + "đ" : "Chưa có"}
              </Text>
              <Text>
                <b>Mô tả:</b> {item.describe_vi || item.describe}
              </Text>

              {/* Hiển thị dữ liệu từ Getlisthome */}
              {homeData.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <Text fw={600}>Thông tin bổ sung từ Getlisthome:</Text>
                  {homeData.map((h) => (
                    <Text key={h.id}>👉 {h.name_vi || h.name_en}</Text>
                  ))}
                </div>
              )}

              {/* Hiển thị PDF */}
              {pdfData.map((pdf) => (
                <div key={pdf.id} style={{ marginTop: "10px" }}>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    Xem tài liệu: {pdf.name_vi || pdf.name_en || pdf.id}
                  </a>
                </div>
              ))}
            </div>

            {/* Cột phải: slider ảnh */}
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
                    src={current.url || ""}
                    alt={current.description_en || ""}
                    width={800}
                    height={600}
                    style={{ borderRadius: "8px", maxWidth: "100%", height: "auto" }}
                  />
                  <button
                    onClick={goPrev}
                    disabled={index === 0}
                    style={{ position: "absolute", top: "50%", left: "10px" }}
                  >
                    ◀
                  </button>
                  <button
                    onClick={goNext}
                    disabled={index === imageData.length - 1}
                    style={{ position: "absolute", top: "50%", right: "10px" }}
                  >
                    ▶
                  </button>
                </div>
              )}
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {imageData.map((img, i) => (
                  <div
                    key={img.id}
                    onClick={() => setIndex(i)}
                    style={{
                      border: i === index ? "2px solid blue" : "1px solid #ccc",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    <Image
                      src={img.url || ""}
                      alt={img.description_en || ""}
                      width={80}
                      height={60}
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <Text>Không có dữ liệu phù hợp</Text>
      )}
    </Modal>
  );
}

