"use client";

import { Modal, Text, Button, Stack } from "@mantine/core";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function InactiveAccountModal({ opened, onClose }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title="Tài khoản chưa kích hoạt"
    >
      <Stack>
        <Text size="sm">
          Tài khoản của bạn hiện chưa được kích hoạt.
          Vui lòng cập nhật thông tin hoặc liên hệ bộ phận hỗ trợ để tiếp tục sử
          dụng hệ thống.
        </Text>

        <Button color="orange" onClick={onClose}>
          Tôi đã hiểu
        </Button>
      </Stack>
    </Modal>
  );
}
