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
import { IconArrowLeft, IconFolder } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Badge, Loader, Center } from "@mantine/core";
import { getOrderPaymentByOrderId } from "../../api/apiGetlistdetailOder";
import CreatePaymentModal from "./CreatePaymentModal";
import { getListOrder } from "../../api/apiGetlistOrder";
// import { api } from "../../libray/axios";
// import axios from "axios";



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
  accountant_status?: string;
  pay_date?: string;
  seller_name?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  contract_url?: string;
  id_cccd?: string;
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
  const [orderDetail, setOrderDetail] = useState<OrderPaymentItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states for inline creation
  const [isCreating, setIsCreating] = useState(false);
  // const [formLoading, setFormLoading] = useState(false);

  const downloadContract = async (url: string) => {
    if (!url) {
      console.warn("No contract URL provided");
      return;
    }
    
    // Check if URL is absolute or needs prefixing
    const finalUrl = url.startsWith("http") ? url : `https://www.vietmodel.com.vn${url}`;

    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error("Failed to fetch file");
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;
      a.download = `hop-dong-${orderId || "file"}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Blob download failed, falling back to direct link:", error);
      // Fallback: If CORS or other error occurs, try direct download via link
      const link = document.createElement("a");
      link.href = finalUrl;
      link.target = "_blank";
      link.download = `hop-dong-${orderId || "file"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderPaymentByOrderId(orderId, projectId);
      setPaymentData(data);

      if (projectId) {
        const orderList = await getListOrder(projectId);
        if (orderList && orderList.items) {
          const matchingOrder = orderList.items.find(
            (item: OrderPaymentItem) => item.id.toString() === orderId
          );
          setOrderDetail(matchingOrder);
        }
      }
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
  const orderInfo = { ...orderDetail, ...(payments[0] || {}) }; // Combine data, prioritize payment item info for names/details

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
      <Box >
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
                    initialData={{
                      customer_name: orderInfo?.customer_name,
                      customer_phone: orderInfo?.customer_phone,
                      id_cccd: orderInfo?.id_cccd,
                      customer_email: orderInfo?.customer_email,
                      invoice_code: orderId,
                    }}
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
                     <Grid.Col span={9}>
                        <Text size="xl" fw={700}>
                          {(
                            {
                              pending: "Đang chờ manager khóa căn hộ",
                              pending_deposit: "Đang chờ đơn thanh toán đầu tiên được duyệt",
                              paying: "Đang thanh toán",
                              completed: "Đã thanh toán hoàn tất",
                              cancelled: "Đã hủy đơn hàng",
                              expired: "Đơn thanh toán chưa được tạo hoặc không được duyệt - hết hạn",
                            } as Record<string, string>
                          )[orderInfo?.manager_status || orderInfo?.accountant_status || ""] || "N/A"}
                        </Text>
 
</Grid.Col>

<Grid.Col span={3}>
 
</Grid.Col> 
                            
                          
                         <Grid.Col span={3}>
  <Text size="sm" c="dimmed">
    Thanh Toán:
  </Text>
</Grid.Col>

<Grid.Col span={9}>
  <Text size="sm">
    {orderInfo?.total_price_at_sale_vi
      ? new Intl.NumberFormat("vi-VN").format(
          Number(orderInfo.total_price_at_sale_vi)
        ) + " đ"
      : orderInfo?.order_code || "N/A"}
  </Text>
</Grid.Col>
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
                            <Text size="sm">{ (orderInfo?.pay_date || orderInfo?.created_at) ? new Date((orderInfo.
pay_date
 || orderInfo.created_at) as string).toLocaleDateString("vi-VN") : "N/A"}</Text>
                          </Grid.Col>

                          <Grid.Col span={3}>
                            <Text size="sm" c="dimmed">
                              Người tạo đơn:
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={9}>
                            <Text size="sm">{orderInfo?.seller_name || orderInfo?.seller_id || "N/A"}</Text>
                          </Grid.Col>
                        </Grid>

                        <Group mt="xl" align="flex-start" wrap="nowrap">
                          <Text size="sm" c="dimmed">
                            Lời nhắn từ hệ thống:
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
                    <Group justify="space-between" align="center" mb="md">
  <Text fw={600} size="md">
    ĐƠN THANH TOÁN
  </Text>

  <Text size="sm">
  
    <Text component="span" >
      #{orderInfo?.contract_code || orderInfo?.order_code || "N/A"}
    </Text>
  </Text>
</Group>
  <Text size="xs" c="dimmed">
                     Tên: {orderInfo?.
customer_name
 || "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        SĐT: {orderInfo?.customer_phone
 || "N/A"}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {orderInfo?.customer_email || "N/A"}
                      </Text>
                    </Box>

                   <Grid gutter={5}>
  <Grid.Col span={12}>
    <Text size="xs" c="dimmed">
      Mã đơn hàng: #
      {orderInfo?.contract_code || orderInfo?.order_code || "N/A"}
    </Text>
  </Grid.Col>

  <Grid.Col span={12}>
    <Text size="xs" c="dimmed">
      Ngày tạo đơn:{" "}
      {(orderInfo?.pay_date || orderInfo?.created_at)
        ? new Date(
            (orderInfo?.pay_date || orderInfo?.created_at) as string
          ).toLocaleDateString("vi-VN")
        : "N/A"}
    </Text>
  </Grid.Col>

  <Grid.Col span={12}>
    <Text size="xs" c="dimmed">
      Người tạo đơn:{" "}
      {orderInfo?.seller_name || orderInfo?.seller_id || "N/A"}
    </Text>
  </Grid.Col>
</Grid>
<Divider mt="sm" />
                    <Stack gap="md">
                     
                    </Stack>
                    <Divider mt="sm" />

                    <Group align="flex-start" wrap="nowrap" gap="lg">
                  <Stack align="center" gap={5}>
  <Box p="sm">
    <IconFolder
      size={80}
      color="#adb5bd"
      style={{
        cursor: orderInfo?.contract_url ? "pointer" : "not-allowed",
      }}
      onClick={() => {
        if (orderInfo?.contract_url) {
          downloadContract(orderInfo.contract_url);
        }
      }}
    />
  </Box>

  <Text size="10px" c="dimmed" ta="center">
    {orderInfo?.contract_url
      ? "Ấn để tải file đính kèm"
      : "Không có file đính kèm"}
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

                    {/* IN-CARD FOOTER */}
                    <Box mt="xl">
                      <Divider mb="lg" />
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={2}>
                          <Text fw={700} size="xs" c="gray.7">T&T GROUP</Text>
                          <Box>
                            <Text size="10px" c="dimmed">Hotline: 0666888868</Text>
                            <Text size="10px" c="dimmed">Phone: 012345678</Text>
                            <Text size="10px" c="dimmed">Email: ttgroup@example.com</Text>
                          </Box>
                        </Stack>
                        
                        <Stack gap={0} align="flex-end" ta="right">
                          <Text size="10px" c="dimmed">Website</Text>
                          <Text size="10px" c="dimmed">ttgroup.example.com</Text>
                        </Stack>
                      </Group>
                      
                      <Text mt="md" size="10px" c="dimmed">
                        For any question please contact us at ttgroup@example.com
                      </Text>
                    </Box>
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

