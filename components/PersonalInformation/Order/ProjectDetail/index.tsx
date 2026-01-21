"use client";

import {
  Card,
  Text,
  Stack,
  Title,
  Group,
  ScrollArea,
  Badge,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";

import { getListOrder } from "../../../../api/apiGetlistOrder";
import { Getlisthome } from "../../../../api/apiGetListHome";

/* =======================
   TYPE
======================= */
interface Project {
  id: string;
  name?: string;
}

interface Order {
  id: string;
  project_id: string;
  unit_code: string;
  contract_code: string;
  order_status: string;
  order_date: string;
  total_price_at_sale_vi?: number | null;
}

interface Props {
  project: Project | null;
}

/* =======================
   ORDER STATUS FORMAT
======================= */
const ORDER_STATUS_MAP: Record<
  string,
  { label: string; color: string }
> = {
  pending: {
    label: "Đang chờ manager khóa căn hộ",
    color: "yellow",
  },
  pending_deposit: {
    label: "Đang chờ đơn thanh toán",
    color: "orange",
  },
  paying: {
    label: "Đang thanh toán",
    color: "blue",
  },
  completed: {
    label: "Đã thanh toán hoàn tất",
    color: "green",
  },
  cancelled: {
    label: "Đã hủy giao dịch",
    color: "red",
  },
  expired: {
    label: "Giao dịch không được duyệt - hết hạn",
    color: "gray",
  },
};

/* =======================
   COMPONENT
======================= */
export default function ProjectDetail({ project }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 👉 map ảnh theo order.id
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  /* =======================
     FETCH ORDERS
  ======================= */
  useEffect(() => {
    if (!project?.id) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getListOrder(project.id);
        setOrders(res.items || []);
        setTotalOrder(res.total || 0);
      } catch (error) {
        console.error("Lỗi lấy danh sách order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [project?.id]);

  /* =======================
     FETCH IMAGES PER ORDER
  ======================= */
useEffect(() => {
  if (!project?.id || orders.length === 0) return;

  const fetchImages = async () => {
    const map: Record<string, string> = {};

    await Promise.all(
      orders.map(async (order) => {
        try {
          const res = await Getlisthome({
            project_id: project.id,
            unit_code: order.unit_code,
          });

          // ✅ res là ARRAY, không phải object
          map[order.id] = res?.[0]?.url || "/no-image.png";
        } catch (error) {
          console.error(
            "Lỗi lấy ảnh:",
            project.id,
            order.unit_code,
            error
          );
          map[order.id] = "/no-image.png";
        }
      })
    );

    setImageMap(map);
  };

  fetchImages();
}, [project?.id, orders]);


  if (!project) return null;

  return (
    <div>
      {/* HEADER */}
      <Group justify="space-between" align="center">
        <Title order={4}>Danh sách đơn hàng</Title>
        <Text fw={500}>
          Số lượng: {loading ? "..." : totalOrder}
        </Text>
      </Group>

      {/* LIST */}
      <ScrollArea
  h={630}
  mt="sm"
  p="md"
  styles={{
    scrollbar: {
      backgroundColor: "#f1f3f5", // track (rãnh)
    },
    thumb: {
      backgroundColor: "#ffbe00", // thanh trượt
      borderRadius: 8,
      "&:hover": {
        backgroundColor: "#868e96",
      },
    },
  }}
>
        <div>
  <Stack gap="md">
          {loading && <Text>Đang tải dữ liệu...</Text>}

          {!loading && orders.length === 0 && (
            <Text c="dimmed">Không có order nào</Text>
          )}

          {!loading &&
            orders.map((order) => {
              const status =
                ORDER_STATUS_MAP[order.order_status] || {
                  label: order.order_status,
                  color: "gray",
                };

              return (
                <Card
                  key={order.id}
                  withBorder
                  radius="lg"
                  p="md"
                  bg="#f8f9fa"
                >
                  <Group align="flex-start" wrap="nowrap">
                    {/* IMAGE */}
                 <Image
  src={imageMap[order.id] || "/no-image.png"}
  alt={order.unit_code}
  width={200}
  height={1} // ⚠️ bắt buộc để Next Image không lỗi
  style={{
    width: 200,
    height: "auto",
    borderRadius: 12,
    objectFit: "contain", // hoặc cover
    flexShrink: 0,
  }}
/>

                    {/* CONTENT */}
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Group justify="space-between" align="flex-start">
                        <Text fw={700} size="lg">
                          {order.unit_code}
                        </Text>

                        <Badge color={status.color} variant="light">
                          {status.label}
                        </Badge>
                      </Group>

                      <Text size="sm" c="dimmed">
                        Dự án {project.name || "—"}
                      </Text>

                      <Text fw={600}>
                        {order.total_price_at_sale_vi
                          ? order.total_price_at_sale_vi.toLocaleString(
                              "vi-VN"
                            )
                          : "—"}{" "}
                        VND
                      </Text>

                      <Group justify="space-between" mt="xs">
                        <Text size="sm">
                          Mã đơn hàng:{" "}
                          <Text span fw={500}>
                            {order.contract_code?.slice(0, 6)}
                          </Text>
                        </Text>

                        <Text size="sm" c="dimmed">
                          {new Date(
                            order.order_date
                          ).toLocaleString("vi-VN")}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>
                </Card>
              );
            })}
        </Stack>

        </div>
      
      </ScrollArea>
    </div>
  );
}
