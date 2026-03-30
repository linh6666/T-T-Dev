"use client";

import { useEffect, useState } from "react";
import { 
  Box, 
  Text, 
  Flex, 
  Stack, 
  Badge, 
  Progress, 
  Group, 
  Title,
  Divider,
} from "@mantine/core";
import { 
  IconShoppingCart, 
  IconUsers, 
  IconCheck, 
  IconFileInvoice,
} from "@tabler/icons-react";
import styles from "./styles.module.css";
import { getCurrentUser } from "../../../api/apiProfile";

interface User {
  full_name?: string;
  email?: string;
  id?: string;
}

export default function OverviewSale() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUser();
  }, []);

  const stats = [
    { label: "Tổng đơn hàng", value: "142", icon: <IconShoppingCart size={20} /> },
    { label: "Khách hàng mới", value: "28", icon: <IconUsers size={20} /> },
    { label: "Số nhà đã chốt", value: "64", icon: <IconCheck size={20} /> },
    { label: "Dự kiến (tỷ)", value: "4.2", icon: <IconFileInvoice size={20} /> },
  ];

  const activities = [
    { unit: "SH1.12", customer: "Nguyễn Văn Tuấn", price: "1.2 tỷ", status: "Chờ duyệt", color: "orange" },
    { unit: "LK5.08", customer: "Trần Thị Lan", price: "3.5 tỷ", status: "Đã chốt", color: "green" },
    { unit: "V3.02", customer: "Phạm Minh Hùng", price: "5.8 tỷ", status: "Đã chốt", color: "green" },
    { unit: "SH2.45", customer: "Lê Hoàng Anh", price: "1.1 tỷ", status: "Đã hủy", color: "red" },
  ];

  return (
    <Box className={styles.container}>
      {/* Tiêu đề đơn giản */}
      <Stack gap={0} mb={32}>
        <Title order={2} className={styles.title}>Tổng quan bán hàng</Title>
        <Text size="sm" color="dimmed">Chào mừng, {currentUser?.full_name || "Mạnh Hùng"}. Đây là tóm tắt hoạt động của bạn.</Text>
      </Stack>

      {/* Dashboard Stats */}
      <Box className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <Box key={i} className={styles.statCard}>
            <Flex justify="space-between" align="flex-start" mb={12}>
              <Text className={styles.statLabel}>{stat.label}</Text>
              <Box 
                className={styles.iconContainer} 
                style={{ 
                  backgroundColor: i === 0 ? '#e7f5ff' : i === 1 ? '#fff9db' : i === 2 ? '#ebfbee' : '#fff4e6',
                  color: i === 0 ? '#228be6' : i === 1 ? '#fab005' : i === 2 ? '#40c057' : '#8c5b3f'
                }}
              >
                {stat.icon}
              </Box>
            </Flex>
            <Text className={styles.statValue}>{stat.value}</Text>
          </Box>
        ))}
      </Box>

      <Flex gap={40} direction={{ base: 'column', md: 'row' }}>
        {/* Danh sách giao dịch mới */}
        <Box style={{ flex: 1 }} className={styles.section}>
          <Text className={styles.sectionTitle}>Giao dịch gần đây</Text>
          <Box className={styles.activityList}>
            {activities.map((item, i) => (
              <Box key={i} className={styles.activityItem}>
                <Stack gap={0}>
                  <Text fw={600} size="sm">{item.unit}</Text>
                  <Text size="xs" color="dimmed">{item.customer}</Text>
                </Stack>
                <Group gap="xl">
                  <Text fw={700} size="sm" color="#8c5b3f">{item.price}</Text>
                  <Badge variant="dot" color={item.color} size="sm">{item.status}</Badge>
                </Group>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mục tiêu đơn giản */}
        <Box w={{ base: '100%', md: '300px' }} className={styles.section}>
          <Text className={styles.sectionTitle}>Mục tiêu tháng này</Text>
          <Box className={styles.targetCard}>
            <Stack gap="xs">
              <Flex justify="space-between" align="center">
                <Text size="sm" fw={600}>Tiến độ</Text>
                <Text size="sm" fw={700}>75%</Text>
              </Flex>
              <Progress value={75} color="#8c5b3f" radius="xs" size="sm" />
              <Divider my={10} />
              <Stack gap={4}>
                <Text size="xs" color="dimmed">Đã chốt: 7.5 tỷ</Text>
                <Text size="xs" color="dimmed">Chỉ tiêu: 10 tỷ</Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}


