"use client";
import { useEffect, useState } from "react";

import {
  TextInput,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import styles from "./styles.module.css";
import { getListOrder } from "../../../api/apiGetlistRequest";
import { Getlisthome } from "../../../api/apiGetListHome";
import { updateRequest } from "../../../api/apiLockRequest";
import { getCurrentUser } from "../../../api/apiProfile";

interface MyOderProps {
  projectId?: string;
}

export interface OrderItem {
  id?: string;
  requester_name?: string
  requester_email?: string;
  requester_phone?: string;
  unit_code?: string;
  status?: string;
  total_price_at_sale_vi?: number;
  contract_code?: string;
  requested_at?: string;
  contract_url?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  id_cccd?: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ khóa căn hộ ", color: "yellow" },
  approved: { label: "Đã duyệt", color: "green" },
  rejected: { label: "Đơn đã hủy", color: "red" },
  expired: { label: "Đã hết hạn", color: "gray" },
};

const PropertyImageComponent = ({ projectId, unitCode }: { projectId: string; unitCode: string }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!projectId || !unitCode) return;
      try {
        const response = await Getlisthome({ project_id: projectId, unit_code: unitCode });
        if (Array.isArray(response)) {
          const imageData = response.filter((item: { url?: string }) => item.url?.match(/\.(jpg|jpeg|png|gif)$/i));
          if (imageData.length > 0) {
            setImgUrl(imageData[0].url);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy hình ảnh:", error);
      }
    };
    fetchImage();
  }, [projectId, unitCode]);

  return (
    <Box 
      className={styles.propertyImage} 
      style={imgUrl ? { backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} 
    />
  );
};

