"use client";

import {
  Card,
  Text,
  Title,
  Group,
  Badge,
  Grid,
  Divider,
  Stack,
  Box,
  Container,
  Button,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import CreatePaymentModal from "./CreatePaymentModal";


/* =======================
   PROPS
======================= */
interface OrderDetailPageProps {
  projectId: string | null;
}

export default function OrderDetailPage({
  projectId,
}: OrderDetailPageProps) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

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
                    SH1.13
                  </Title>

                  <Badge
                    color="#d3f9d8"
                    c="#2b8a3e"
                    variant="filled"
                    radius="xl"
                    px={15}
                  >
                    Đã thanh toán
                  </Badge>
                </Group>

                <Card shadow="xs" radius="lg" p={0}>
                  <Box p="xl" bg="white">
                    <Grid gutter="xs">
                      <Grid.Col span={3}>
                        <Text size="sm" c="dimmed">
                          Mã đơn hàng:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Text size="sm">#856432</Text>
                      </Grid.Col>

                      <Grid.Col span={3}>
                        <Text size="sm" c="dimmed">
                          Ngày tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Text size="sm">24/12/2025</Text>
                      </Grid.Col>

                      <Grid.Col span={3}>
                        <Text size="sm" c="dimmed">
                          Người tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Text size="sm">Phạm Thị Sale</Text>
                      </Grid.Col>
                    </Grid>

                    <Group mt="xl" align="flex-start" wrap="nowrap">
                      <Text size="sm" c="dimmed">
                        Lời nhắn từ Sale:
                      </Text>
                      <Text size="sm">
                        Đơn hàng đang thanh toán, vui lòng thanh toán kỳ hạn tiếp
                        theo trước ngày xx/xx/xxxx theo hợp đồng.
                      </Text>
                    </Group>
                  </Box>
                </Card>

                {/* NÚT DÍNH ĐÁY */}
                <Group mt="auto" pt="md" justify="center" gap="sm">
                  <Button
                    variant="outline"
                    color="dark"
                    radius="md"
                    leftSection={<span style={{ fontSize: 18 }}>+</span>}
                    onClick={open}
                  >
                    Tạo đơn thanh toán mới
                  </Button>

                  <Button color="red" radius="md">
                    ✕ Hủy đơn hàng
                  </Button>
                </Group>
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
                        NGUYỄN VĂN A
                      </Text>
                      <Text size="xs" c="dimmed">
                        SĐT: 098765432
                      </Text>
                      <Text size="xs" c="dimmed">
                        Company@example.com
                      </Text>
                    </Box>

                    <Grid gutter={5}>
                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Mã đơn hàng:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">#856432</Text>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Ngày tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">23/01/2026</Text>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Người tạo đơn:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6} ta="right">
                        <Text size="xs">Phạm Thị Sale</Text>
                      </Grid.Col>
                    </Grid>

                    <Stack gap="md">
                      {[
                        {
                          label: "Đặt cọc",
                          date: "01/01/2026",
                          price: "500.000.000",
                        },
                        {
                          label: "Thanh toán lần 2",
                          date: "08/01/2026",
                          price: "1.000.000.000",
                        },
                        {
                          label: "Thanh toán lần 3",
                          date: "15/01/2026",
                          price: "5.000.000.000",
                        },
                        {
                          label: "Thanh toán toàn bộ",
                          date: "23/01/2026",
                          price: "2.300.000.000",
                        },
                      ].map((item, idx) => (
                        <Box key={idx}>
                          <Group justify="space-between">
                            <Text size="sm" fw={600}>
                              {item.label}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {item.date}
                            </Text>
                            <Text size="sm" fw={600}>
                              {item.price}
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
                              9.000.000.000
                            </Text>
                          </Group>

                          <Group justify="space-between">
                            <Text size="xs">
                              Tổng chi phí đã thanh toán
                            </Text>
                            <Text size="xs" fw={700}>
                              8.800.000.000
                            </Text>
                          </Group>

                          <Group justify="space-between">
                            <Text size="xs">Chiết khấu</Text>
                            <Text size="xs" fw={700}>
                              -200.000.000
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
                                0
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

      {/* MODAL */}
      <CreatePaymentModal
        opened={opened}
        onClose={close}
        projectId={projectId}
      />
    </>
  );
}

