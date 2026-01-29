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

/* =======================
   PROPS
======================= */
interface CreatePaymentModalProps {
  opened: boolean;
  onClose: () => void;
  projectId: string | null;
}

export default function CreatePaymentModal({
  opened,
  onClose,
//   projectId,
}: CreatePaymentModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
    //   centered
      radius="md"
      size={700}
      title={
        <Title order={1} size="h3">
          Tạo đơn thanh toán mới
        </Title>
      }
    >
      <Stack gap="md">
        {/* DEBUG / dùng sau */}
        {/* <div>Project ID: {projectId}</div> */}

        {/* Chia form thành 2 cột */}
        <SimpleGrid cols={2} spacing="md">
          <TextInput
            label="Mã Hóa Đơn"
            placeholder="Nhập mã hóa đơn"
            radius="md"
          />

        <NumberInput
            label="Số Tiền Thanh Toán (VNĐ)"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            radius="md"
          />
            <TextInput
            label="Giai Đoạn Thanh Toán"
            placeholder="VD: Thanh toán lần 1"
            radius="md"
          />

          <NumberInput
            label="Số Tiền Thanh Toán (EN)"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            radius="md"
          />
    <TextInput
            label="File"
            placeholder="Chọn File"
            radius="md"
          />
            <TextInput
            label="Tên File"
            placeholder="Nhập Tên"
            radius="md"
          />
           <TextInput
            label="Ghi chú cho file"
            placeholder=""
            radius="md"
          />
        
        
        </SimpleGrid>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button color="blue">
            Tạo đơn
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
