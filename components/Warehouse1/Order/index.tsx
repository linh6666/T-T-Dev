"use client";

import { useState } from "react";
import {
  IconCheck,
  IconPlus,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  TextInput,
  LoadingOverlay,
  Box,
  FileInput,
} from "@mantine/core";
import { createOrder } from "../../../api/apiCreateOder";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { NotificationExtension } from "../../../extension/NotificationExtension";
import { AxiosError } from "axios";

interface OrderButtonProps {
  unitCode: string;
  projectId: string;
}

export default function OrderButton({ unitCode, projectId }: OrderButtonProps) {
  const [opened, setOpened] = useState(false);
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      contract_code: "",
      total_price_at_sale_vi: "",
      total_price_at_sale_en: "",
      id_cccd: "",
      file: null as File | null,
    },
  });

  const handleCloseModal = () => {
    setOpened(false);
    form.reset();
  };

  const handleSubmit = async (values: typeof form.values) => {
    console.log("Giá trị file trong form:", values.file);

    if (!values.file || !(values.file instanceof File)) {
      NotificationExtension.Warn("Vui lòng chọn file đính kèm hợp lệ");
      return;
    }

    console.log("File name:", values.file.name);
    console.log("File size:", values.file.size);
    console.log("File type:", values.file.type);

    open();

    try {
      const payload = {
        unit_code: unitCode,
        project_id: projectId,
        email: values.email,
        contract_code: values.contract_code,
        total_price_at_sale_vi: Number(values.total_price_at_sale_vi),
        total_price_at_sale_en: Number(values.total_price_at_sale_en),
        id_cccd: values.id_cccd,
        file: values.file,
      };

      const res = await createOrder(payload);

      NotificationExtension.Success(
        res?.data?.message || "Tạo đơn hàng thành công"
      );

      handleCloseModal();
      modals.closeAll();
    } catch (error: unknown) {
      console.error("Lỗi khi tạo đơn hàng:", error);

      let message = "Đã xảy ra lỗi";

      if (error instanceof AxiosError) {
        message = error.response?.data?.detail ?? message;
      }

      NotificationExtension.Fails(message);
    } finally {
      close();
    }
  };

  return (
    <div style={{ display: "flex", gap: "12px", zIndex: 10 }}>
      <button
        onClick={() => setOpened(true)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconPlus size={20} color="#752E0B" />
      </button>

      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={
          <div style={{ fontWeight: 600, fontSize: 18 }}>
            Tạo đơn hàng mới
          </div>
        }
      >
        <Box
          component="form"
          miw={320}
          mx="auto"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <LoadingOverlay visible={visible} />

          <TextInput
            label="Email khách hàng"
            placeholder="Nhập email khách hàng"
            withAsterisk
            mt="md"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Mã hợp đồng"
            placeholder="Nhập mã hợp đồng"
            withAsterisk
            mt="md"
            {...form.getInputProps("contract_code")}
          />

          <TextInput
            label="Giá trị đơn hàng (VND)"
            placeholder="Nhập giá trị đơn hàng (VND)"
            type="number"
            withAsterisk
            mt="md"
            {...form.getInputProps("total_price_at_sale_vi")}
          />

          <TextInput
            label="Giá trị đơn hàng (USD)"
            placeholder="Nhập giá trị đơn hàng (USD)"
            type="number"
            withAsterisk
            mt="md"
            {...form.getInputProps("total_price_at_sale_en")}
          />

          <TextInput
            label="Số CCCD / CMND"
            placeholder="Nhập số CCCD / CMND"
            withAsterisk
            mt="md"
            {...form.getInputProps("id_cccd")}
          />

          {/* FileInput bind đúng value và onChange */}
        <FileInput
  label="File đính kèm"
  placeholder="Chọn file PDF"
  withAsterisk
  mt="md"
  leftSection={<IconUpload size={16} />}
  accept="application/pdf"
  value={form.values.file}
  onChange={(file) => form.setFieldValue("file", file)}
/>
          <Group justify="flex-end" mt="lg">
            <Button
              type="submit"
              loading={visible}
              leftSection={<IconCheck size={18} />}
            >
              Lưu
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={handleCloseModal}
              leftSection={<IconX size={18} />}
            >
              Đóng
            </Button>
          </Group>
        </Box>
      </Modal>
    </div>
  );
}
