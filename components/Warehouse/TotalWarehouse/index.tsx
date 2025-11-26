"use client";

import { useEffect, useState } from "react";
import { Group, MultiSelect, Card, Text, SimpleGrid, Loader } from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail"; // import component mới

interface TotalWarehouseProps {
  projectId: string;
  target?: string; 
}

export interface WarehouseItem {
  id: string;
  unit_code: string;
  layer6:string;
  layer3:string;
  color: string;
  zone: string;
  status_unit:string;
  building_type: string;
  description_vi:string;
  bedroom: number;
  bathroom: number;
  direction: string;
  price: number;
}

export default function TotalWarehouse({ projectId }: TotalWarehouseProps) {
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null); // state item chọn

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

        const res = await createWarehouse(projectId, body);
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

  // Nếu có item được chọn → hiển thị WarehouseDetail
  if (selectedItem) {
    return <WarehouseDetail
  item={selectedItem}
  projectId={projectId} // thêm projectId
  onBack={() => setSelectedItem(null)}
/>;
  }

  return (
    <>
      {/* --- Bộ lọc --- */}
      <div style={{ paddingTop: "20px" }}>
        <Group gap="xs">
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
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedItem(item)} // nhấp chọn item
              >
                <Text fw={700} mb={8} style={{ fontSize: "15px" }} ta="center">
                  {item.unit_code}
                </Text>
                <Text style={{ fontSize: "13px" }}>Phân khu: {item.layer6}</Text>
                <Text style={{ fontSize: "13px" }}>Loại công trình: {item.layer3}</Text>
                <Text style={{ fontSize: "13px" }}>Phòng ngủ: {item.bedroom}</Text>
                <Text style={{ fontSize: "13px" }}>Phòng tắm: {item.bathroom}</Text>
                <Text style={{ fontSize: "13px" }}>Hướng: {item.direction}</Text>
                <Text style={{ fontSize: "13px" }}>Trạng thái: {item.status_unit}</Text>
              </Card>
            ))}
        </SimpleGrid>
      </div>
    </>
  );
}
