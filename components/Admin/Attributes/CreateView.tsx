"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,

  Select,

  TextInput,
} from "@mantine/core";
import { isNotEmpty,  useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreateAttributes"; // 🔁 sửa đường dẫn nếu cần



interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      label: "",
      data_type: "",
      parent_attribute_id: "",
      display_label_vi: "",
     
 
    },
    validate: {
      label: isNotEmpty(" không được để trống"),
      data_type: isNotEmpty(" không được để trống"),
      parent_attribute_id: isNotEmpty("không được để trống"),
      display_label_vi: isNotEmpty("không được để trống"),
     
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        label: values.label,
           data_type: values.data_type, 
          parent_attribute_id: values.parent_attribute_id,
        display_label_vi: values.display_label_vi,
       
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
        label="Định danh thuộc tính"
        placeholder="Nhập định danh thuộc tính"
        withAsterisk
        mt="md"
        {...form.getInputProps("label")}
      />

 
 <TextInput
        label="Tên hiển thị "
        placeholder="Nhập tên hiển thị "
        withAsterisk
        mt="md"
        {...form.getInputProps("display_label_vi")}
      />
       <TextInput
        label="Tên dữ liệu cha"
        placeholder="Nhập tên dữ liệu cha"
        withAsterisk
        mt="md"
        {...form.getInputProps("parent_attribute_id")}
      />


<Select
  label="Kiểu dữ liệu"
  placeholder="Chọn kiểu dữ liệu"
  data={[
    { value: "bigint", label: "Số nguyên (bigint)" },
    { value: "float", label: "Số thực (float)" },
    { value: "text", label: "Văn bản (text)" },
    { value: "boolean", label: "Đúng/Sai (boolean)" },
    { value: "time", label: "Thời gian (time)" },
  ]}
  withAsterisk
  mt="md"
  {...form.getInputProps("data_type")}
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
