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
  Timeline,
  Box,
  Container,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function OrderDetailPage() {
  return (
    <Box bg="#efefef"  py={40}>
      <Container size="xl">
        <Grid gutter={40}>
          {/* ================= CỘT TRÁI (65%) ================= */}
          <Grid.Col span={7.5} style={{ position: 'relative' }}>
            <Timeline
              align="right"
              bulletSize={24}
              lineWidth={2}
              styles={{
                root: { paddingRight: 20 },
                item: { marginBottom: 30 },
                itemBullet: { 
                  backgroundColor: '#40c057', 
                  border: '2px solid white',
                },
             
                itemBody: { marginRight: 15 }
              }}
            >
              {/* CARD 1: SH1.13 */}
              <Timeline.Item bullet={<IconCheck size={14} color="white" />}>
                <Card shadow="xs" radius="lg" p={0} style={{ overflow: 'hidden' }}>
                  {/* Hiệu ứng Gradient mờ ở đầu card giống ảnh */}
                  <Box p="xl" style={{ 
                    background: 'linear-gradient(to bottom, #e9ecef 0%, #ffffff 20%)' 
                  }}>
                    <Group justify="space-between" mb="lg">
                      <Title order={3} fw={700} c="#333">SH1.13</Title>
                      <Badge color="#d3f9d8" c="#2b8a3e" variant="filled" radius="xl" px={15}>
                        Đã thanh toán
                      </Badge>
                    </Group>

                    <Grid gutter="xs">
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Mã đơn hàng:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">#856432</Text></Grid.Col>
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Ngày tạo đơn:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">24/12/2025</Text></Grid.Col>
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Người tạo đơn:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">Phạm Thị Sale</Text></Grid.Col>
                    </Grid>

                    <Group mt="xl" align="flex-start" wrap="nowrap">
                      <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>Lời nhắn từ Sale:</Text>
                      <Text size="sm" c="#555">Đơn hàng đang thanh toán, vui lòng thanh toán kỳ hạn tiếp theo trước ngày xx/xx/xxxx theo hợp đồng.</Text>
                    </Group>
                  </Box>
                </Card>
              </Timeline.Item>

              {/* CARD 2: ĐƠN THANH TOÁN LẦN 3 */}
              <Timeline.Item bullet={<IconCheck size={14} color="white" />}>
                <Card shadow="xs" radius="lg" p="xl">
                  <Title order={3} fw={700} mb="xl">Đơn thanh toán lần 3</Title>
                  
                  <Grid gutter="sm">
                    <Grid.Col span={3}><Text c="dimmed" size="sm">Thanh toán:</Text></Grid.Col>
                    <Grid.Col span={9}><Text fw={700} size="sm">7.500.000.000 / 9.000.000.000 VNĐ</Text></Grid.Col>
                    <Grid.Col span={3}><Text c="dimmed" size="sm">Mã đơn hàng:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size="sm">#856432</Text></Grid.Col>
                    <Grid.Col span={3}><Text c="dimmed" size="sm">Ngày tạo đơn:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size="sm">24/12/2025</Text></Grid.Col>
                    <Grid.Col span={3}><Text c="dimmed" size="sm">Người tạo đơn:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size="sm">Phạm Thị Sale</Text></Grid.Col>
                  </Grid>

                  <Stack mt="xl" gap="md">
                    {["Sale", "Quản lý", "Kế toán"].map((role) => (
                      <Group key={role} align="flex-start" wrap="nowrap">
                        <Text size="sm" c="dimmed" style={{ minWidth: 120 }}>Lời nhắn từ {role}:</Text>
                        <Text size="sm" c="#555">Đơn hàng đang thanh toán, vui lòng thanh toán kỳ hạn tiếp theo trước ngày xx/xx/xxxx theo hợp đồng.</Text>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Timeline.Item>

              {/* CARD 3: ĐƠN THANH TOÁN LẦN 4 (Bullet to xanh đậm) */}
              <Timeline.Item 
                bullet={<Box style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#fff' }} />}
                styles={{ itemBullet: { backgroundColor: '#345e72', border: 'none', width: 40, height: 40, right: -8 } }}
              >
                 <Card shadow="xs" radius="lg" p={0} style={{ overflow: 'hidden' }}>
                  <Box p="xl" style={{ background: 'linear-gradient(to bottom, #e9ecef 0%, #ffffff 20%)' }}>
                    <Title order={3} fw={700} mb="xl">Đơn thanh toán lần 4</Title>
                    <Grid gutter="sm">
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Thanh toán:</Text></Grid.Col>
                      <Grid.Col span={9}><Text fw={700} size="sm">9.000.000.000 / 9.000.000.000 VNĐ</Text></Grid.Col>
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Mã đơn hàng:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">#856432</Text></Grid.Col>
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Ngày tạo đơn:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">24/12/2025</Text></Grid.Col>
                      <Grid.Col span={3}><Text c="dimmed" size="sm">Người tạo đơn:</Text></Grid.Col>
                      <Grid.Col span={9}><Text size="sm">Phạm Thị Sale</Text></Grid.Col>
                    </Grid>
                  </Box>
                </Card>
              </Timeline.Item>
            </Timeline>
          </Grid.Col>

          {/* ================= CỘT PHẢI (35%) ================= */}
          <Grid.Col span={4.5}>
            <Card shadow="md" radius="sm" p={40} bg="white" style={{ borderTop: '15px solid #f8f1e5' }}>
              <Stack gap={30}>
                <Box>
                  <Text fw={500} size="md" c="dimmed">NGUYỄN VĂN A</Text>
                  <Text size="xs" c="dimmed">SĐT: 098765432</Text>
                  <Text size="xs" c="dimmed">Company@example.com</Text>
                </Box>

                <Grid gutter={5}>
                  <Grid.Col span={6}><Text size="xs" c="dimmed">Mã đơn hàng:</Text></Grid.Col>
                  <Grid.Col span={6} ta="right"><Text size="xs">#856432</Text></Grid.Col>
                  <Grid.Col span={6}><Text size="xs" c="dimmed">Ngày tạo đơn:</Text></Grid.Col>
                  <Grid.Col span={6} ta="right"><Text size="xs">23/01/2026</Text></Grid.Col>
                  <Grid.Col span={6}><Text size="xs" c="dimmed">Người tạo đơn:</Text></Grid.Col>
                  <Grid.Col span={6} ta="right"><Text size="xs">Phạm Thị Sale</Text></Grid.Col>
                </Grid>

                <Stack gap="md" mt="md">
                  {[
                    { label: "Thanh toán lần 1", date: "01/01/2026", price: "500.000.000" },
                    { label: "Thanh toán lần 2", date: "08/01/2026", price: "1.000.000.000" },
                    { label: "Thanh toán lần 3", date: "15/01/2026", price: "5.000.000.000" },
                    { label: "Thanh toán lần 4", date: "23/01/2026", price: "2.300.000.000" },
                  ].map((item, idx) => (
                    <Box key={idx}>
                      <Group justify="space-between">
                        <Text size="sm" fw={700}>{item.label}</Text>
                        <Text size="sm" c="dimmed">{item.date}</Text>
                        <Text size="sm" fw={700}>{item.price}</Text>
                      </Group>
                      <Divider mt="sm" color="gray.2" />
                    </Box>
                  ))}
                </Stack>

                {/* Box Tổng Kết Xám */}
                <Group wrap="nowrap" align="flex-start" gap="lg">
                    <Stack align="center" gap={5}>
                        <Box bg="gray.1" p="sm" style={{ borderRadius: '8px' }}>
                             <IconCheck size={40} color="#adb5bd" stroke={1.5} />
                        </Box>
                        <Text size="10px" c="dimmed" ta="center">Ấn để tải file đính kèm</Text>
                    </Stack>
                    
                    <Box bg="#f1f3f5" p="md" style={{ flex: 1, borderRadius: '4px' }}>
                        <Stack gap={5}>
                            <Group justify="space-between"><Text size="xs">Tổng chi phí cần thanh toán</Text><Text size="xs" fw={700}>9.000.000.000</Text></Group>
                            <Group justify="space-between"><Text size="xs">Tổng chi phí đã thanh toán</Text><Text size="xs" fw={700}>8.800.000.000</Text></Group>
                            <Group justify="space-between"><Text size="xs">Chiết khấu</Text><Text size="xs" fw={700}>-200.000.000</Text></Group>
                            <Divider my={5} />
                            <Group justify="space-between" align="flex-end">
                                <Text size="xs" fw={700}>Chi phí còn phải thanh toán</Text>
                                <Stack gap={0} align="flex-end">
                                    <Text fw={800} size="xl" style={{ lineHeight: 1 }}>0</Text>
                                    <Text size="10px">(VNĐ)</Text>
                                </Stack>
                            </Group>
                        </Stack>
                    </Box>
                </Group>

                {/* Footer thông tin */}
                <Box mt="xl">
                  <Text fw={700} size="sm">T&T GROUP</Text>
                  <Grid mt={5}>
                    <Grid.Col span={7}>
                        <Text size="10px" c="dimmed">Hotline: 0666888868</Text>
                        <Text size="10px" c="dimmed">Phone: 012345678</Text>
                        <Text size="10px" c="dimmed">Email: ttgroup@example.com</Text>
                    </Grid.Col>
                    <Grid.Col span={5} ta="right">
                        <Text size="10px" c="dimmed">Website</Text>
                        <Text size="10px" c="dimmed">ttgroup.example.com</Text>
                    </Grid.Col>
                  </Grid>
                  <Text size="10px" c="dimmed" ta="center" mt="xl">
                    For any question please contact us at ttgroup@example.com
                  </Text>
                </Box>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}