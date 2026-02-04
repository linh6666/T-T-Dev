"use client";

import {
  Card,
  Text,
  Stack,
  Title,
 
  Group,
  ScrollArea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getListCustomer } from "../../../../api/apigetlistcustomer";

/* =======================
   TYPE
======================= */
interface Project {
  id: string;
}

interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  detal_address: string;
  creation_time: string;
  introducer_email: string;
  province_id: string;
  ward_id: string;
}

interface Props {
  project: Project | null;
}

/* =======================
   COMPONENT
======================= */
export default function ProjectDetail({ project }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project?.id) return;

    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await getListCustomer(project.id);
        setCustomers(res.items || []);
        setTotalCustomer(res.total || 0);
      } catch (error) {
        console.error("Lỗi lấy danh sách khách hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [project?.id]);

  if (!project) return null;

  return (
    <Card shadow="md" radius="md" withBorder>
      {/* ===== HEADER (KHÔNG SCROLL) ===== */}
      <Group justify="space-between" align="center">
        <Title order={4}>Danh sách khách hàng</Title>

        <Text fw={500}>Số lượng: {loading ? "..." : totalCustomer}</Text>
      </Group>

      {/* ===== CONTENT (SCROLL) ===== */}
      <ScrollArea h={580} mt="sm" type="auto">
        <Stack gap="md">
          {loading && <Text>Đang tải dữ liệu...</Text>}

          {!loading && customers && customers.length === 0 && (
            <Text c="dimmed">Không có khách hàng nào</Text>
          )}

          {!loading &&
            customers &&
            customers.map((customer) => (
              <Card key={customer.id} withBorder radius="sm" p="sm">
                <Stack gap={4}>
                  <Text fw={500}>Họ tên: {customer.full_name}</Text>

                  <Text>Email: {customer.email}</Text>
                  <Text>Số điện thoại: {customer.phone}</Text>
                  <Text>Địa chỉ: {customer.detal_address}</Text>

                  <Text>
                    Người giới thiệu: {customer.introducer_email || "—"}
                  </Text>

                  <Text>
                    Ngày tham gia:{" "}
                    {new Date(customer.creation_time).toLocaleDateString(
                      "vi-VN"
                    )}
                  </Text>
                </Stack>
              </Card>
            ))}
        </Stack>
      </ScrollArea>
    </Card>
  );
}
