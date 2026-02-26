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
} from "@mantine/core";
import { createWarehouse } from "../../../api/apiFilterWarehouse";
import styles from "./TotalWarehouse.module.css";
import WarehouseDetail from "../WarehouseDetail";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { Pagination } from "antd";
import FilterSidebar from "./FilterSidebar";

interface TotalWarehouseProps {
  projectId: string;
  target?: string;
}

export interface WarehouseItem {
  id: string;
  unit_code: string;
  layer6: string;
  describe: string;
  layer2: string;
  view: string;
  layer3: string;
  color: string;
  zone: string;
  status_unit: string;
  building_type: string;
  describe_vi: string;
  main_door_direction: string;
  balcony_direction: string;
  bedroom: string | number;
  bathroom: string | number;
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
  const [selectedMainDoorDirections, setSelectedMainDoorDirections] = useState<string[]>([]);
  const [selectedBalconyDirections, setSelectedBalconyDirections] = useState<string[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [activeBedroom, setActiveBedroom] = useState<string | null>(null);


  const normalize = (value?: string) => value?.trim().toLowerCase();

  const suggestionMeta = useMemo(() => {
    const map = new Map<
      string,
      {
        zone?: string;
        building_type?: string;
        bedroom?: number | string;
        bathroom?: number | string;
        direction?: string;
        main_door_direction?: string;
        balcony_direction?: string;
        status_unit?: string;
      }
    >();
    for (const i of items) {
      map.set(i.unit_code, {
        zone: i.zone,
        building_type: i.building_type,
        bedroom: i.bedroom,
        bathroom: i.bathroom,
        direction: i.direction,
        main_door_direction: i.main_door_direction,
        balcony_direction: i.balcony_direction,
        status_unit: i.status_unit,
      });
    }
    return map;
  }, [items]);

 useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);

      const body = {
        project_id: projectId,
        filters: [{ label: "type_info", values: ["bh"] }],
      };

      const res = await createWarehouse(projectId as string, body);
      const warehouseList: WarehouseItem[] = Array.isArray(res) ? res : res.data || [];

      // Lọc dữ liệu: loại bỏ skip và lọc theo target nếu có
      const finalList = warehouseList.filter((item) => {
        // Loại bỏ các item có status_unit = "skip"
        if (item.status_unit?.trim().toLowerCase() === "skip") return false;

        // Nếu có target, chỉ giữ các item mà zone khớp target
        if (target && item.zone) {
          return normalize(item.zone) === normalize(target);
        }

        // Nếu không có target, giữ tất cả (trừ skip)
        return !target;
      });

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
  let filtered = items;

  // Filter theo loại building
  if (selectedBuildingTypes.length > 0) {
    filtered = filtered.filter(
      (item) =>
        item && selectedBuildingTypes.includes(item.building_type)
    );
  }
  // Filter theo hướng 
   if (selectedDirections.length > 0) {
    filtered = filtered.filter(
      (item) =>
        item && selectedDirections.includes(item.direction)
    );
  }

  // Filter theo hướng cửa chính
  if (selectedMainDoorDirections.length > 0) {
    filtered = filtered.filter(
      (item) =>
        item && selectedMainDoorDirections.includes(item.main_door_direction)
    );
  }

  // Filter theo hướng ban công
  if (selectedBalconyDirections.length > 0) {
    filtered = filtered.filter(
      (item) =>
        item && selectedBalconyDirections.includes(item.balcony_direction)
    );
  }

