"use client";
import { useEffect, useState } from "react";

import {
  TextInput,
  Text,
  Badge,
  Group,
  Stack,
  // Button,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
  IconFolder,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { getListOrder } from "../../../api/apiGetlistRequest";
import { Getlisthome } from "../../../api/apiGetListHome";

// import { updateRequest } from "../../../api/apiLockRequest";
import { getCurrentUser } from "../../../api/apiProfile";
// import { NotificationExtension } from "../../../extension/NotificationExtension";

interface MyOderProps {
  projectId?: string;
}

export interface OrderItem {
  id?: string;
  seller_name?: string
  requester_email?: string;
  seller_phone?: string;
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
  const [, setCurrentUser] = useState<{ id: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  
  const viewContract = (url: string) => {
    if (!url) {
      console.warn("No contract URL provided");
      return;
    }
    
    const finalUrl = url.startsWith("http") ? url : `https://www.vietmodel.com.vn${url}`;
    window.open(finalUrl, "_blank");
  };

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
    o.seller_name?.toLowerCase().includes(query)
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
          return (
            <Flex 
              key={order.id || index} 
              className={styles.mainFlex} 
              style={{ marginBottom: 24, cursor: "pointer" }}
              onClick={() => {
                if (order.id) {
                  router.push(`/chi-tiet-don-hang/${order.id}?project_id=${projectId}`);
                }
              }}
            >
              <Box className={styles.salesCard}>
                <Flex justify="space-between" align="flex-start" w="100%">
                  <Box className={styles.avatarCircle}>
                    <Box className={styles.avatarHead} />
                    <Box className={styles.avatarShoulders} />
                  </Box>
                  <Text className={styles.salesLabel}>Sales</Text>
                </Flex>
                <Stack gap={0} mt="auto" mb={4}>
                  <Text className={styles.salesName}>{order.seller_name || "Nguyễn Văn A"}</Text>
                  <Text className={styles.salesInfo}>{order.requester_email|| "nguyenvana@gmail.com"}</Text>
                  <Text className={styles.salesInfo}>{order.seller_phone || "0123456789"}</Text>
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

                      {order.contract_url && (
                        <Box 
                          className={styles.folderIconContainer}
                          onClick={(e) => {
                            e.stopPropagation();
                            viewContract(order.contract_url!);
                          }}
                        >
                          <IconFolder size={75} color="#8c5b3f" stroke={1.5} />
                        </Box>
                      )}
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
                    <Flex>
                      <Text className={styles.infoLabel}>SĐT Liên hệ:</Text>
                      <Text className={`${styles.infoValue} ${styles.emailValue}`}>{order.customer_phone || "0123456789"}</Text>
                    </Flex>
                      <Flex>
                      <Text className={styles.infoLabel}>Số CCCD/CMND:</Text>
                      <Text className={`${styles.infoValue} ${styles.emailValue}`}>{order.id_cccd || "0123456789"}</Text>
                    </Flex>
                  </Stack>
                </Box>

                {order.status === "rejected" && (
                  <Box className={styles.rejectedMessage}>Đơn hàng đã bị từ chối</Box>
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


    </Box>
  );
}
