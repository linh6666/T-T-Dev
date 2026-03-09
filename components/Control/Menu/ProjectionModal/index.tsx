"use client";

import { Modal, Text, Stack, Button, Group } from "@mantine/core";

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
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      title="Một trải nghiệm trình chiếu đặc biệt sắp bắt đầu."
    >
      <Stack>
        <Text>
          Xin mời quý khách hướng sự chú ý lên mô hình để theo dõi các hình ảnh,
          hiệu ứng ánh sáng và âm thanh được đồng bộ và trình chiếu trực tiếp
          trên bề mặt mô hình.
        </Text>

        <Group mt="md">
          <Button
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