  setFilteredItems(filtered);
  setCurrentPage(1);
}, [
  items,
  selectedBuildingTypes,
  selectedMainDoorDirections,
  selectedBalconyDirections,
]);



  const toggleFilterSidebar = () => {
    setShowFilterSidebar((prev) => {
      if (prev) {
        setSelectedBuildingTypes([]);
      }
      return !prev;
    });
  };
  



  const handleInputChange = (value: string) => {
    setSearchText(value);
    if (!value || value.trim().length < 1) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = items
      .filter((item) =>
        `
        ${item.unit_code ?? ""}
        ${item.zone ?? ""}
        ${item.layer3 ?? ""}
        ${item.building_type ?? ""}
        ${item.layer2 ?? ""}
        ${item.bedroom ?? ""}
        ${item.bathroom ?? ""}
        ${item.direction ?? ""}
        ${item.main_door_direction ?? ""}
        ${item.balcony_direction ?? ""}
        ${item.status_unit ?? ""}
      `
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .slice(0, 10)
      .map((item) => ({
        value: item.unit_code,
        zone: item.zone,
        layer3: item.layer3,
        building_type: item.building_type,
        layer2: item.layer2,
        bedroom: item.bedroom,
        bathroom: item.bathroom,
        direction: item.direction,
        main_door_direction: item.main_door_direction,
        balcony_direction: item.balcony_direction,
        status_unit: item.status_unit,
      }));
    setSearchSuggestions(suggestions);
  };

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      `
        ${item.unit_code ?? ""}
        ${item.zone ?? ""}
        ${item.layer3 ?? ""}
        ${item.building_type ?? ""}
        ${item.layer2 ?? ""}
        ${item.bedroom ?? ""}
        ${item.bathroom ?? ""}
        ${item.direction ?? ""}
        ${item.main_door_direction ?? ""}
        ${item.balcony_direction ?? ""}
        ${item.status_unit ?? ""}
      `
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleFilterStatus = (status?: string) => {
    if (!status) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item && item.status_unit === status);
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  };

  // Lọc theo phòng ngủ
  const handleFilterBedroom = (num: string | number) => {
    const filtered = items.filter((item) => item.bedroom === num);
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  // Lọc theo phòng tắm
  // const handleFilterBathroom = (num: string | number) => {
  //   const filtered = items.filter((item) => item.bathroom === num);
  //   setFilteredItems(filtered);
  //   setCurrentPage(1);
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
const uniqueBuildingTypes = Array.from(
  new Set(
    items
      .map((item) => item.building_type)
      .filter(
        (type) =>
          type !== undefined &&
          type !== null &&
          type !== "skip"
      )
  )
);

const uniqueDirections = Array.from(
  new Set(
    items
      .map((item) => item.direction)
      .filter(
        (type) =>
          type !== undefined &&
          type !== null &&
          type !== "skip"
      )
  )
);

const uniqueMainDoorDirections = Array.from(
  new Set(
    items
      .map((item) => item.main_door_direction)
      .filter(
        (type) =>
          type !== undefined &&
          type !== null &&
          type !== "skip"
      )
  )
);

const uniqueBalconyDirections = Array.from(
  new Set(
    items
      .map((item) => item.balcony_direction)
      .filter(
        (type) =>
          type !== undefined &&
          type !== null &&
          type !== "skip"
      )
  )
);

// Lấy danh sách phòng ngủ duy nhất, ép về string và bỏ "Skip"
const uniqueBedrooms: string[] = Array.from(
  new Set(
    items
      .map((item) => item.bedroom)
      .filter(
        (num): num is string | number =>
          num !== undefined &&
          num !== null &&
          String(num).toLowerCase() !== "skip" // loại bỏ "Skip" bất kể viết hoa/thường
      )
      .map((num) => String(num))
  )
);

const sortedBedrooms = [...uniqueBedrooms].sort((a, b) => {
  const isNumA = !isNaN(Number(a));
  const isNumB = !isNaN(Number(b));

  if (isNumA && isNumB) {
    return Number(a) - Number(b);
  }
  if (isNumA) return -1;
  if (isNumB) return 1;
  return a.localeCompare(b);
});



  // const uniqueBathrooms = Array.from(
  //   new Set(items.map((item) => item.bathroom).filter((num) => num !== undefined && num !== null))
  // );

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

  return (
    <div style={{ display: "flex" }}>
      {showFilterSidebar && (
        <FilterSidebar
          uniqueBuildingTypes={uniqueBuildingTypes}
          selectedBuildingTypes={selectedBuildingTypes}
          setSelectedBuildingTypes={setSelectedBuildingTypes}
          uniqueDirections={uniqueDirections}
          selectedDirections={selectedDirections}
          setSelectedDirections={setSelectedDirections}
          uniqueMainDoorDirections={uniqueMainDoorDirections}
          selectedMainDoorDirections={selectedMainDoorDirections}
          setSelectedMainDoorDirections={setSelectedMainDoorDirections}
          uniqueBalconyDirections={uniqueBalconyDirections}
          selectedBalconyDirections={selectedBalconyDirections}
          setSelectedBalconyDirections={setSelectedBalconyDirections}
          sortedBedrooms={sortedBedrooms}
          activeBedroom={activeBedroom}
          setActiveBedroom={setActiveBedroom}
          handleFilterBedroom={handleFilterBedroom}
          items={items}
          setFilteredItems={setFilteredItems}
          setCurrentPage={setCurrentPage}
        />
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
                    filter={({ options }) => options}
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

  // Gom các trường có dữ liệu thành mảng, bỏ qua null/undefined
  const details = [
    meta?.zone,
    meta?.building_type,
    meta?.bedroom ? `${meta.bedroom} PN` : null,
    meta?.bathroom ? `${meta.bathroom} WC` : null,
    meta?.direction,
    meta?.main_door_direction,
    meta?.balcony_direction,
    meta?.status_unit,
  ].filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <strong>{option.value}</strong>
      {details.length > 0 && (
        <span style={{ fontSize: "12px", color: "#666" }}>
          {details.join(" • ")}
        </span>
      )}
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
  {currentItems.filter(item => item.status_unit?.trim().toLowerCase() !== "skip").length === 0 ? (
    <Text ta="center" style={{ marginTop: 20, fontSize: "14px", color: "#888" }}>
      Không có dữ liệu
    </Text>
  ) : (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: showFilterSidebar ? 4 : 5 }}
      spacing="xl"
    >
      {currentItems
      // Lọc status_unit = skip
        .map((item) => {
          // Hàm xử lý giá trị "skip" thành "Không có"
          const renderValue = (value?: string) => {
            if (!value || value.trim().toLowerCase() === "skip") return "Không có";
            return value;
          };

          // Xác định màu nền theo trạng thái
          let backgroundColor;
          switch (item.status_unit) {
            case "Quan tâm":
              backgroundColor = "#b8893c"; // Tùy chỉnh màu này theo nhu cầu
              break;
            case "Đang bán":
              backgroundColor = "#3d6985"; // Tùy chỉnh màu này theo nhu cầu
              break;
            case "Đã đặt cọc":
              backgroundColor = "#cc5c34"; // Tùy chỉnh màu này theo nhu cầu
              break;
            case "Đã bán":
              backgroundColor = "#b32f1f"; // Tùy chỉnh màu này theo nhu cầu
              break;
            default:
              backgroundColor = "#fff"; // Màu nền mặc định
          }

          return (
            <Card
              key={item.id}
              shadow="md"
              radius="lg"
              className={styles.card}
              style={{ cursor: "pointer", backgroundColor }} // Áp dụng màu nền đã xác định
              onClick={() => setSelectedItem(item)}
            >
              {/* Mã căn hộ */}
              <Text fw={700} mb={8} style={{ fontSize: "15px" }} ta="center">
                {item.unit_code}
              </Text>

              {/* Phân khu hoặc Tòa */}
              <Text style={{ fontSize: "15px" }}>
                {item.zone ? `Phân khu: ${item.zone}` : `Tòa: ${item.layer3}`}
              </Text>

              {/* Loại công trình hoặc Vị trí */}
              <Text style={{ fontSize: "15px" }}>
                {item.building_type ? `Loại công trình: ${item.building_type}` : `Vị trí: ${item.layer2}`}
              </Text>

              {/* Phòng ngủ và phòng tắm */}
         <Text style={{ fontSize: "15px" }}>
  Phòng ngủ: {typeof item.bedroom === "string" && item.bedroom.trim().toLowerCase() === "skip"
    ? "Không có"
    : item.bedroom}
</Text>
<Text style={{ fontSize: "15px" }}>
  Phòng tắm: {
    typeof item.bathroom === "string" &&
    item.bathroom.trim().toLowerCase() === "skip"
      ? "Không có"
      : item.bathroom
  }
</Text>

              {/* Hướng, cửa chính, ban công */}
              {item.direction && item.direction.trim() !== "" && (
                <Text style={{ fontSize: "15px" }}>
                  Hướng: {renderValue(item.direction)}
                </Text>
              )}
              {item.main_door_direction && item.main_door_direction.trim() !== "" && (
                <Text style={{ fontSize: "15px" }}>
                  Hướng cửa chính: {renderValue(item.main_door_direction)}
                </Text>
              )}
              {item.balcony_direction && item.balcony_direction.trim() !== "" && (
                <Text style={{ fontSize: "15px" }}>
                  Hướng ban công: {renderValue(item.balcony_direction)}
                </Text>
              )}

              {/* Trạng thái căn hộ */}
              <Text style={{ fontSize: "15px" }}>Trạng thái: {item.status_unit}</Text>
            </Card>
          );
        })}
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
