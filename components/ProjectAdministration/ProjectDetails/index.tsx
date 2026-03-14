"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Group, Select,  Button, Flex } from "@mantine/core";
import { IconChevronDown,  IconX } from "@tabler/icons-react";
import axios from "axios";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { createWarehouse, CreateNodeAttributeBody } from "../../../api/apiFilterWarehouse";
import { getListProject } from "../../../api/apigetlistProject";

import { NotificationExtension } from "../../../extension/NotificationExtension";
import EditView from "./EditView";
import DeleteView from "./DeleteView";
import DetailsImng from "./DetailsImg";
import { modals } from "@mantine/modals";

/* =======================
   TYPE
======================= */
interface DataType {
  id: string;
  zone: string;
  building_type: string;
  unit_code: string;
  layer3: string;
  layer2: string;
  bedroom: string;
  bathroom: number;
  direction: string;
  main_door_direction: string;
  balcony_direction: string;
  status_unit: string;
  leaf_id:string;
  
}

interface ProjectTemplate {
  id: string | number;
  name?: string;
}

interface TemplateAttributeLink {
  id: string | number;
  zone: string;
  building_type: string;
  unit_code?: string;
  layer3: string;
  layer2: string;
  bedroom: string;
  bathroom: number;
  direction: string;
  main_door_direction: string;
balcony_direction: string;
  status_unit: string;
  leaf_id:string;
}

