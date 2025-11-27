"use client";

import { useEffect, useState } from "react";
import { Group, Card, Text, SimpleGrid, Loader, ActionIcon, TextInput } from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail"; // import component mới
import {  IconFilter2, IconSearch } from "@tabler/icons-react";

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
  {/* Nhóm icon + search */}
  <Group gap="md">
  <ActionIcon
  variant="outline"
  radius="md"
  size="lg"
  styles={{
    root: {
      borderColor: '#762f0b', // màu viền
      color: '#762f0b',       // màu icon
    },
    icon: {
      color: '#762f0b',       // đảm bảo icon cũng đổi màu
    },
  }}
>
  <IconFilter2 size={20} />
</ActionIcon>

    <TextInput
      placeholder="Tìm kiếm...."
      leftSection={<IconSearch size={16} color="#762f0b" />}
      style={{ width: 240 }}
    />
  </Group>

  {/* Nhóm các nút trạng thái */}
 <Group gap="sm" style={{ marginTop: 16 }}>
  <button style={{ backgroundColor: '#c99945', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 20 }}>
    Quan tâm
  </button>
  <button style={{ backgroundColor: '#3d6985', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 20 }}>
    Đang bán
  </button>
  <button style={{ backgroundColor: '#e56a3e', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 20 }}>
    Đã đặt cọc
  </button>
  <button style={{ backgroundColor: '#d73a24', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 20 }}>
    Đã bán
  </button>
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
            onClick={() => setSelectedItem(item)}
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
