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
  MantineProvider,
  createTheme,
  Input,
  Grid,
  Divider,
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

/* ======================
   THEME CONFIG
====================== */

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: "filled",
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
    }),
  },
});

export default function OrderButton({ unitCode, projectId }: OrderButtonProps) {
  const [opened, setOpened] = useState(false);
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      contract_code: "",
      total_price_at_sale_vi: "",
      id_cccd: "",
      file: null as File | null,
    },
  });

  const handleCloseModal = () => {
    setOpened(false);
    form.reset();
  };

  const handleSubmit = async (values: typeof form.values) => {
    if (!values.file || !(values.file instanceof File)) {
      NotificationExtension.Warn("Vui lòng chọn file đính kèm hợp lệ");
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
    <MantineProvider theme={theme}>
      <div style={{ display: "flex", gap: "12px", zIndex: 10 }}>
        <button
          onClick={() => setOpened(true)}
          style={{
            height: "40px",
            padding: "0 14px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <IconPlus size={20} color="#752E0B" />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#752E0B",
            }}
          >
            Tạo đơn hàng
          </span>
        </button>

        <Modal
          opened={opened}
          onClose={handleCloseModal}
          centered
           size="lg"  
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

           <Grid mt="md">
  <Grid.Col span={6}>
    <TextInput
      label="Email khách hàng"
      placeholder="Nhập email khách hàng"
      withAsterisk
      {...form.getInputProps("email")}
    />
  </Grid.Col>

  <Grid.Col span={6}>
    <TextInput
      label="Mã hợp đồng"
      placeholder="Nhập mã hợp đồng"
      withAsterisk
      {...form.getInputProps("contract_code")}
    />
  </Grid.Col>
</Grid>

            <TextInput
              label="Giá trị đơn hàng"
              placeholder="Nhập giá trị đơn hàng"
              type="text"
              withAsterisk
              mt="md"
              value={
                form.values.total_price_at_sale_vi
                  ? Number(form.values.total_price_at_sale_vi).toLocaleString(
                      "vi-VN"
                    )
                  : ""
              }
              onChange={(event) => {
                const rawValue = event.currentTarget.value.replace(/\./g, "");
                if (!isNaN(Number(rawValue))) {
                  form.setFieldValue("total_price_at_sale_vi", rawValue);
                }
              }}
            />
                  <Divider my="md" />

            <TextInput
              label="Số CCCD / CMND"
              placeholder="Nhập số CCCD / CMND"
              withAsterisk
              mt="md"
              {...form.getInputProps("id_cccd")}
            />

            <FileInput
              label="Tải tệp lên"
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
    </MantineProvider>
  );
}