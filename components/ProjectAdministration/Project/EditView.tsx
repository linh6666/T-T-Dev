"use client";

import {
  Box,
  Button,
  FileInput,
  Group,
  Image,

  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiEditproject";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
  lang: "vi" | "en"; // ⬅️ thêm prop lang
}

const EditView = ({ onSearch, id, lang }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm<CreateUserPayload>({
    initialValues: {
      name: "",
      template: "",
      address: "",
      investor: "",
      overview_image: "",
      rank: "",
    },
  });

  const formRef = useRef(form);

  /** Submit cập nhật dự án */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      let url = API_ROUTE.UPDATE_PROJECTS.replace("{project_id}", id);
      // Nếu API hỗ trợ lang, bạn có thể thêm query param
      url += `?lang=${lang}`;

      await api.put(url, values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi cập nhật dự án:", error);
      alert(lang === "vi" ? "Đã xảy ra lỗi khi cập nhật dự án." : "Failed to update project.");
    } finally {
      close();
    }
  };

  /** Lấy dữ liệu chi tiết dự án */
  const fetchUserDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      let url = API_ROUTE.UPDATE_PROJECTS.replace("{project_id}", id);
      // Nếu API hỗ trợ lang, thêm param
      url += `?lang=${lang}`;

      const response = await api.get(url);
      const userData = response.data;

      formRef.current.setValues({
        name: userData.name || "",
        rank: userData.rank || "",
        template: userData.template || "",
        address: userData.address || "",
        investor: userData.investor || "",
        overview_image: userData.overview_image || "",
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dự án:", error);
      alert(lang === "vi" ? "Không thể tải thông tin dự án." : "Failed to load project data.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close, lang]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  return (
    <Box component="form" miw={320} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <TextInput
        label={lang === "vi" ? "Tên dự án" : "Project Name"}
        placeholder={lang === "vi" ? "Nhập Tên dự án" : "Enter project name"}
        withAsterisk
        mt="md"
        {...form.getInputProps("name")}
      />

      <TextInput
        label={lang === "vi" ? "Cấp bậc" : "Rank"}
        placeholder={lang === "vi" ? "Nhập Cấp bậc" : "Enter rank"}
        withAsterisk
        mt="md"
        {...form.getInputProps("rank")}
      />

      <TextInput
        label={lang === "vi" ? "Loại dự án" : "Project Type"}
        placeholder={lang === "vi" ? "Nhập loại dự án" : "Enter project type"}
        withAsterisk
        mt="md"
        {...form.getInputProps("template")}
      />

      <TextInput
        label={lang === "vi" ? "Địa chỉ" : "Address"}
        placeholder={lang === "vi" ? "Nhập địa chỉ" : "Enter address"}
        mt="md"
        {...form.getInputProps("address")}
      />

      <TextInput
        label={lang === "vi" ? "Chủ đầu tư" : "Investor"}
        placeholder={lang === "vi" ? "Nhập tên chủ đầu tư" : "Enter investor name"}
        mt="md"
        {...form.getInputProps("investor")}
      />

        <FileInput
    label={lang === "vi" ? "Hình ảnh" : "Image URL"}
        placeholder={lang === "vi" ? "Nhập link ảnh" : "Enter image URL"}
          withAsterisk
        mt="md"
        {...form.getInputProps("overview_image")}
     
    />

      {form.values.overview_image && (
        <Image
          src={form.values.overview_image}
          alt="Preview"
          width={200} // Thay đổi giá trị này theo kích thước bạn cần
          height={150} // Thay đổi giá trị này theo kích thước bạn cần
          style={{
            marginTop: "10px",
            maxWidth: "200px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      )}

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          {lang === "vi" ? "Lưu" : "Save"}
        </Button>

        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          {lang === "vi" ? "Đóng" : "Close"}
        </Button>
      </Group>
    </Box>
  );
};

export default EditView;
