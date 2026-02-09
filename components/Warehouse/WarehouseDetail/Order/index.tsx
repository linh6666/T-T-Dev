"use client";

import { useEffect, useState } from "react";
import { IconCheck, IconMail } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  TextInput,
  LoadingOverlay,
  Box,
  Textarea,
  Text,
  Grid,
} from "@mantine/core";
import { createOrder } from "../../../../api/apiCreateOder";
import { useDisclosure } from "@mantine/hooks";
import useAuth from "../../../../hook/useAuth";
import { modals } from "@mantine/modals";
import { NotificationExtension } from "../../../../extension/NotificationExtension";
import { AxiosError } from "axios";

interface HouseData {
  unit_code: string;
  zone?: string;
  layer3?: string;
  layer2?: string;
  building_type?: string;
  bedroom?: string | number;
  bathroom?: string | number;
  direction?: string;
  price?: number;
}

interface OrderButtonProps {
  house: HouseData;
  projectId: string;
}

export default function OrderButton({ house, projectId }: OrderButtonProps) {
  const [opened, setOpened] = useState(false);
  const [visible, { open, close }] = useDisclosure(false);

  const { user, isLoggedIn } = useAuth();

  /* ================= FORM ================= */
  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      subject: "",
      content: "",

      contract_code: "",
      total_price_at_sale_vi: house.price ? String(house.price) : "",
      total_price_at_sale_en: "",
      id_cccd: "",
      file: null as File | null,
    },
  });

  /* ================= UPDATE PRICE ================= */
  useEffect(() => {
    form.setFieldValue(
      "total_price_at_sale_vi",
      house.price ? String(house.price) : ""
    );
  }, [house]);

  /* ================= AUTO FILL USER ================= */
  useEffect(() => {
    if (!opened || !user) return;

    form.setValues({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [opened, user]);

  /* ================= CLOSE MODAL ================= */
  const handleCloseModal = () => {
    setOpened(false);
    form.reset();
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values: typeof form.values) => {
    if (!isLoggedIn) {
      NotificationExtension.Warn("Vui lòng đăng nhập trước");
      return;
    }

    open();

    try {
      const payload = {
        unit_code: house.unit_code,
        project_id: projectId,
        email: values.email,
        contract_code: values.contract_code,
        total_price_at_sale_vi: Number(values.total_price_at_sale_vi),
        total_price_at_sale_en: Number(values.total_price_at_sale_en),
        id_cccd: values.id_cccd,
        file: values.file as File,

        bedroom: house.bedroom,
        bathroom: house.bathroom,
        direction: house.direction,
        building_type: house.building_type,
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
    <div style={{ display: "flex", gap: "12px", zIndex: 10 }}>
      {/* ================= BUTTON ================= */}
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
        <IconMail size={20} color="#752E0B" />
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#752E0B",
          }}
        >
          Liên hệ
        </span>
      </button>

      {/* ================= MODAL ================= */}
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={<div style={{ fontWeight: 600, fontSize: 18 }}>Liên hệ</div>}
        size="lg"
      >
        <Box
          component="form"
          miw={320}
          mx="auto"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <LoadingOverlay visible={visible} />

          <Grid gutter="xl">
            {/* ===== LEFT - HOUSE INFO ===== */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text fw={700} size="md"  mb="xs">
                Thông tin căn hộ
              </Text>

              <TextInput
                label="Phân khu / Tòa"
                value={house.zone || house.layer3 || "Không có"}
                readOnly
              />

              <TextInput
                label="Loại công trình/Vị trí"
                value={house.building_type || house.layer2 || "Không có"}
                readOnly
                mt="md"
              />

              <TextInput
                label="Mã căn"
                value={house.unit_code}
                readOnly
                mt="md"
              />
            </Grid.Col>

            {/* ===== RIGHT - USER INFO ===== */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text fw={700} size="md" mb="xs">
                Thông tin người dùng
              </Text>

              <TextInput
                label="Họ và tên"
                 readOnly
                {...form.getInputProps("full_name")}
              />

              <TextInput
                label="Email"
                mt="md"
                readOnly
                {...form.getInputProps("email")}
              />

              <TextInput
                label="Số điện thoại"
                 readOnly
                mt="md"
                {...form.getInputProps("phone")}
              />

              <TextInput
                label="Chủ đề"
                withAsterisk
                mt="md"
                {...form.getInputProps("subject")}
              />

              <Textarea
                withAsterisk
                resize="vertical"
                label="Nội dung"
                placeholder="Nhập nội dung liên hệ"
                mt="md"
                {...form.getInputProps("content")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="lg">
            <Button
              type="submit"
              loading={visible}
              leftSection={<IconCheck size={18} />}
            >
              Gửi
            </Button>
          </Group>
        </Box>
      </Modal>
    </div>
  );
}
