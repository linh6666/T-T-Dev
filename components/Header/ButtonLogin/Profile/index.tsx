"use client";


import { Modal, Text, Button} from "@mantine/core";
import { sendVerificationEmail } from "../../../../api/apiSendEmailAuthentication";
import { NotificationExtension } from "../../../../extension/NotificationExtension";

interface ForgotPasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  opened,
  onClose,
  email,
}: ForgotPasswordModalProps & { email: string }) {
  
  const handleResetPassword = async () => {
    if (!email) {
       NotificationExtension.Fails("Không tìm thấy email người dùng!");
       return;
    }

    try {
      console.log("Gửi yêu cầu xác thực cho:", email);

      await sendVerificationEmail(email); // Gọi API gửi email

      // ✅ Thông báo thành công
      NotificationExtension.Success(
        "Yêu cầu xác thực đã được gửi thành công. Vui lòng kiểm tra email."
      );

      onClose(); // Đóng modal sau khi gửi
    } catch (error: unknown) {
      console.error("Lỗi khi gửi yêu cầu:", error);

      // ✅ Thông báo lỗi
      let msg = "Gửi yêu cầu thất bại. Vui lòng thử lại.";
      if (error instanceof Error && error.message) {
        msg = error.message;
      }
      NotificationExtension.Fails(msg);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<h1 style={{ color: "#762f0b" }}>Tài khoản chưa được xác thực!</h1>}
      centered
    >
      <Text size="sm" mb="lg">
        Tài khoản <b>{email}</b> chưa được kích hoạt.<br/> 
        Vui lòng nhấn nút bên dưới để nhận email xác thực.
      </Text>

      <Button
        fullWidth
        onClick={handleResetPassword}
        color="yellow"
        styles={{
          label: {
            color: "#762f0b", 
            fontWeight: 600,
          },
        }}
      >
        Gửi yêu cầu xác thực
      </Button>
    </Modal>
  );
}