/* =======================
   COMPONENT
======================= */
export default function LargeFixedTable() {
  const token = localStorage.getItem("access_token") || "";
  const isValid = (v: unknown) => v !== null && v !== undefined && String(v).trim() !== "" && String(v).toLowerCase() !== "skip" && String(v) !== "-";

  const [data, setData] = useState<DataType[]>([]);
  const [allProjectData, setAllProjectData] = useState<TemplateAttributeLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters state
  const [filterZone, setFilterZone] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterBedroom, setFilterBedroom] = useState<string | null>(null);
  const [filterDirection, setFilterDirection] = useState<string | null>(null);
  const [filterBuildingType, setFilterBuildingType] = useState<string | null>(null);
  const [filterBathroom, setFilterBathroom] = useState<string | null>(null);
  const [filterBalconyDirection, setFilterBalconyDirection] = useState<string | null>(null);
  const [filterMainDoorDirection, setFilterMainDoorDirection] = useState<string | null>(null);

  // Options for filters
  const [zoneOptions, setZoneOptions] = useState<{ value: string; label: string }[]>([]);
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);
  const [bedroomOptions, setBedroomOptions] = useState<{ value: string; label: string }[]>([]);
  const [directionOptions, setDirectionOptions] = useState<{ value: string; label: string }[]>([]);
  const [buildingTypeOptions, setBuildingTypeOptions] = useState<{ value: string; label: string }[]>([]);
  const [bathroomOptions, setBathroomOptions] = useState<{ value: string; label: string }[]>([]);
  const [balconyDirectionOptions, setBalconyDirectionOptions] = useState<{ value: string; label: string }[]>([]);
  const [mainDoorDirectionOptions, setMainDoorDirectionOptions] = useState<{ value: string; label: string }[]>([]);

  const handleResetFilters = useCallback(() => {
    setFilterZone(null);
    setFilterStatus(null);
    setFilterBedroom(null);
    setFilterDirection(null);
    setFilterBuildingType(null);
    setFilterBathroom(null);
    setFilterBalconyDirection(null);
    setFilterMainDoorDirection(null);
    setCurrentPage(1);
  }, []);

  const pageSize = 10;

  const [templateOptions, setTemplateOptions] = useState<
    { value: string; label: string }[]
  >([]);

  /* =======================
     1️⃣ LOAD TEMPLATE
  ======================= */
  const fetchTemplateList = useCallback(async () => {
    try {
      const res = await getListProject({
        token,
        skip: 0,
        limit: 100,
      });

      console.log("TEMPLATE API FULL:", res.data);

      const options = (res.data || [])
        .filter((item: ProjectTemplate) => item?.name)
        .map((item: ProjectTemplate) => ({
          value: item.id.toString(),
          label: item.name as string,
        }));

      setTemplateOptions(options);
    } catch (err) {
      console.error("Load template error:", err);
      setTemplateOptions([]);
    }
  }, [token]);

  useEffect(() => {
    fetchTemplateList();
  }, [fetchTemplateList]);

  /* =======================
     1.5️⃣ LOAD MASTER DATA (FOR OPTIONS)
  ======================= */
  const fetchMasterData = useCallback(async () => {
    if (!templateId) {
      setAllProjectData([]);
      return;
    }

    try {
      const body = {
        project_id: templateId,
        filters: [{ label: "type_info", values: ["bh"] }],
      };
      const res = await createWarehouse(templateId, body);
      
      let list: TemplateAttributeLink[] = [];
      if (Array.isArray(res.data)) list = res.data;
      else if (Array.isArray(res.data?.data)) list = res.data.data;
      else if (Array.isArray(res.data?.result)) list = res.data.result;
      else if (Array.isArray(res.data?.items)) list = res.data.items;
      else if (Array.isArray(res.data?.data?.items)) list = res.data.data.items;

      setAllProjectData(list);

      // Generate Items: Bắt CHÍNH XÁC giá trị sẽ hiển thị trên bảng theo độ ưu tiên
      const generateItems = (priorityFields: (keyof TemplateAttributeLink)[]) => {
        const uniqueValues = new Set<string>();
        list.forEach(item => {
          const displayField = priorityFields.find(f => isValid(item[f]));
          if (displayField) {
            uniqueValues.add(String(item[displayField]));
          }
        });
        return Array.from(uniqueValues).sort().map(v => ({ value: v, label: v }));
      };

      setZoneOptions(generateItems(["zone", "layer3", "layer2"])); // Ưu tiên: khu > tòa > lô (Block/Lot)
      setBuildingTypeOptions(generateItems(["building_type"])); // Chỉ lấy loại công trình (LIỀN KỀ, CĂN HỘ...)
      setStatusOptions(generateItems(["status_unit"]));
      setBedroomOptions(generateItems(["bedroom"]));
      setBathroomOptions(generateItems(["bathroom"]));
      setDirectionOptions(generateItems(["direction"]));
      setBalconyDirectionOptions(generateItems(["balcony_direction", "direction"]));
      setMainDoorDirectionOptions(generateItems(["main_door_direction", "direction"]));

    } catch (err) {
      console.error("Fetch master data error:", err);
    }
  }, [templateId]);

  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);
  const fetchWarehouse = useCallback(async () => {
    if (!templateId) {
      setData([]);
      setTotal(0);
      return;
    }

    setLoading(true);

    const body: CreateNodeAttributeBody = {
      project_id: templateId,
      filters: [
        {
          label: "type_info",
          values: ["bh"],
        },
      ],
    };

    if (filterZone) {
      const sample = allProjectData.find(item => {
        const displayField = (["zone", "layer3", "layer2"] as const).find(f => isValid(item[f]));
        return displayField && String(item[displayField]) === filterZone;
      });
      const label = (["zone", "layer3", "layer2"] as const).find(f => sample && String(sample[f]) === filterZone);
      if (label) body.filters.push({ label, values: [filterZone] });
    }
    if (filterStatus) {
      body.filters.push({ label: "status_unit", values: [filterStatus] });
    }
    if (filterBedroom) {
      body.filters.push({ label: "bedroom", values: [filterBedroom] });
    }
    if (filterDirection) {
      body.filters.push({ label: "direction", values: [filterDirection] });
    }
    if (filterBuildingType) {
      const sample = allProjectData.find(item => {
        const displayField = (["building_type"] as const).find(f => isValid(item[f]));
        return displayField && String(item[displayField]) === filterBuildingType;
      });
      const label = (["building_type"] as const).find(f => sample && String(sample[f]) === filterBuildingType);
      if (label) body.filters.push({ label, values: [filterBuildingType] });
    }
    if (filterBathroom) {
      body.filters.push({ label: "bathroom", values: [filterBathroom] });
    }
    if (filterBalconyDirection) {
      const sample = allProjectData.find(item => {
        const displayField = (["balcony_direction", "direction"] as const).find(f => isValid(item[f]));
        return displayField && item[displayField] === filterBalconyDirection;
      });
      const label = (["balcony_direction", "direction"] as const).find(f => sample && sample[f] === filterBalconyDirection);
      if (label) body.filters.push({ label, values: [filterBalconyDirection] });
    }
    if (filterMainDoorDirection) {
      const sample = allProjectData.find(item => {
        const displayField = (["main_door_direction", "direction"] as const).find(f => isValid(item[f]));
        return displayField && item[displayField] === filterMainDoorDirection;
      });
      const label = (["main_door_direction", "direction"] as const).find(f => sample && sample[f] === filterMainDoorDirection);
      if (label) body.filters.push({ label, values: [filterMainDoorDirection] });
    }

    // Một số API yêu cầu nhãn khác cho hướng, mình thêm fallback nếu cần
    // Nếu vẫn không được, có thể cần kiểm tra xem API có dùng label 'direction' cho tất cả không
    if (filterDirection && !filterBalconyDirection && !filterMainDoorDirection) {
       // logic hiện tại cho filterDirection đã có ở trên
    }

    console.log("SENDING BODY TO API:", JSON.stringify(body, null, 2));

    try {
      const res = await createWarehouse(templateId, body);

      console.log("WAREHOUSE RAW RESPONSE:", res);
      
      console.log("WAREHOUSE RAW RESPONSE:", res);
      
      let list: TemplateAttributeLink[] = [];

      if (Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res.data?.data)) {
        list = res.data.data;
      } else if (Array.isArray(res.data?.result)) {
        list = res.data.result;
      } else if (Array.isArray(res.data?.items)) {
        list = res.data.items;
      } else if (Array.isArray(res.data?.data?.items)) {
        list = res.data.data.items;
      }

      console.log("WAREHOUSE FINAL LIST:", list);

      const rows: DataType[] = list.map((item) => ({
        id: String(item.id),
        zone: item.zone,
       building_type: item.building_type,
        unit_code: item.unit_code || "-",
        layer3: item .layer3 || "-",
        layer2: item .layer2 || "-",
      bedroom: item .bedroom || "-", // để string 
       bathroom: item .bathroom || 0, 
       direction: item.direction ,
        main_door_direction: item.main_door_direction ,
        balcony_direction: item.balcony_direction,
        status_unit: item.status_unit,
        leaf_id:item.leaf_id,
      }));

      console.log("ROWS ĐƯA VÀO TABLE:", rows);

      setData(rows);
      setTotal(
        res.data?.count ||
          res.data?.total ||
          res.data?.data?.count ||
          rows.length
      );
    } catch (err) {
      let message = "Có lỗi khi tải dữ liệu kho";

      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          message;
      }

      NotificationExtension.Fails(message);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [templateId, filterZone, filterStatus, filterBedroom, filterDirection, filterBuildingType, filterBathroom, filterBalconyDirection, filterMainDoorDirection, allProjectData]);

  useEffect(() => {
    fetchWarehouse();
  }, [fetchWarehouse]);

  /* =======================
     DEBUG STATE
  ======================= */
  useEffect(() => {
    console.log("DATA STATE (FINAL):", data);
  }, [data]);

  /* =======================
     PAGINATION
  ======================= */
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* =======================
     TABLE COLUMNS
  ======================= */
