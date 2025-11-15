"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef, useState } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiTemplateAttributesLink";
import { getListRoles } from "../../../api/apigetlistAttributes";
import { getListProjectTemplates } from "../../../api/apiProjectTemplates";
import { NotificationExtension } from "../../../extension/NotificationExtension";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
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

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  // 🔹 State cho dropdown
  const [templateOptions, setTemplateOptions] = useState<{ value: string; label: string }[]>([]);
  const [attributeOptions, setAttributeOptions] = useState<{ value: string; label: string }[]>([]);

  const token = localStorage.getItem("access_token") || "";

  const form = useForm<CreateUserPayload>({
    initialValues: {
      project_template_id: "",
      attribute_id: "",
      is_required: "",
    },
  });

  const formRef = useRef(form);

  /** ✅ Submit cập nhật */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE.UPDATE_TEMPLATEATTRIBUTESLINK.replace("{link_id}", id);
      const res = await api.put(url, values);

      // ✅ Thêm thông báo
      NotificationExtension.Success(
        res?.data?.message || "Cập nhật dữ liệu thành công!"
      );

      await onSearch();
      modals.closeAll();
    } catch (error: unknown) {
     console.error("Lỗi khi tạo:", error);
      NotificationExtension.Fails("Đã xảy ra lỗi khi tạo!");
    } finally {
      close();
    }
  };

  /** ✅ Lấy chi tiết record cần sửa */
  const fetchDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      const url = API_ROUTE.GET_TEMPLATEATTRIBUTESLINK.replace("{link_id}", id);
      const res = await api.get(url);
      const data = res.data;

      formRef.current.setValues({
        project_template_id: data.project_template_id || "",
        attribute_id: data.attribute_id || "",
        is_required: data.is_required?.toString() || "",
      });
    } catch (error) {
      console.error("Lỗi khi tải chi tiết:", error);
      alert("Không thể tải thông tin chi tiết.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  /** ✅ Gọi API danh sách “Mẫu dự án” */
  const fetchTemplateOptions = useCallback(async () => {
    try {
      const res = await getListProjectTemplates({ token, skip: 0, limit: 100 });
      setTemplateOptions(
        res.data.map((item: ProjectTemplate) => ({
          value: item.id,
          label: item.template_vi || item.template_name || "Không có tên",
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải mẫu dự án:", error);
    }
  }, [token]);

  /** ✅ Gọi API danh sách “Thuộc tính” */
  const fetchAttributeOptions = useCallback(async () => {
    try {
      const res = await getListRoles({ token, skip: 0, limit: 100 });
      setAttributeOptions(
        res.data.map((item: Attribute) => ({
          value: item.id,
          label: item.label || item.attribute_name || "Không có tên",
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải thuộc tính:", error);
    }
  }, [token]);

  /** ✅ Chạy khi mở modal sửa */
  useEffect(() => {
    fetchDetail();
    fetchTemplateOptions();
    fetchAttributeOptions();
  }, [fetchDetail, fetchTemplateOptions, fetchAttributeOptions]);

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

      {/* 🔹 Mẫu dự án */}
      <Select
        label="Mẫu dự án"
        placeholder="Chọn mẫu dự án"
        data={templateOptions}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("project_template_id")}
      />

      {/* 🔹 Thuộc tính */}
      <Select
        label="Thuộc tính"
        placeholder="Chọn thuộc tính"
        data={attributeOptions}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("attribute_id")}
      />

      {/* 🔹 Có thể thêm chọn “Bắt buộc / Không bắt buộc” */}
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

export default EditView;
