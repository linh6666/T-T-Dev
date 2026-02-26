"use client";

import { MultiSelect } from "@mantine/core";
import { WarehouseItem } from "./index";

interface FilterSidebarProps {
  uniqueBuildingTypes: string[];
  selectedBuildingTypes: string[];
  setSelectedBuildingTypes: (val: string[]) => void;
  uniqueDirections: string[];
  selectedDirections: string[];
  setSelectedDirections: (val: string[]) => void;
  uniqueMainDoorDirections: string[];
  selectedMainDoorDirections: string[];
  setSelectedMainDoorDirections: (val: string[]) => void;
  uniqueBalconyDirections: string[];
  selectedBalconyDirections: string[];
  setSelectedBalconyDirections: (val: string[]) => void;
  sortedBedrooms: string[];
  activeBedroom: string | null;
  setActiveBedroom: (val: string | null) => void;
  handleFilterBedroom: (num: string | number) => void;
  items: WarehouseItem[];
  setFilteredItems: (items: WarehouseItem[]) => void;
  setCurrentPage: (page: number) => void;
}

export default function FilterSidebar({
  uniqueBuildingTypes,
  selectedBuildingTypes,
  setSelectedBuildingTypes,
  uniqueDirections,
  selectedDirections,
  setSelectedDirections,
  uniqueMainDoorDirections,
  selectedMainDoorDirections,
  setSelectedMainDoorDirections,
  uniqueBalconyDirections,
  selectedBalconyDirections,
  setSelectedBalconyDirections,
  sortedBedrooms,
  activeBedroom,
  setActiveBedroom,
  handleFilterBedroom,
  items,
  setFilteredItems,
  setCurrentPage,
}: FilterSidebarProps) {
  return (
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

      {uniqueBuildingTypes.length > 0 && (
        <MultiSelect
          label="Loại công trình"
          placeholder="Chọn loại công trình"
          data={uniqueBuildingTypes}
          value={selectedBuildingTypes}
          onChange={setSelectedBuildingTypes}
        />
      )}

      {uniqueDirections.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <MultiSelect
            label="Hướng"
            placeholder="Chọn hướng"
            data={uniqueDirections}
            value={selectedDirections}
            onChange={setSelectedDirections}
          />
        </div>
      )}

      {uniqueMainDoorDirections.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <MultiSelect
            label="Hướng cửa chính"
            placeholder="Chọn hướng cửa chính"
            data={uniqueMainDoorDirections}
            value={selectedMainDoorDirections}
            onChange={setSelectedMainDoorDirections}
          />
        </div>
      )}

      {uniqueBalconyDirections.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <MultiSelect
            label="Hướng ban công"
            placeholder="Chọn hướng ban công"
            data={uniqueBalconyDirections}
            value={selectedBalconyDirections}
            onChange={setSelectedBalconyDirections}
          />
        </div>
      )}

      {sortedBedrooms.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Phòng ngủ
          </label>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {sortedBedrooms.map((num) => {
              const isActive = activeBedroom === String(num);

              return (
                <button
                  key={num}
                  onClick={() => {
                    if (isActive) {
                      // 👉 CLICK LẦN 2: BỎ ACTIVE + RESET LIST
                      setActiveBedroom(null);
                      setFilteredItems(items);
                      setCurrentPage(1);
                    } else {
                      // 👉 CLICK LẦN 1: SET ACTIVE + FILTER
                      setActiveBedroom(String(num));
                      handleFilterBedroom(num);
                    }
                  }}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #762f0b",
                    borderRadius: "20px",
                    backgroundColor: isActive ? "#762f0b" : "#fff",
                    color: isActive ? "#fff" : "#762f0b",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#762f0b";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.color = "#762f0b";
                    }
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
