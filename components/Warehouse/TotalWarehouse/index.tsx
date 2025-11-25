"use client";

import { useEffect, useState } from "react";
import { Group, MultiSelect, Card, Text, SimpleGrid, Loader } from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail"; // đường dẫn tùy project

interface TotalWarehouseProps {
  projectId: string;
}

export interface WarehouseItem {
  id: string;
  unit_code: string;
  color: string;
  zone: string;
  building_type: string;
  bedroom: number;
  bathroom: number;
  direction: string;
  price: number;
}

export default function TotalWarehouse({ projectId }: TotalWarehouseProps) {
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const body = {
          project_id: projectId,
          filters: [
            {
              label: "type_info",
              values: ["bh"],
            },
          ],
        };

        const res = await createWarehouse(body);
        console.log("API response:", res);

        const warehouseList = Array.isArray(res) ? res : res.data || [];
        setItems(warehouseList);
      } catch (error) {
        console.error("Failed to fetch warehouse data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [projectId]);

  if (loading) {
    return <Loader style={{ marginTop: 50, display: "block" }} />;
  }

  // --- Nếu có kho được chọn, hiển thị màn hình chi tiết ---
  if (selectedWarehouse) {
    return (
      <WarehouseDetail
       unit_code={selectedWarehouse.unit_code}
    zone={selectedWarehouse.zone}
    building_type={selectedWarehouse.building_type}
    bedroom={selectedWarehouse.bedroom}
    bathroom={selectedWarehouse.bathroom}
    direction={selectedWarehouse.direction}
    price={selectedWarehouse.price}
    onBack={() => setSelectedWarehouse(null)}
      />
    );
  }

  return (
    <>
      {/* --- Bộ lọc --- */}
      <div style={{ paddingTop: "20px" }}>
        <Group gap="xs">
          <MultiSelect placeholder="Phân khu" data={["A", "B", "C"]} searchable />
          <MultiSelect placeholder="Loại công trình" data={["Shophouse", "Biệt thự"]} searchable />
          <MultiSelect placeholder="Hướng nhà" data={["Nam", "Bắc", "Tây", "Đông"]} searchable />
          <MultiSelect placeholder="Phòng ngủ" data={["1", "2", "3", "4"]} searchable />
          <MultiSelect placeholder="Phòng tắm" data={["1", "2", "3"]} searchable />
        </Group>
      </div>

      {/* --- Danh sách card --- */}
      <div className={styles.container}>
        <SimpleGrid cols={5} spacing="xl">
          {Array.isArray(items) &&
            items.map((item) => (
              <Card
                key={item.id}
                shadow="md"
                radius="lg"
                className={styles.card}
                onClick={() => setSelectedWarehouse(item)}
                style={{ cursor: "pointer" }}
              >
                <Text fw={700} mb={8} style={{ fontSize: "15px" }} ta="center">
                  {item.unit_code}
                </Text>
                <Text style={{ fontSize: "13px" }}>Phân khu: {item.zone}</Text>
                <Text style={{ fontSize: "13px" }}>Loại công trình: {item.building_type}</Text>
                <Text style={{ fontSize: "13px" }}>Phòng ngủ: {item.bedroom}</Text>
                <Text style={{ fontSize: "13px" }}>Phòng tắm: {item.bathroom}</Text>
                <Text style={{ fontSize: "13px" }}>Hướng: {item.direction}</Text>
              </Card>
            ))}
        </SimpleGrid>
      </div>
    </>
  );
}
