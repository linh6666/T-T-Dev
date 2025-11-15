"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,
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
    
     
 
    },
    validate: {
      name: isNotEmpty("Tên không được để trống"),
      rank: isNotEmpty("Cấp bậc không được để trống"),
      description_vi: isNotEmpty("Mô tả không được để trống"),
     
     
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        name: values.name,
           rank: Number(values.rank), 
          description_vi: values.description_vi,
      
       
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
        label="Tên vai trò"
        placeholder="Nhập Tên vai trò"
        withAsterisk
        mt="md"
        {...form.getInputProps("name")}
      />

      {/* <TextInput
        label="Cấp Bậc"
        placeholder="Nhập cấp bậc"
        withAsterisk
        mt="md"
        {...form.getInputProps("rank")}
      /> */}
      <Select
        label="Cấp Bậc"
        placeholder="Chọn cấp bậc"
        withAsterisk
        mt="md"
         clearable
        data={[
          { value: "1", label: "Cấp 1" },
          { value: "2", label: "Cấp 2" },
          { value: "3", label: "Cấp 3" },
          { value: "4", label: "Cấp 4" },
          { value: "5", label: "Cấp 5" },
          { value: "6", label: "Cấp 6" },
          { value: "7", label: "Cấp 7" },
          { value: "8", label: "Cấp 8" },
        ]}
        {...form.getInputProps("rank")}
      />
<Textarea
  label="Mô tả "
  placeholder="Nhập mô tả "
  autosize
  minRows={3}
  mt="md"
  {...form.getInputProps("description_vi")}
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
