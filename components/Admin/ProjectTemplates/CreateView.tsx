"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,

  TextInput,
} from "@mantine/core";
import { isNotEmpty,  useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apiProjectTemplates"; // 🔁 sửa đường dẫn nếu cần


interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
        template_vi: "",
        project_label: "",
     
     
 
    },
    validate: {
        template_vi: isNotEmpty("không được để trống"),
    
     
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        template_vi: values.template_vi,
        project_label: values.project_label,
           
      };
      await createUser(userData);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);
      alert("Đã xảy ra lỗi khi tạo người dùng.");
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
        label="Loại dự án"
        placeholder="Nhập loại dự án"
        withAsterisk
        mt="md"
        {...form.getInputProps("template_vi")}
      />
      <TextInput
        label="Tên hiển thị dự án"
        placeholder="Nhập tên hiển thị dự án"
        withAsterisk
        mt="md"
        {...form.getInputProps("project_label")}
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
