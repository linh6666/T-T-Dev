"use client";

import { useState } from "react";
import { Modal, Text, Stack, Button, Group, Loader } from "@mantine/core";
import {
  IconPlayerPlay,
  IconPlayerStop,
  IconPlayerPause,
} from "@tabler/icons-react";

import { startProjection } from "../../../../api/apimappingstart";
import { EndProjection } from "../../../../api/apimappingEnd";

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

  // loading riêng cho từng API
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);

  // ================= START =================
  const handleStart = async () => {
    if (loadingStart) return;

    if (isPlaying) {
      console.log("Projection đang chạy");
      return;
    }

    if (!project_id || !mappingId) {
      console.log("Thiếu project_id hoặc mappingId");
      return;
    }

    try {
      setLoadingStart(true);

      const res = await startProjection({
        project_id: project_id,
        script_id: mappingId,
      });

      console.log("Start Projection Success:", res);

      setIsPlaying(true);
    } catch (error) {
      console.error("Start Projection Error:", error);
    } finally {
      setLoadingStart(false);
    }
  };

  // ================= END =================
  const handleEnd = async () => {
    if (loadingEnd) return;

    if (!isPlaying) {
      console.log("Projection chưa chạy");
      return;
    }

    if (!project_id || !mappingId) {
      console.log("Thiếu project_id hoặc mappingId");
      return;
    }

    try {
      setLoadingEnd(true);

      const res = await EndProjection({
        project_id: project_id,
        script_id: mappingId,
      });

      console.log("End Projection Success:", res);

      setIsPlaying(false);

      onClose();
    } catch (error) {
      console.error("End Projection Error:", error);
    } finally {
      setLoadingEnd(false);
    }
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
          {/* START BUTTON */}
          <Button
            radius="xl"
            onClick={handleStart}
            disabled={loadingStart}
            rightSection={
              loadingStart ? (
                <Loader size={16} />
              ) : isPlaying ? (
                <IconPlayerPause size={18} fill="#762f0b" />
              ) : (
                <IconPlayerPlay size={18} fill="#762f0b" />
              )
            }
            style={{
              backgroundColor: "#fffaee",
              color: "#762f0b",
              border: "1px solid #762f0b",
            }}
          >
            BẮT ĐẦU TRÌNH CHIẾU
          </Button>

          {/* STOP BUTTON */}
          <Button
            radius="xl"
            onClick={handleEnd}
            disabled={loadingEnd}
            rightSection={
              loadingEnd ? (
                <Loader size={16} />
              ) : (
                <IconPlayerStop size={18} fill="#762f0b" />
              )
            }
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