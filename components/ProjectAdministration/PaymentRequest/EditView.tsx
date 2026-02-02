"use client";

import {
  Box,
  LoadingOverlay,
  Badge,
  Text,
  Group,
} from "@mantine/core";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { getListOrder } from "../../../api/apiGetlistOrder";
import {  IconFileText } from "@tabler/icons-react";
import { Anchor } from "@mantine/core";

interface EditViewProps {
  id: string; // project_id
}

interface OrderDataType {
  id: string;
  contract_code: string;
  contract_url?: string;
  unit_code: string;
  total_price_at_sale_vi: number;
  order_date: string;
  order_status: string;
  customer_name: string;
  customer_phone: string;
  seller_name: string;
}

const EditView = ({ id }: EditViewProps) => {

  const [data, setData] = useState<OrderDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token") || "";

  const fetchOrders = useCallback(async () => {
    if (!id || !token) return;
    setLoading(true);
    try {
      const res = await getListOrder(id, { token });
      setData(res.items || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const columns: ColumnsType<OrderDataType> = [
    {
      title: "Căn hộ",
      dataIndex: "unit_code",
      key: "unit_code",
      width: 100,
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 200,
      render: (record: OrderDataType) => (
        <Box>
          <Text size="sm" fw={500}>{record.customer_name || "N/A"}</Text>
          <Text size="xs" c="dimmed">{record.customer_phone || "N/A"}</Text>
        </Box>
      ),
    },
    {
      title: "Mã hợp đồng",
      key: "contract",
      width: 150,
      render: (record: OrderDataType) => (
        <Group gap="xs">
          <Text size="sm">{record.contract_code || "N/A"}</Text>
          {record.contract_url && (
            <Anchor href={record.contract_url} target="_blank">
              <IconFileText size={16} color="#3598dc" />
            </Anchor>
          )}
        </Group>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
      width: 120,
      render: (date: string) => date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Giá bán",
      dataIndex: "total_price_at_sale_vi",
      key: "total_price_at_sale_vi",
      align: "right",
      width: 150,
      render: (num: number) => num?.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Trạng thái",
      dataIndex: "order_status",
      key: "order_status",
      width: 150,
      render: (status: string) => {
        const statusConfig: Record<string, { label: string; color: string }> = {
          pending: { label: "Chờ duyệt", color: "yellow" },
          pending_deposit: { label: "Chờ cọc", color: "orange" },
          paying: { label: "Đang thanh toán", color: "blue" },
          completed: { label: "Hoàn tất", color: "green" },
          cancelled: { label: "Đã hủy", color: "red" },
          expired: { label: "Hết hạn", color: "gray" },
        };
        const config = statusConfig[status] || { label: status, color: "gray" };
        return <Badge color={config.color} variant="light">{config.label}</Badge>;
      },
    },
 
  ];

  return (
    <Box pos="relative" w="100%">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Box>
  );
};

export default EditView;


