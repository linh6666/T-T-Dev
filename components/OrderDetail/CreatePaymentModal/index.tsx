"use client";

import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  NumberInput,
  SimpleGrid,
  Title,
} from "@mantine/core";

interface CreatePaymentModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function CreatePaymentModal({
  opened,
  onClose,
}: CreatePaymentModalProps) {
  return (
    <Modal
  opened={opened}
  onClose={onClose}
  centered
  radius="md"
  size={700}
  title={
    <Title order={1} size="h3">
      Tạo đơn thanh toán mới
    </Title>
  }
>
      <Stack gap="md">
        {/* Chia form thành 2 cột */}
        <SimpleGrid cols={2} spacing="md">
          <TextInput
            label="Tên đợt thanh toán"
            placeholder="VD: Thanh toán lần 4"
            radius="md"
          />

          <TextInput
            label="Ngày thanh toán"
            placeholder="dd/mm/yyyy"
            radius="md"
          />

          <NumberInput
            label="Số tiền thanh toán (VNĐ)"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            radius="md"
          />

          <TextInput
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            radius="md"
          />
        </SimpleGrid>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button color="blue">Tạo đơn</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
