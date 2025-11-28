"use client";

import { useEffect, useState } from "react";
import { Group, Card, Text, SimpleGrid, Loader, ActionIcon, TextInput, MultiSelect } from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail"; 
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { Pagination } from 'antd';
// import 'antd/dist/reset.css';

interface TotalWarehouseProps {
  projectId: string;
  target?: string; 
}

export interface WarehouseItem {
  id: string;
  unit_code: string;
  layer6: string;
  layer3: string;
  color: string;
  zone: string;
  status_unit: string;
  building_type: string;
  description_vi: string;
  bedroom: number;
  bathroom: number;
  direction: string;
  price: number;
}

export default function TotalWarehouse({ projectId }: TotalWarehouseProps) {
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null); 
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // --- Pagination state ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // --- Fetch data ---
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const body = {
          project_id: projectId,
          filters: [{ label: "type_info", values: ["bh"] }],
        };
        const res = await createWarehouse(projectId, body);
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

  // --- Loading ---
  if (loading) {
    return <Loader style={{ marginTop: 50, display: "block" }} />;
  }

  // --- Detail view ---
  if (selectedItem) {
    return (
      <WarehouseDetail
        item={selectedItem}
        projectId={projectId}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  // --- Pagination calculation ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: "flex" }}>
      {/* --- Sidebar bên trái --- */}
      {showFilterSidebar && (
        <div
          style={{
            backgroundColor: "#f7f7f7",
            padding: 20,
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
            width: 300,
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "20px" }}>
            Bộ lọc sản phẩm
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <MultiSelect
              label="Phân Khu"
              placeholder="Chọn phân khu"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <MultiSelect
              label="Loại công trình"
              placeholder="Chọn loại công trình"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <MultiSelect
              label="Hướng"
              placeholder="Chọn hướng"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
          </div>

          {/* Số lượng tầng, Phòng ngủ, Phòng tắm */}
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
            {["Số lượng tầng", "Phòng ngủ", "Phòng tắm"].map((label, idx) => (
              <div key={idx}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{label}</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #762f0b",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        color: "#762f0b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Nội dung chính --- */}
      <div style={{ flex: 1, padding: 20 }}>
        {/* Header: icon filter + search + trạng thái */}
        <div>
          <Group gap="md">
            <ActionIcon
              variant="outline"
              radius="md"
              size="lg"
              styles={{
                root: { borderColor: "#762f0b", color: "#762f0b" },
                icon: { color: "#762f0b" },
              }}
              onClick={() => setShowFilterSidebar(prev => !prev)}
            >
              <IconFilter2 size={20} />
            </ActionIcon>

            <TextInput
              placeholder="Tìm kiếm...."
              leftSection={<IconSearch size={16} color="#762f0b" />}
              style={{ width: 240 }}
            />
          </Group>

          <Group gap="sm" style={{ marginTop: 16 }}>
            <button style={{ backgroundColor: "#c99945", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 20 }}>Quan tâm</button>
            <button style={{ backgroundColor: "#3d6985", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 20 }}>Đang bán</button>
            <button style={{ backgroundColor: "#e56a3e", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 20 }}>Đã đặt cọc</button>
            <button style={{ backgroundColor: "#d73a24", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 20 }}>Đã bán</button>
          </Group>
        </div>

        {/* Danh sách card */}
        <div className={styles.container}>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: showFilterSidebar ? 4 : 5 }}
            spacing="xl"
          >
            {currentItems.map((item) => (
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

        {/* --- Ant Design Pagination --- */}
      <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', padding: '10px 0', zIndex: 10, display: 'flex', justifyContent: 'flex-end' }}>
  <Pagination
    current={currentPage}
    pageSize={itemsPerPage}
    total={items.length}
    onChange={(page) => setCurrentPage(page)}
    showSizeChanger={false}
    // showQuickJumper
  />
</div>
      </div>
    </div>
  );
}

