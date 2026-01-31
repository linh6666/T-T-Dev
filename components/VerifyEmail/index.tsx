"use client";

import { Box, Button, Space, Text } from "@mantine/core";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "../../libray/axios";
import { AxiosError } from "axios";
import { NotificationExtension } from "../../extension/NotificationExtension";
import style from "./ResetPassword.module.css";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // 👈 Lấy token từ URL
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleVerifyEmail = async () => {
    if (!token) {
      NotificationExtension.Fails("Token không hợp lệ hoặc đã hết hạn!");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/api/v1/verify-email",
        null,
        {
          params: { token }, // 👈 giống Swagger (query param)
        }
      );

      NotificationExtension.Success("Xác thực email thành công!");
      router.push("/");
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      const msg =
        err.response?.data?.detail || "Xác thực email thất bại!";
      NotificationExtension.Fails(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={style.verifyPage}>
      <Box className={style.container}>
        {/* Header */}
        <Box className={style.header}>
          <Text fw={600} size="lg" ta="center">
            📧 Xác thực email
          </Text>
          <Text size="sm" c="dimmed" ta="center" mt={4}>
            Nhấn nút bên dưới để xác thực email của bạn
          </Text>
        </Box>

        <Space h="xl" />

        {/* Button */}
        <Button
          fullWidth
          loading={loading}
          onClick={handleVerifyEmail}
          className={style.btn}
        >
          Xác thực 
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyEmail;

