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
import { NotificationExtension } from "../../../extension/NotificationExtension";

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

const PropertyImageComponent = ({ projectId, unitCode, className }: { projectId: string; unitCode: string; className?: string }) => {
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
      className={className || styles.propertyImage} 
      style={imgUrl ? { backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} 
    />
  );
};

export default function MyOder({ projectId }: MyOderProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Handle Search Filtering
  const query = searchQuery.toLowerCase().trim();
  
  const pendingOrders = orders.filter(o => o.status !== 'approved');
  const filteredPendingOrders = pendingOrders.filter(o => 
    o.unit_code?.toLowerCase().includes(query) ||
    o.customer_name?.toLowerCase().includes(query) ||
    o.contract_code?.toLowerCase().includes(query) ||
    o.requester_name?.toLowerCase().includes(query)
  );

  const approvedOrders = orders.filter(o => o.status === 'approved');
  const filteredApprovedOrders = approvedOrders.filter(o => 
    o.unit_code?.toLowerCase().includes(query) ||
    o.customer_name?.toLowerCase().includes(query) ||
    o.contract_code?.toLowerCase().includes(query)
  );

  return (
    <Box className={styles.container} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* 1. Search Bar */}
      <Box className={styles.searchBox}>
        <TextInput
          placeholder="Tìm kiếm mã căn, khách hàng, mã đơn..."
          leftSection={<IconSearch size={20} stroke={1.5} color="#8c5b3f" />}
          radius="xl"
          classNames={{ input: styles.searchInput }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Optionally trigger search if it were API-based, 
              // but for client-side, we just ensure it doesn't do anything weird
              console.log("Searching for:", searchQuery);
            }
          }}
        />
      </Box>

      {/* 3. Main Content Row - Pending/Rejected orders Scroll Area */}
      <Box className={`${styles.ordersListWrapper} ${visibleCount > 1 ? styles.expanded : ''}`}>
        {/* Sticky Header for Pending orders List */}
        <Flex className={`${styles.header} ${styles.stickyHeader}`}>
          <Text className={styles.title}>
            Danh sách đơn hàng phê duyệt
          </Text>
          <Badge
            className={styles.headerBadge}
            variant="filled"
            radius="lg"
          >
            {`Có ${filteredPendingOrders.length < 10 ? '0' + filteredPendingOrders.length : filteredPendingOrders.length} đơn hàng`}
          </Badge>
        </Flex>

        {filteredPendingOrders.map((order, index) => {
          const handleUpdatePayment = async (status: "approved" | "rejected") => {
            if (!order.id || !projectId) return;
            try {
              await updateRequest(order.id, projectId, {
                status,
                approver_id: currentUser?.id,
                approver_at: new Date().toISOString(),
                response_message_vi: "", 
                response_message_en: ""
              });
              NotificationExtension.Success(`${status === "approved" ? "Duyệt" : "Từ chối"} yêu cầu thành công`);
              const response = await getListOrder(projectId);
              if (response && response.items) {
                setOrders(response.items);
              }
            } catch (error) {
              console.error(`Lỗi cập nhật yêu cầu (${status}):`, error);
              NotificationExtension.Fails(`Có lỗi xảy ra khi ${status === "approved" ? "duyệt" : "từ chối"} yêu cầu.`);
            }
          };

          return (
            <Flex key={order.id || index} className={styles.mainFlex} style={{ marginBottom: 24 }}>
              <Box className={styles.salesCard}>
                <Flex justify="space-between" align="flex-start" w="100%">
                  <Box className={styles.avatarCircle}>
                    <Box className={styles.avatarHead} />
                    <Box className={styles.avatarShoulders} />
                  </Box>
                  <Text className={styles.salesLabel}>Sales</Text>
                </Flex>
                <Stack gap={0} mt="auto" mb={4}>
                  <Text className={styles.salesName}>{order.requester_name || "Nguyễn Văn A"}</Text>
                  <Text className={styles.salesInfo}>{order.requester_email|| "nguyenvana@gmail.com"}</Text>
                </Stack>
              </Box>

              <Box className={styles.propertyCard}>
                <PropertyImageComponent projectId={projectId as string} unitCode={order.unit_code || ""} />
                <Stack className={styles.propertyContent} gap={4}>
                  <Box>
                    <Flex justify="space-between" align="flex-start">
                      <Box>
                        <Text className={styles.propertyTitle}>{order.unit_code || "SH1.7"}</Text>
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
                  </Box>
                  <Flex justify="space-between" align="flex-end">
                    <Group gap={8} align="center">
                      <Text className={styles.orderLabel}>Mã đơn hàng:</Text>
                      <Box className={styles.orderCodeBox}>
                        <Text className={styles.orderCodeText}>{order.contract_code || "#865456"}</Text>
                      </Box>
                    </Group>
                    <Text className={styles.orderDate}>
                      {order.requested_at ? new Date(order.requested_at).toLocaleString('vi-VN') : "19/01/2026, 11:00 PM"}
                    </Text>
                  </Flex>
                </Stack>
              </Box>

              <Stack className={styles.customerStack}>
                <Box className={styles.customerCard}>
                  <Text className={styles.customerTitle}>Thông tin khách hàng</Text>
                  <Stack gap={6}>
                    <Flex>
                      <Text className={styles.infoLabel}>Tên khách hàng:</Text>
                      <Text className={styles.infoValue}>{order.customer_name || "Nguyễn Thị B"}</Text>
                    </Flex>
                    <Flex>
                      <Text className={styles.infoLabel}>Email khách hàng:</Text>
                      <Text className={`${styles.infoValue} ${styles.emailValue}`}>{order.customer_email || "nguyenthib@gmail.com"}</Text>
                    </Flex>
                  </Stack>
                </Box>

                {order.status === "rejected" ? (
                  <Box className={styles.rejectedMessage}>Đơn hàng đã bị từ chối</Box>
                ) : (
                  <Flex gap="sm">
                    <Button className={styles.buttonRefuse} radius="md" size="md" variant="filled" flex={1} onClick={() => handleUpdatePayment("rejected")}>Từ chối xét duyệt</Button>
                    <Button className={styles.buttonApprove} radius="md" size="md" variant="filled" flex={1} onClick={() => handleUpdatePayment("approved")}>Duyệt đơn hàng</Button>
                  </Flex>
                )}
              </Stack>
            </Flex>
          );
        })}
      </Box>

      {/* 4. Load More Button */}
      {orders.filter(o => o.status !== 'approved').length > 1 && (
        <Flex justify="center" gap="md" mt={-18} mb={24} style={{ position: 'relative', zIndex: 2 }}>
          {visibleCount > 1 ? (
            <Box className={styles.loadMoreButtonCustom} onClick={() => setVisibleCount(1)}>
              <IconChevronUp size={18} stroke={1.5} color="#495057" />
              <Text className={styles.loadMoreText} style={{ marginTop: -2 }}>Thu gọn</Text>
            </Box>
          ) : (
            <Box className={styles.loadMoreButtonCustom} onClick={() => setVisibleCount(orders.filter(o => o.status !== 'approved').length)}>
              <Text className={styles.loadMoreText} style={{ marginBottom: -2 }}>Xem thêm</Text>
              <IconChevronDown size={18} stroke={1.5} color="#495057" />
            </Box>
          )}
        </Flex>
      )}

      {/* 5. New Order Management Section - Only Approved Orders */}
      <Box className={styles.newOrdersSection}>
        <Box className={styles.orderGridWrapper}>
          {/* Sticky Header for Approved orders Grid */}
          <Flex justify="space-between" align="center" className={styles.stickyHeader} style={{ paddingTop: 10 }}>
            <Flex align="center" gap="md">
              <Text className={styles.title}>Quản lý đơn hàng</Text>
              <Badge
                className={styles.headerBadge}
                variant="filled"
                radius="lg"
              >
                {`Có ${filteredApprovedOrders.length < 10 ? '0' + filteredApprovedOrders.length : filteredApprovedOrders.length} đơn đã phê duyệt`}
              </Badge>
            </Flex>
            <Button variant="outline" className={styles.editButton} radius="xl">
              Chỉnh sửa
            </Button>
          </Flex>

          <Box className={styles.orderGrid}>
            {filteredApprovedOrders.map((order, index) => (
              <Box key={order.id || index} className={styles.newOrderCard}>
                <PropertyImageComponent projectId={projectId as string} unitCode={order.unit_code || ""} className={styles.newOrderImage} />
                <Box className={styles.newOrderContent}>
                  <Box>
                    <Text className={styles.newOrderTitle}>{order.unit_code || "SH4.3"}</Text>
                  </Box>
                  <Badge
                    className={`${styles.newOrderStatusBadge} ${order.status === 'approved' ? styles.badgeApproved : styles.badgePending}`}
                    variant="light"
                    radius="xl"
                  >
                     {order.status === 'approved' ? 'Đơn đã duyệt' : 'Chờ thanh toán'}
                  </Badge>
                  <Box className={styles.newOrderFooter}>
                    <Box className={styles.footerGroup}>
                      <Text className={styles.footerLabel}>Mã đơn hàng:</Text>
                      <Box className={styles.footerCode}>{order.contract_code || "#845790"}</Box>
                    </Box>
                    <Text className={styles.footerDate}>
                      {order.requested_at ? new Date(order.requested_at).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : "02/01/2026, 9:30 AM"}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
