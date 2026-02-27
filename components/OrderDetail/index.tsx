"use client";

import {
  Card,
  Text,
  Title,
  Group,
  Grid,
  Divider,
  Stack,
  Box,
  Container,
  Button,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
// import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Badge, Loader, Center } from "@mantine/core";
import { getOrderPaymentByOrderId } from "../../api/apiGetlistdetailOder";
import CreatePaymentModal from "./CreatePaymentModal";



/* =======================
   PROPS
======================= */
interface OrderDetailPageProps {
  projectId: string | null;
  orderId: string;
}

interface OrderPaymentItem {
  id: string;
  unit_code?: string;
  product_name?: string;
  order_status?: string;
  status?: string;
  manager_status?: string;
  contract_code?: string;
  order_code?: string;
  order_date?: string;
  created_at?: string;
  payment_date?: string;
  created_by_name?: string;
  seller_id?: string;
  sale_note?: string;
  full_name?: string;
  customer_id?: string;
  phone_number?: string;
  email?: string;
  payment_stage?: string;
  title?: string;
  amount?: number;
  total_amount_vn?: number;
  total_price_at_sale_vi?: number;
  total_amount?: number;
  paid_amount?: number;
  discount_amount?: number;
  remaining_amount?: number;
}


interface OrderPaymentResponse {
  items: OrderPaymentItem[];
  total: number;
}

export default function OrderDetailPage({
  orderId,
  projectId,
}: OrderDetailPageProps) {
  const router = useRouter();
  // const [opened, { open, close }] = useDisclosure(false);
  const [paymentData, setPaymentData] = useState<OrderPaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states for inline creation
  const [isCreating, setIsCreating] = useState(false);
  // const [formLoading, setFormLoading] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderPaymentByOrderId(orderId, projectId);
      setPaymentData(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, projectId]);


  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  const payments = paymentData?.items || [];
  const orderInfo = payments[0] || {}; // Fallback: Take info from the first payment item if metadata is missing

  const status = orderInfo?.manager_status || orderInfo?.order_status || orderInfo?.status;
  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Đang chờ manager khóa căn hộ", color: "yellow" },
    pending_deposit: { label: "Đang chờ đơn thanh toán đầu tiên được duyệt", color: "orange" },
    paying: { label: "Đang thanh toán", color: "blue" },
    completed: { label: "Đã thanh toán hoàn tất", color: "green" },
    cancelled: { label: "Đã hủy đơn hàng", color: "red" },
    expired: { label: "Đơn thanh toán chưa được tạo hoặc không được duyệt - hết hạn", color: "gray" },
  };
  const config = (status && statusConfig[status]) || { label: status || "N/A", color: "gray" };

  return (
    <>
      <Box py={10}>
        <Container size="xl">
          {/* BACK */}
          <Group mb="md">
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={18} />}
              onClick={() => router.back()}
              px={0}
            >
              Quay lại
            </Button>
          </Group>

          <Grid gutter={32} align="stretch">
            {/* CỘT TRÁI */}
            <Grid.Col span={6} style={{ display: "flex" }}>
              <Card
                radius="lg"
                p="md"
                bg="#efefef"
                style={{
                  flex: 1,
                  minHeight: "75vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Group justify="space-between" mb="sm">
                  <Title order={3} fw={700}>
                    {orderInfo?.unit_code || orderInfo?.product_name || "N/A"}
                  </Title>

                  <Badge
                    color={config.color}
                    variant="filled"
                    radius="xl"
                    px={15}
                  >
                    {config.label}
                  </Badge>

                </Group>

                {isCreating ? (
                  <CreatePaymentModal
                    projectId={projectId}
                    orderId={orderId}
                    onSuccess={() => {
                      setIsCreating(false);
                      fetchOrderDetails();
                    }}
                    onCancel={() => setIsCreating(false)}
                  />
                ) : (
                  <>
                    <Card shadow="xs" radius="lg" p={0}>
                      <Box p="xl" bg="white">
                        <Grid gutter="xs">
                          <Grid.Col span={3}>
                            <Text size="sm" c="dimmed">
                              Mã đơn hàng:
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={9}>
                            <Text size="sm">#{orderInfo?.contract_code || orderInfo?.order_code || "N/A"}</Text>
                          </Grid.Col>

                          <Grid.Col span={3}>
                            <Text size="sm" c="dimmed">
                              Ngày tạo đơn:
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={9}>
                            <Text size="sm">{ (orderInfo?.order_date || orderInfo?.created_at) ? new Date((orderInfo.order_date || orderInfo.created_at) as string).toLocaleDateString("vi-VN") : "N/A"}</Text>
                          </Grid.Col>

                          <Grid.Col span={3}>
                            <Text size="sm" c="dimmed">
                              Người tạo đơn:
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={9}>
                            <Text size="sm">{orderInfo?.created_by_name || orderInfo?.seller_id || "N/A"}</Text>
                          </Grid.Col>
                        </Grid>

                        <Group mt="xl" align="flex-start" wrap="nowrap">
                          <Text size="sm" c="dimmed">
                            Lời nhắn từ Sale:
                          </Text>
                          <Text size="sm">
                            {orderInfo?.sale_note || "Đơn hàng đang thanh toán, vui lòng thanh toán kỳ hạn tiếp theo theo hợp đồng."}
                          </Text>
                        </Group>
                      </Box>
                    </Card>

                    <Box mt="auto" pt="xl">
                      <Group justify="center">
                        <Button
                          variant="filled"
                          radius="md"
                          leftSection={<span style={{ fontSize: 18 }}>+</span>}
                          onClick={() => setIsCreating(true)}
                          style={{
                            backgroundColor: "#ffffff",
                            color: "#000000",
                          }}
                        >
                          Tạo đơn thanh toán mới
                        </Button>
                      </Group>
                    </Box>
                  </>
                )}

              </Card>
            </Grid.Col>

            {/* CỘT PHẢI */}
            <Grid.Col span={6} style={{ display: "flex" }}>
              <Card
                radius="lg"
                p="xl"
                bg="#efefef"
                style={{
                  flex: 1,
                  minHeight: "75vh",
                }}
              >
                <Card shadow="md" radius="sm" bg="white">
                  <Stack gap={30}>
                    <Box>
                      <Text fw={600} size="md">
                        {orderInfo?.full_name || orderInfo?.customer_id || "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        SĐT: {orderInfo?.phone_number || "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {orderInfo?.email || "N/A"}
                      </Text>
                    </Box>

                    <Grid gutter={5}>
                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Mã đơn hàng:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">#{orderInfo?.contract_code || orderInfo?.order_code || "N/A"}</Text>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Ngày tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">{(orderInfo?.order_date || orderInfo?.created_at) ? new Date((orderInfo.order_date || orderInfo.created_at) as string).toLocaleDateString("vi-VN") : "N/A"}</Text>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Người tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">{orderInfo?.created_by_name || orderInfo?.seller_id || "N/A"}</Text>
                      </Grid.Col>
                    </Grid>

                    <Stack gap="md">
                      {payments.map((item: OrderPaymentItem, idx: number) => (
                        <Box key={idx}>
                          <Group justify="space-between">
                            <Text size="sm" fw={600}>
                              {item.payment_stage || item.title || "Thanh toán"}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {(item.created_at || item.payment_date) ? new Date((item.created_at || item.payment_date) as string).toLocaleDateString("vi-VN") : "N/A"}
                            </Text>
                            <Text size="sm" fw={600}>
                              {(item.total_amount_vn || item.amount)?.toLocaleString("vi-VN")}
                            </Text>
                          </Group>
                          <Divider mt="sm" />
                        </Box>
                      ))}
                    </Stack>

                    <Group align="flex-start" wrap="nowrap" gap="lg">
                      <Stack align="center" gap={5}>
                        <Box bg="gray.1" p="sm">
                          <IconCheck size={36} color="#adb5bd" />
                        </Box>
                        <Text size="10px" c="dimmed" ta="center">
                          Ấn để tải file đính kèm
                        </Text>
                      </Stack>

                      <Box bg="#f1f3f5" p="md" style={{ flex: 1 }}>
                        <Stack gap={5}>
                          <Group justify="space-between">
                            <Text size="xs">
                              Tổng chi phí cần thanh toán
                            </Text>
                            <Text size="xs" fw={700}>
                              {(orderInfo?.total_price_at_sale_vi || orderInfo?.total_amount)?.toLocaleString("vi-VN") || 0}
                            </Text>
                          </Group>

                          <Group justify="space-between">
                            <Text size="xs">
                              Tổng chi phí đã thanh toán
                            </Text>
                            <Text size="xs" fw={700}>
                              {orderInfo?.paid_amount?.toLocaleString("vi-VN") || 0}
                            </Text>
                          </Group>

                          <Group justify="space-between">
                            <Text size="xs">Chiết khấu</Text>
                            <Text size="xs" fw={700}>
                              {(orderInfo?.discount_amount || 0).toLocaleString("vi-VN")}
                            </Text>
                          </Group>

                          <Divider my={6} />

                          <Group
                            justify="space-between"
                            align="flex-end"
                          >
                            <Text size="xs" fw={700}>
                              Chi phí còn phải thanh toán
                            </Text>
                            <Stack gap={0} align="flex-end">
                              <Text fw={800} size="xl" lh={1}>
                                {(orderInfo?.remaining_amount || 0).toLocaleString("vi-VN")}
                              </Text>
                              <Text size="10px">(VNĐ)</Text>
                            </Stack>
                          </Group>
                        </Stack>
                      </Box>
                    </Group>
                  </Stack>
                </Card>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

    </>
  );
}

