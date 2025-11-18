"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreatePermissions"; // 🔁 sửa đường dẫn nếu cần
import { NotificationExtension } from "../../../extension/NotificationExtension";

interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      code: "",
      description_vi: "",
      description_en: "",
    },
    validate: {
      code: isNotEmpty("Mã không được để trống"),
      description_vi: isNotEmpty("Mô tả không được để trống"),
      description_en: isNotEmpty("Mô tả không được để trống"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        code: values.code,
        description_vi: values.description_vi,
        description_en: values.description_en,
      };
      await createUser(userData);

      // Hiển thị thông báo thành công
      NotificationExtension.Success("Tạo chức năng thành công!");

      // Reload danh sách
      await onSearch();

      // Đóng tất cả modal
      modals.closeAll();
    } catch (error: unknown) {
      console.error("Lỗi khi tạo user:", error);

      // Hiển thị thông báo lỗi
      NotificationExtension.Fails("Đã xảy ra lỗi khi tạo chức năng.");
    } finally {
      close();
    }
  };

  return (
    <Box
      component="form"
      miw={320}
      mx="auto"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <TextInput
        label="Mã Chức Năng"
        placeholder="Nhập mã chức năng"
        withAsterisk
        mt="md"
        {...form.getInputProps("code")}
      />

      <Textarea
        label="Mô tả"
        placeholder="Nhập mô tả"
        autosize
        minRows={3}
        mt="md"
        {...form.getInputProps("description_vi")}
      />

      <Textarea
        label="Mô tả (Tiếng Anh)"
        placeholder="Enter English description"
        autosize
        minRows={3}
        mt="md"
        {...form.getInputProps("description_en")}
      />

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          Lưu
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          Đóng
        </Button>
      </Group>
    </Box>
  );
};

export default CreateView;