export default function MyOder({ projectId }: MyOderProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!projectId) return;
      try {
        const response = await getListOrder(projectId);
        if (response && response.items) {
          setOrders(response.items);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, [projectId]);

  return (
    <Box className={styles.container} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* 1. Search Bar and Header wrapper for sticky effect */}
      <Box className={styles.stickyTop}>
        <Box className={styles.searchBox}>
          <TextInput
            placeholder="Tìm kiếm..."
            leftSection={<IconSearch size={20} stroke={1.5} color="#8c5b3f" />}
            radius="xl"
            classNames={{ input: styles.searchInput }}
          />
        </Box>

        {/* 2. Header */}
        <Flex className={styles.header}>
          <Text className={styles.title}>
            Danh sách đơn hàng phê duyệt
          </Text>
          <Badge
            className={styles.headerBadge}
            variant="filled"
            radius="lg"
          >
            {`Có ${orders.length < 10 ? '0' + orders.length : orders.length} đơn hàng chờ phê duyệt`}
          </Badge>
        </Flex>
      </Box>

      {/* 3. Main Content Row */}
      <Box className={`${styles.ordersListWrapper} ${visibleCount > 1 ? styles.expanded : ''}`}>
        {orders.map((order, index) => {
          const handleUpdatePayment = async (status: "approved" | "rejected") => {
            if (!order.id || !projectId) return;
            try {
              await updateRequest(order.id, projectId, {
                status,
                approver_id: currentUser?.id,
                approver_at: new Date().toISOString(),
                response_message_vi: "", // Có thể bổ sung input nếu cần
                response_message_en: ""
              });
              // Refresh orders list
              const response = await getListOrder(projectId);
              if (response && response.items) {
                setOrders(response.items);
              }
            } catch (error) {
              console.error(`Lỗi cập nhật yêu cầu (${status}):`, error);
              alert(
                `Có lỗi xảy ra khi ${
                  status === "approved" ? "duyệt" : "từ chối"
                } yêu cầu.`
              );
            }
          };

          return (
            <Flex key={order.id || index} className={styles.mainFlex} style={{ marginBottom: 24 }}>
              
              {/* Column 1: Sales Card */}
              <Box className={styles.salesCard}>
                {/* Top Row: Avatar and Sales label */}
                <Flex justify="space-between" align="flex-start" w="100%">
                  {/* White Avatar Circle */}
                  <Box className={styles.avatarCircle}>
                    {/* Person Icon Silhouette */}
                    <Box className={styles.avatarHead} />
                    <Box className={styles.avatarShoulders} />
                  </Box>

                  <Text className={styles.salesLabel}>
                    Sales
                  </Text>
                </Flex>

                {/* Bottom Content: Name and Info */}
                <Stack gap={0} mt="auto" mb={4}>
                  <Text className={styles.salesName}>
                    {order.requester_name || "Nguyễn Văn A"}
                  </Text>
                  <Text className={styles.salesInfo}>
                    {order.requester_email|| "nguyenvana@gmail.com"}
                  </Text>
                  {/* <Text className={styles.salesInfo}>
                    {order.requester_phone || "0987654321"}
                  </Text> */}
                </Stack>
              </Box>

              {/* Column 2: Order Details Card */}
              <Box className={styles.propertyCard}>
                {/* Property Image Placeholder or Data */}
                <PropertyImageComponent projectId={projectId as string} unitCode={order.unit_code || ""} />
                
                <Stack className={styles.propertyContent} gap={4}>
                  <Box>
                    <Flex justify="space-between" align="flex-start">
                      <Box>
                        <Text className={styles.propertyTitle}>
                          {order.unit_code || "SH1.7"}
                        </Text>
                      </Box>
                      <Badge
                        className={styles.propertyBadge}
                        radius="xl"
                        color={statusConfig[order.status || ""]?.color || "gray"}
                        variant="light"
                      >
                        {statusConfig[order.status || ""]?.label || order.status || "Chờ khóa căn hộ"}
                      </Badge>
                    </Flex>

                    {/* <Box mt="sm">
                      <Text className={styles.price}>
                        {order.total_price_at_sale_vi ? order.total_price_at_sale_vi.toLocaleString() : "10.500.000.000"}
                      </Text>
                    </Box> */}
                  </Box>

                  {/* Bottom Row inside middle card */}
                  <Flex justify="space-between" align="flex-end">
                    <Group gap={8} align="center">
                      <Text className={styles.orderLabel}>
                        Mã đơn hàng:
                      </Text>
                      <Box className={styles.orderCodeBox}>
                        <Text className={styles.orderCodeText}>
                          {order.contract_code || "#865456"}
                        </Text>
                      </Box>
                    </Group>
                    <Text className={styles.orderDate}>
                      {order.requested_at ? new Date(order.requested_at).toLocaleString('vi-VN') : "19/01/2026, 11:00 PM"}
                    </Text>
                  </Flex>
                </Stack>

                {/* Folder Icon Shadow Overlay Rendering */}
                {/* <Box 
                  component="a" 
                  href={order.contract_url || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.folderIconContainer}
                  style={{ cursor: 'pointer' }}
                >
                  <IconFolder size={100} stroke={1} color="#474645c9" className={styles.folderIcon} />
                </Box> */}
              </Box>

              {/* Column 3: Customer Info & Buttons Container */}
              <Stack className={styles.customerStack}>
                {/* Customer Info Box */}
                <Box className={styles.customerCard}>
                  <Text className={styles.customerTitle}>
                    Thông tin khách hàng
                  </Text>
                  
                  <Stack gap={6}>
                    <Flex>
                      <Text className={styles.infoLabel}>Tên khách hàng:</Text>
                      <Text className={styles.infoValue}>{order.customer_name || "Nguyễn Thị B"}</Text>
                    </Flex>
                    <Flex>
                      <Text className={styles.infoLabel}>Email khách hàng:</Text>
                      <Text className={`${styles.infoValue} ${styles.emailValue}`}>{order.customer_email || "nguyenthib@gmail.com"}</Text>
                    </Flex>
                    {/* <Flex>
                      <Text className={styles.infoLabel}>SĐT liên hệ:</Text>
                      <Text className={styles.infoValue}>{order.customer_phone || "0987654321"}</Text>
                    </Flex>
                    <Flex>
                      <Text className={styles.infoLabel}>Số CCCD/CMND:</Text>
                      <Text className={styles.infoValue}>{order.id_cccd || "112233445566"}</Text>
                    </Flex> */}
                  </Stack>
                </Box>

                {/* Buttons Row or Status Message */}
                {order.status === "rejected" ? (
                  <Box className={styles.rejectedMessage}>
                    Đơn hàng đã bị từ chối
                  </Box>
                ) : order.status === "approved" ? (
                  <Box className={styles.approvedMessage}>
                    Đơn hàng đã được duyệt
                  </Box>
                ) : (
                  <Flex gap="sm">
                    <Button
                      className={styles.buttonRefuse}
                      radius="md"
                      size="md"
                      variant="filled"
                      flex={1}
                      onClick={() => handleUpdatePayment("rejected")}
                    >
                      Từ chối xét duyệt
                    </Button>
                    <Button
                      className={styles.buttonApprove}
                      radius="md"
                      size="md"
                      variant="filled"
                      flex={1}
                      onClick={() => handleUpdatePayment("approved")}
                    >
                      Duyệt đơn hàng
                    </Button>
                  </Flex>
                )}
              </Stack>

            </Flex>
          );
        })}
      </Box>

      {/* 4. Load More Button - Logic updated to expand the scrollable view */}
      {orders.length > 1 && (
        <Flex justify="center" gap="md" mt={-18} mb={24} style={{ position: 'relative', zIndex: 2 }}>
          {visibleCount > 1 && (
            <Box
              className={styles.loadMoreButtonCustom}
              onClick={() => setVisibleCount(1)}
            >
              <IconChevronUp size={18} stroke={1.5} color="#495057" />
              <Text className={styles.loadMoreText} style={{ marginTop: -2 }}>Thu gọn</Text>
            </Box>
          )}

          {visibleCount <= 1 && (
            <Box
              className={styles.loadMoreButtonCustom}
              onClick={() => setVisibleCount(orders.length)}
            >
              <Text className={styles.loadMoreText} style={{ marginBottom: -2 }}>Xem thêm</Text>
              <IconChevronDown size={18} stroke={1.5} color="#495057" />
            </Box>
          )}
        </Flex>
      )}

        <Flex className={styles.header}>
          <Text className={styles.title}>
            Quản lí đơn hàng 
          </Text>
          <Badge
            className={styles.headerBadge}
            variant="filled"
            radius="lg"
          >
            {`Có ${orders.length < 10 ? '0' + orders.length : orders.length} đơn hàng chờ phê duyệt`}
          </Badge>
        </Flex>
    </Box>
  );
}
