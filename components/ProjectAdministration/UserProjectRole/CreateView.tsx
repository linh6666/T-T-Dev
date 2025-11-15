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
import { createUser } from "../../../api/apicreateUserProjectRole"; // 🔁 sửa đường dẫn nếu cần


interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
   user_id: "",
   project_id: "",
   system_id: "",
   role_id: "",   
    },
    validate: {
      user_id: isNotEmpty("Mã không được để trống"),
      project_id: isNotEmpty("Mã không được để trống"),
      system_id: isNotEmpty("Mã không được để trống"),
      role_id: isNotEmpty("Mã không được để trống"),
     
     
    },
  });

const handleSubmit = async (values: typeof form.values) => {
  open();
  try {
    const userData = {
      user_id: values.user_id,
      project_id: values.project_id,
      system_id: values.system_id,
      role_id: values.role_id,
    };

    // 🟢 Truyền đủ 2 tham số
    await createUser(values.project_id, userData);

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
  label="Người dùng"
  placeholder="Nhập người dùng"

  withAsterisk
  mt="md"
  {...form.getInputProps("user_id")}
/>
      <TextInput
    label="Dự án"
    placeholder="Nhập Tên dự án"
    withAsterisk
    mt="md"
    {...form.getInputProps("project_id")}
  />

  <TextInput
    label=" Hệ thống"
    placeholder="Nhập hệ thống"
    withAsterisk
    mt="md"
    {...form.getInputProps("system_id")}
  />

  <TextInput
    label="Tên vai trò"
    placeholder="Nhập tên vai trò"
    withAsterisk
    mt="md"
    {...form.getInputProps("role_id")}
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
