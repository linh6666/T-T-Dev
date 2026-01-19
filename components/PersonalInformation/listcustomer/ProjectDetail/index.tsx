"use client";

import {
  Card,
  Text,
  Stack,
  Title,
  Divider,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getListOrder } from "../../../../api/apiGetlistOrder";

/* =======================
   TYPE
======================= */
interface Project {
  id: string;
}

interface Order {
  id: string;
  project_id: string;
  customer_id: string;
  seller_id: string;

  unit_code: string;
  contract_code: string;
  contract_url: string;

  order_status: string;
  order_date: string;
  fully_paid_date?: string | null;

  total_price_at_sale_vi?: number | null;
  total_price_at_sale_en?: number | null;

  amount_paid_vi?: number | null;
  amount_paid_en?: number | null;

  commission_rate?: number | null;
  id_cccd?: string | null;
}

interface Props {
  project: Project | null;
}

/* =======================
   COMPONENT
======================= */
export default function ProjectDetail({ project }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project?.id) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getListOrder(project.id);
        setOrders(res.items);
        setTotalOrder(res.total);
      } catch (error) {
        console.error("Lỗi lấy danh sách order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [project?.id]);

  if (!project) return null;

  return (
    <Card shadow="md" radius="md" withBorder>
      {/* ===== HEADER (KHÔNG SCROLL) ===== */}
      <Group justify="space-between" align="center">
        <Title order={4}>Danh sách khách hàng
          
        </Title>

        <Text fw={500}>
          Số lượng: {loading ? "..." : totalOrder}
        </Text>
      </Group>

      {/* ===== CONTENT (SCROLL) ===== */}
      <ScrollArea h={580} mt="sm" type="auto">
        <Stack gap="md">
          {loading && <Text>Đang tải dữ liệu...</Text>}

          {!loading && orders.length === 0 && (
            <Text c="dimmed">Không có order nào</Text>
          )}

          {!loading &&
            orders.map((order) => (
              <Card key={order.id} withBorder radius="sm" p="sm">
                <Stack gap={4}>
                  <Text fw={500}>Căn hộ: {order.unit_code}</Text>
                

                  <Text>
                    Giá bán (VN):{" "}
                    {order.total_price_at_sale_vi
                      ? order.total_price_at_sale_vi.toLocaleString("vi-VN")
                      : "—"}
                  </Text>

                  <Text>
                    Giá bán (EN):{" "}
                    {order.total_price_at_sale_en
                      ? order.total_price_at_sale_en.toLocaleString("en-US")
                      : "—"}
                  </Text>

             

                  <Text>
                    Ngày tạo:{" "}
                    {new Date(order.order_date).toLocaleDateString("vi-VN")}
                  </Text>

                  {order.fully_paid_date && (
                    <Text>
                      Ngày thanh toán đủ:{" "}
                      {new Date(order.fully_paid_date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </Text>
                  )}

                  <Divider my="xs" />
<Text
  component="button"
  c="blue"
  onClick={async () => {
    const res = await fetch(order.contract_url);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "hop-dong.pdf";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  }}
>
  Tải hợp đồng PDF
</Text>

                </Stack>
              </Card>
            ))}
        </Stack>
      </ScrollArea>
    </Card>
  );
}
