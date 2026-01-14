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

export default function OrderButton({
  unitCode,
  projectId,
}: OrderButtonProps) {
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

  /* =======================
   * ĐÓNG MODAL + RESET FORM
   * ======================= */
  const handleCloseModal = () => {
    setOpened(false);
    form.reset();
  };

  /* =======================
   * SUBMIT FORM
   * ======================= */
  const handleSubmit = async (values: typeof form.values) => {
    if (!values.file) {
      NotificationExtension.Warn("Vui lòng chọn file đính kèm");
      return;
    }

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
      };

      const res = await createOrder(payload, values.file);

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
      {/* Button mở modal */}
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
            label="Email"
            placeholder="Nhập email"
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

          <FileInput
            label="File đính kèm"
            placeholder="Chọn file"
            withAsterisk
            mt="md"
            leftSection={<IconUpload size={16} />}
            accept=".pdf,.jpg,.png,.doc,.docx"
            {...form.getInputProps("file")}
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