const columns: ColumnsType<DataType> = [
  {
    title: "Mã căn",
    dataIndex: "unit_code",
    width: 50,
    fixed: "left",
  },
{
    title: "Phân khu/Tòa",
    dataIndex: "zone",
    width: 40,
    render: (zone: unknown, record: DataType) => {
      if (isValid(zone)) return String(zone);
      if (isValid(record.layer3)) return String(record.layer3);
      if (isValid(record.layer2)) return String(record.layer2);
      return "-";
    },
  },

  {
    title: "Loại công trình/vị trí",
    dataIndex: "building_type",
    width: 60,
    render: (_: unknown, record: DataType) => {
      if (isValid(record.building_type)) return String(record.building_type);
      return "-";
    },
  },

  {
    title: "Phòng ngủ",
    dataIndex: "bedroom",
    width: 50,
  },

  {
    title: "Phòng tắm",
    dataIndex: "bathroom",
    width: 50,
    render: (bathroom: unknown) => {
      if (
        bathroom === null ||
        bathroom === undefined ||
        bathroom === "skip"
      ) {
        return "Không có";
      }
      return String(bathroom);
    },
  },

  {
    title: "Hướng",
    dataIndex: "direction",
    width: 50,
    render: (direction: unknown) => {
      if (
        direction === null ||
        direction === undefined ||
        direction === "skip"
      ) {
        return "Không có";
      }
      return String(direction);
    },
  },

  {
    title: "Hướng cửa chính",
    dataIndex: "main_door_direction",
    width: 50,
    render: (mainDoorDirection: unknown) => {
      if (
        mainDoorDirection === null ||
        mainDoorDirection === undefined ||
        mainDoorDirection === "skip"
      ) {
        return "Không có";
      }
      return String(mainDoorDirection);
    },
  },

  {
    title: "Hướng ban công",
    dataIndex: "balcony_direction",
    width: 50,
    render: (balconyDirection: unknown) => {
      if (
        balconyDirection === null ||
        balconyDirection === undefined ||
        balconyDirection === "skip"
      ) {
        return "Không có";
      }
      return String(balconyDirection);
    },
  },

  {
    title: "Trạng thái",
    dataIndex: "status_unit",
    width: 50,
    render: (statusUnit: unknown) => {
      if (
        statusUnit === null ||
        statusUnit === undefined ||
        statusUnit === "skip"
      ) {
        return <span style={{ color: "gray" }}>Không có</span>;
      }

      if (typeof statusUnit !== "string") {
        return <span>-</span>;
      }

      let color = "#000";
      switch (statusUnit) {
        case "Quan tâm":
          color = "#b8893c";
          break;
        case "Đang bán":
          color = "#3d6985";
          break;
        case "Đã đặt cọc":
          color = "#cc5c34";
          break;
        case "Đã bán":
          color = "#b32f1f";
          break;
      }

      return <span style={{ color }}>{statusUnit}</span>;
    },
  },

  {
    title: "Hành động",
    width: 40,
    fixed: "right",
    render: (_: unknown, record: DataType) => (
      <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            iconType="image"
            aria-label="Hình ảnh"
            color="primary"
            onClick={() => openImgModal(record, templateId)}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            iconType="documentEdit"
            aria-label="Chỉnh sửa"
            color="success"
            onClick={() => openEditUserModal(record)}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            iconType="trash"
            aria-label="Xóa"
            color="danger"
            onClick={() => openDeleteUserModal(record)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
  },
 
];

const openEditUserModal = (record: DataType) => {
  modals.openConfirmModal({
    title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa</div>,
    children: (
      <EditView
        id={record.id}
        leaf_id={record.leaf_id}
        project_id={templateId}   // 👈 project đang chọn
        onSearch={fetchWarehouse}
      />
    ),
    confirmProps: { display: "none" },
    cancelProps: { display: "none" },
  });
};

  const openDeleteUserModal = (record: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa</div>,
      children: <DeleteView idItem={[record.id]} onSearch={fetchWarehouse} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };
const openImgModal = (record: DataType, project_id: string) => {
  const unit_code = record.unit_code || "-";

  modals.openConfirmModal({
    title: (
      <div style={{ fontWeight: 600, fontSize: 18 }}>
        Hình ảnh
      </div>
    ),

    size: "xl", // 👈 tăng width modal

    children: (
      <DetailsImng
        projectId={project_id}
        unitCode={unit_code}
        onSearch={fetchWarehouse}
      />
    ),

    confirmProps: { display: "none" },
    cancelProps: { display: "none" },
  });
};

  const isAnyFilterVisible =
    zoneOptions.length > 0 ||
    buildingTypeOptions.length > 0 ||
    statusOptions.length > 0 ||
    bedroomOptions.length > 0 ||
    bathroomOptions.length > 0 ||
    directionOptions.length > 0 ||
    mainDoorDirectionOptions.length > 0 ||
    balconyDirectionOptions.length > 0;

  return (
    <>
      <Flex direction="column" gap="md" mb="md">
        <Group align="flex-end">
          <Select
            label="Chọn dự án"
            placeholder="Chọn dự án mẫu"
            data={templateOptions}
            value={templateId}
            onChange={(value) => {
              setTemplateId(value || "");
              handleResetFilters();
              setData([]);
              setTotal(0);
            }}
            rightSection={<IconChevronDown size={16} />}
            clearable
            withAsterisk
            style={{ minWidth: 250 }}
          />
        </Group>

        <Group align="flex-end">
          {zoneOptions.length > 0 && (
            <Select
              label="Phân khu/Tòa"
              placeholder="Tất cả"
              data={zoneOptions}
              value={filterZone}
              onChange={setFilterZone}
              searchable
              clearable
              style={{ width: 140 }}
            />
          )}

          {buildingTypeOptions.length > 0 && (
            <Select
              label="Loại công trình"
              placeholder="Tất cả"
              data={buildingTypeOptions}
              value={filterBuildingType}
              onChange={setFilterBuildingType}
              searchable
              clearable
              style={{ width: 160 }}
            />
          )}

          {statusOptions.length > 0 && (
            <Select
              label="Trạng thái"
              placeholder="Tất cả"
              data={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              clearable
              style={{ width: 130 }}
            />
          )}

          {bedroomOptions.length > 0 && (
            <Select
              label="Phòng ngủ"
              placeholder="Tất cả"
              data={bedroomOptions}
              value={filterBedroom}
              onChange={setFilterBedroom}
              clearable
              style={{ width: 110 }}
            />
          )}

          {bathroomOptions.length > 0 && (
            <Select
              label="Phòng tắm"
              placeholder="Tất cả"
              data={bathroomOptions}
              value={filterBathroom}
              onChange={setFilterBathroom}
              clearable
              style={{ width: 110 }}
            />
          )}

          {directionOptions.length > 0 && (
            <Select
              label="Hướng"
              placeholder="Tất cả"
              data={directionOptions}
              value={filterDirection}
              onChange={setFilterDirection}
              clearable
              style={{ width: 130 }}
            />
          )}

          {mainDoorDirectionOptions.length > 0 && (
            <Select
              label="Hướng cửa chính"
              placeholder="Tất cả"
              data={mainDoorDirectionOptions}
              value={filterMainDoorDirection}
              onChange={setFilterMainDoorDirection}
              clearable
              style={{ width: 140 }}
            />
          )}

          {balconyDirectionOptions.length > 0 && (
            <Select
              label="Hướng ban công"
              placeholder="Tất cả"
              data={balconyDirectionOptions}
              value={filterBalconyDirection}
              onChange={setFilterBalconyDirection}
              clearable
              style={{ width: 140 }}
            />
          )}

          {isAnyFilterVisible && (
            <Button 
              variant="light" 
              color="gray" 
              leftSection={<IconX size={16} />}
              onClick={handleResetFilters}
            >
              Xóa lọc
            </Button>
          )}
        </Group>
      </Flex>

      <Table
       scroll={{ x: 1600 }}
        columns={columns}
        dataSource={paginatedData}
        loading={loading}
        pagination={false}
        bordered
        rowKey="id"
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination
          total={total}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
