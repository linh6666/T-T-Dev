"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty,  useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreaterole"; // 🔁 sửa đường dẫn nếu cần


interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      rank: "",
      description_vi: "",
      description_en: "",
     
 
    },
    validate: {
      name: isNotEmpty("Tên không được để trống"),
      rank: isNotEmpty("Cấp bậc không được để trống"),
      description_vi: isNotEmpty("Mô tả không được để trống"),
      description_en: isNotEmpty("Mô tả không được để trống"),
     
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        name: values.name,
           rank: Number(values.rank), 
          description_vi: values.description_vi,
        description_en: values.description_en,
       
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
        label="Tên"
        placeholder="Nhập Tên"
        withAsterisk
        mt="md"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Cấp Bậc"
        placeholder="Nhập cấp bậc"
        withAsterisk
        mt="md"
        {...form.getInputProps("rank")}
      />
<Textarea
  label="Mô tả (Tiếng Việt)"
  placeholder="Nhập mô tả tiếng Việt"
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
