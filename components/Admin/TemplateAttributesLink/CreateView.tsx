"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createUser } from "../../../api/apiTemplateAttributesLink";
import { getListRoles } from "../../../api/apigetlistAttributes";
import { getListProjectTemplates } from "../../../api/apiProjectTemplates";
import { NotificationExtension } from "../../../extension/NotificationExtension";

interface CreateViewProps {
  onSearch: () => Promise<void>;
}
interface ProjectTemplate {
  id: string | number;
  template_vi?: string;
  template_name?: string;
}

interface Attribute {
  id: string | number;
  label?: string;
  attribute_name?: string;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  // 🔹 State lưu dữ liệu cho 2 dropdown
  const [templateOptions, setTemplateOptions] = useState<{ value: string; label: string }[]>([]);
  const [attributeOptions, setAttributeOptions] = useState<{ value: string; label: string }[]>([]);

  const token = localStorage.getItem("access_token") || "";

  const form = useForm({
    initialValues: {
      project_template_id: "",
      attribute_id: "",
      is_required: "",
    },
    validate: {
      project_template_id: isNotEmpty("Không được để trống"),
      attribute_id: isNotEmpty("Không được để trống"),
    },
  });

  // ✅ Gọi API lấy danh sách "Dự án mẫu"
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await getListProjectTemplates({ token, skip: 0, limit: 100 });
        setTemplateOptions(
          res.data.map((item: ProjectTemplate) => ({
            value: item.id,
            label: item.template_vi || item.template_name || "Không có tên",
          }))
        );
      } catch (error) {
        console.error("Lỗi khi tải danh sách dự án mẫu:", error);
      }
    };
    fetchTemplates();
  }, [token]);

  // ✅ Gọi API lấy danh sách "Thuộc tính"
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await getListRoles({ token, skip: 0, limit: 100 });
        setAttributeOptions(
          res.data.map((item: Attribute) => ({
            value: item.id,
            label: item.label || item.attribute_name || "Không có tên",
          }))
        );
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuộc tính:", error);
      }
    };
    fetchAttributes();
  }, [token]);

  // ✅ Submit
  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        project_template_id: values.project_template_id,
        attribute_id: values.attribute_id,
        is_required: values.is_required,
      };

      await createUser(userData);
      NotificationExtension.Success("Tạo thành công!");
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi tạo:", error);
      NotificationExtension.Fails("Đã xảy ra lỗi khi tạo!");
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

      {/* 🔹 Chọn Dự án mẫu */}
      <Select
        label="Mẫu dự án"
        placeholder="Chọn mẫu dự án"
        data={templateOptions}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("project_template_id")}
      />

      {/* 🔹 Chọn Thuộc tính */}
      <Select
        label="Thuộc tính"
        placeholder="Chọn thuộc tính"
        data={attributeOptions}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("attribute_id")}
      />
      <Select
        label="Bắt buộc?"
        placeholder="Chọn"
        data={[
          { value: "true", label: "Bắt buộc" },
          { value: "false", label: "Không bắt buộc" },
        ]}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        {...form.getInputProps("is_required")}
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

