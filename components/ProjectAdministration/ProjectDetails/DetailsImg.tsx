"use client";

import React from "react";
import {
  Box,
  Button,
  FileInput,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";

import {
  createImg,
  CreateImgPayload,
} from "../../../api/apiCreateImg";
import { NotificationExtension } from "../../../extension/NotificationExtension";

/* =======================
   PROPS
======================= */
interface DetailsImngProps {
  unitCode: string;
  projectId: string;
  onSearch: () => void;
  onClose?: () => void; // 👈 thêm prop để đóng modal
}

/* =======================
   COMPONENT
======================= */
const CreateView = ({
  unitCode,
  projectId,
  onSearch,
  onClose, // 👈 nhận prop
}: DetailsImngProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm<CreateImgPayload>({
    initialValues: {
      file: null as unknown as File,
    },
    validate: {
      file: (v) => (!v ? "Bắt buộc chọn ảnh" : null),
    },
  });

  const handleSubmit = async (values: CreateImgPayload) => {
    open();
    try {
      await createImg(projectId, unitCode, values);

      NotificationExtension.Success("Tạo ảnh chi tiết nhà thành công!");

      form.reset();
      onSearch();

      // 👇 gọi hàm đóng modal nếu có
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      NotificationExtension.Fails("Tạo ảnh chi tiết nhà thất bại!");
    } finally {
      close();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      pos="relative"
    >
      <LoadingOverlay visible={visible} />

     <FileInput
  label="Chọn ảnh"
  placeholder="Nhấp để chọn ảnh từ máy"
  accept="image/*"
  withAsterisk
  mt="md"
  clearable
  value={form.values.file}   // ✅ QUAN TRỌNG
  onChange={(file) => {
    form.setFieldValue("file", file as File);
  }}
  error={form.errors.file}
/>

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          Tạo ảnh
        </Button>
      </Group>
    </Box>
  );
};

export default CreateView;

