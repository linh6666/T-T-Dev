"use client";

import { useState } from "react";
import { Modal, Text, Stack, Button, Group } from "@mantine/core";
import {
  IconPlayerPlay,
  IconPlayerStop,
  IconPlayerPause,
} from "@tabler/icons-react";
import { startProjection } from "../../../../api/apimappingstart";

interface ProjectionModalProps {
  opened: boolean;
  onClose: () => void;
  project_id: string | null;
  mappingId: string | null;
}

export default function ProjectionModal({
  opened,
  onClose,
  project_id,
  mappingId,
}: ProjectionModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = async () => {
  // Nếu đang chạy rồi thì không gọi API nữa
  if (isPlaying) {
    console.log("Projection đang chạy, không call API");
    return;
  }

  if (!mappingId || !project_id) {
    console.log("Thiếu project_id hoặc mappingId");
    return;
  }

  try {
    const res = await startProjection({
      project_id: project_id,
      script_id: mappingId,
    });

    console.log("Start Projection Success:", res);

    // đổi icon sang Pause
    setIsPlaying(true);
  } catch (error) {
    console.error("Start Projection Error:", error);
  }
};

  const handleEnd = () => {
    console.log("Kết thúc trình chiếu", mappingId);

    // reset icon
    setIsPlaying(false);

    onClose();
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
            rightSection={
              isPlaying ? (
                <IconPlayerPause size={18} fill="#762f0b" />
              ) : (
                <IconPlayerPlay size={18} fill="#762f0b" />
              )
            }
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