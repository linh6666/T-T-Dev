"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Group,
  Card,
  Text,
  SimpleGrid,
  Loader,
  ActionIcon,
  Autocomplete,
  MultiSelect,
} from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { Pagination } from "antd";

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
  describe_vi: string;
  bedroom: number;
  bathroom: number;
  direction: string;
  price: number;
}

export default function TotalWarehouse({ projectId, target }: TotalWarehouseProps) {
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<{ value: string }[]>([]);
  const [filteredItems, setFilteredItems] = useState<WarehouseItem[]>([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState<string[]>([]);
const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const normalize = (value?: string) => value?.trim().toLowerCase();

  const suggestionMeta = useMemo(() => {
    const map = new Map<string, { zone?: string; building_type?: string }>();
    for (const i of items) {
      map.set(i.unit_code, { zone: i.zone, building_type: i.building_type });
    }
    return map;
  }, [items]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const body = {
          project_id: projectId,
          filters: [{ lable: "type_info", values: ["bh"] }],
        };

        const res = await createWarehouse(projectId as string, body);
        const warehouseList: WarehouseItem[] = Array.isArray(res) ? res : res.data || [];

        const finalList = target
          ? warehouseList.filter(item => {
              if (!item.zone) return false;
              return normalize(item.zone) === normalize(target);
            })
          : warehouseList;

        setItems(finalList);
        setFilteredItems(finalList);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch warehouse data:", error);
        setItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [projectId, target]);

  useEffect(() => {
    handleFilterByBuildingType(); // Gọi hàm lọc khi selectedBuildingTypes thay đổi
  }, [selectedBuildingTypes]);

  const handleFilterByBuildingType = () => {
    if (selectedBuildingTypes.length === 0) {
      setFilteredItems(items); // Reset về tất cả
    } else {
      const filtered = items.filter(item => selectedBuildingTypes.includes(item.building_type));
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  };

  const toggleFilterSidebar = () => {
    setShowFilterSidebar(prev => {
      if (prev) {
        setSelectedBuildingTypes([]); // Reset lựa chọn khi đóng sidebar
      }
      return !prev;
    });
  };

  if (loading) {
    return <Loader style={{ marginTop: 50, display: "block" }} />;
  }

  if (selectedItem) {
    return (
      <WarehouseDetail
        item={selectedItem}
        projectId={projectId}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  const handleInputChange = (value: string) => {
    setSearchText(value);
    if (!value || value.trim().length < 1) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = items
      .filter((item) =>
        `${item.unit_code} ${item.zone} ${item.building_type}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .slice(0, 10)
      .map((item) => ({ value: item.unit_code }));

    setSearchSuggestions(suggestions);
  };

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      `${item.unit_code} ${item.building_type} ${item.zone} ${item.direction}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleFilterStatus = (status?: string) => {
    if (!status) {
      setFilteredItems(items); // Reset về tất cả
    } else {
      const filtered = items.filter(item => item.status_unit === status);
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: "flex" }}>
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
          
          {/* MultiSelect cho building_type */}
          <MultiSelect
            label="Loại công trình"
            placeholder="Chọn loại công trình"
            data={Array.from(new Set(items.map(item => item.building_type)))}
            value={selectedBuildingTypes}
            onChange={setSelectedBuildingTypes}
          />
          
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <MultiSelect
              label="Hướng"
              placeholder="Chọn hướng"
              data={["North", "South", "East", "West"]} // Các hướng mẫu
            />
          </div>

          {/* Số lượng tầng, Phòng ngủ, Phòng tắm */}
          <div
            style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {[,"Phòng ngủ", "Phòng tắm"].map((label, idx) => (
              <div key={idx}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  {label}
                </label>
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
      <div style={{ flex: 1, padding: 20 }}>
        {/* Header */}
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
              onClick={toggleFilterSidebar}
            >
              <IconFilter2 size={20} />
            </ActionIcon>

            {/* Autocomplete search */}
            <Autocomplete
              placeholder="Tìm kiếm...."
              value={searchText}
              data={searchSuggestions}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              leftSection={
                <IconSearch
                  onClick={handleSearch}
                  size={16}
                  color="#762f0b"
                  style={{ cursor: "pointer" }}
                />
              }
              renderOption={({ option }) => {
                const meta = suggestionMeta.get(option.value);
                return (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>{option.value}</strong>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {meta?.zone ?? "—"} • {meta?.building_type ?? "—"}
                    </span>
                  </div>
                );
              }}
              styles={{
                input: { paddingLeft: 36 },
              }}
              style={{ width: 300 }}
            />
          </Group>

          {/* Status buttons */}
 <Group gap="sm" style={{ marginTop: 16 }}>
  <button
    style={{
      backgroundColor: activeStatus === "Quan tâm" ? "#b8893c" : "#c99945",
      color: "#fff",
      padding: "8px 16px",
      border: activeStatus === "Quan tâm" ? "2px solid #000" : "none",
      borderRadius: 20,
    }}
    onClick={() => {
      const status = "Quan tâm";
      setActiveStatus(activeStatus === status ? null : status);
      handleFilterStatus(status);
    }}
  >
    Quan tâm
  </button>

  <button
    style={{
      backgroundColor: activeStatus === "Đang bán" ? "#2f566d" : "#3d6985",
      color: "#fff",
      padding: "8px 16px",
      border: activeStatus === "Đang bán" ? "2px solid #000" : "none",
      borderRadius: 20,
    }}
    onClick={() => {
      const status = "Đang bán";
      setActiveStatus(activeStatus === status ? null : status);
      handleFilterStatus(status);
    }}
  >
    Đang bán
  </button>

  <button
    style={{
      backgroundColor: activeStatus === "Đã đặt cọc" ? "#cc5c34" : "#e56a3e",
      color: "#fff",
      padding: "8px 16px",
      border: activeStatus === "Đã đặt cọc" ? "2px solid #000" : "none",
      borderRadius: 20,
    }}
    onClick={() => {
      const status = "Đã đặt cọc";
      setActiveStatus(activeStatus === status ? null : status);
      handleFilterStatus(status);
    }}
  >
    Đã đặt cọc
  </button>

  <button
    style={{
      backgroundColor: activeStatus === "Đã bán" ? "#b32f1f" : "#d73a24",
      color: "#fff",
      padding: "8px 16px",
      border: activeStatus === "Đã bán" ? "2px solid #000" : "none",
      borderRadius: 20,
    }}
    onClick={() => {
      const status = "Đã bán";
      setActiveStatus(activeStatus === status ? null : status);
      handleFilterStatus(status);
    }}
  >
    Đã bán
  </button>
</Group>

        </div>

        {/* List cards */}
        <div className={styles.container}>
          {currentItems.length === 0 ? (
            <Text ta="center" style={{ marginTop: 20, fontSize: "14px", color: "#888" }}>
              Không có dữ liệu
            </Text>
          ) : (
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
                  <Text style={{ fontSize: "13px" }}>Phân khu: {item.zone}</Text>
                  <Text style={{ fontSize: "13px" }}>Loại công trình: {item.building_type}</Text>
                  <Text style={{ fontSize: "13px" }}>Phòng ngủ: {item.bedroom}</Text>
                  <Text style={{ fontSize: "13px" }}>Phòng tắm: {item.bathroom}</Text>
                  <Text style={{ fontSize: "13px" }}>Hướng: {item.direction}</Text>
                  <Text style={{ fontSize: "13px" }}>Trạng thái: {item.status_unit}</Text>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </div>

        {/* Pagination */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            padding: "10px 0",
            zIndex: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredItems.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}