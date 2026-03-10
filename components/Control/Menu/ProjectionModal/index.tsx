"use client";

import { Modal, Text, Stack, Button, Group } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

interface ProjectionModalProps {
  opened: boolean;
  onClose: () => void;
  project_id: string | null;
}

export default function ProjectionModal({
  opened,
  onClose,
  project_id,
}: ProjectionModalProps) {
  const handleStart = () => {
    console.log("Bắt đầu trình chiếu", project_id);
  };

  const handleEnd = () => {
    console.log("Kết thúc trình chiếu", project_id);
    onClose(); // chỉ khi bấm nút này mới đóng modal
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      centered
      size="lg"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      title={
        <Text fw={700} ta="center">
          PROJECTION MAPPING MÔ HÌNH DỰ ÁN T&T MILLENNIA CITY
        </Text>
      }
    >
      <Stack align="center">
        <Text ta="center">
          Một trải nghiệm trình chiếu đặc biệt sắp bắt đầu.
          <br />
          Xin mời quý khách hướng sự chú ý lên mô hình để theo dõi các hình
          ảnh, hiệu ứng ánh sáng và âm thanh được đồng bộ và trình chiếu trực
          tiếp trên bề mặt mô hình.
        </Text>

        <Group mt="md" justify="center">
          <Button
            radius="xl"
            rightSection={<IconPlayerPlay size={18} fill="#762f0b" />}
            onClick={handleStart}
            style={{
              backgroundColor: "#fffaee",
              color: "#762f0b",
              border: "1px solid #762f0b",
            }}
          >
            BẮT ĐẦU TRÌNH CHIẾU
          </Button>

          <Button
            radius="xl"
            rightSection={<IconPlayerStop size={18} fill="#762f0b" />}
            onClick={handleEnd}
            style={{
              backgroundColor: "#fffaee",
              color: "#762f0b",
              border: "1px solid #762f0b",
            }}
          >
            KẾT THÚC TRÌNH CHIẾU
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}