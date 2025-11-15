// "use client";

// import { useSearchParams } from "next/navigation";
// import { useForm } from "@mantine/form";
// import {
//   Stack,
//   Button,
//   Title,
//   Text,
//   Box,
//   Group,
//   PasswordInput,
// } from "@mantine/core";
// import { useState,useEffect } from "react";
// import { api } from "../../libray/axios";
// import { IconLock } from "@tabler/icons-react";
// import { NotificationExtension } from "../../extension/NotificationExtension";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";

// // 👇 định nghĩa kiểu response từ API reset password
// interface ResetPasswordResponse {
//   message: string;
// }

// export default function ResetPasswordPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token"); // 👈 lấy token từ URL
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm({
//     initialValues: { new_password: "" },
//     validate: {
//       new_password: (value) =>
//         value.length >= 8 ? null : "Mật khẩu phải có ít nhất 8 ký tự",
//     },
//   });

//   // 👇 thêm state focus riêng để hiển thị label nhỏ
//   const [passFocused, setPassFocused] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       window.location.href = "/";
//     }
//   }, []);
//   const handleSubmit = async (values: { new_password: string }) => {
//   try {
//     setLoading(true);

//     const response = await api.post<ResetPasswordResponse>(
//       "/api/v1/reset-password",
//       {
//         token,
//         new_password: values.new_password,
//       }
//     );

//     console.log("✅ Reset thành công:", response.data);

//     // ✅ Thông báo thành công
//     NotificationExtension.Success("Đổi mật khẩu thành công!");
//     router.push("/dang-nhap");
    
//   } catch (error: unknown) {
//     const err = error as AxiosError<{ detail?: string }>;
//     console.error("❌ Lỗi reset:", err.response?.data || err.message);

//     // ✅ Thông báo lỗi
//     const msg = err.response?.data?.detail || "Đổi mật khẩu thất bại!";
//     NotificationExtension.Fails(msg);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Box
//       maw={600}
//       mx="auto"
//       mt={100}
//        p={30}
    
//     >
//   <Title order={2} ta="center" mb="md" style={{ color: '#762f0b' }}>
//     🔒 Đặt lại mật khẩu
// </Title>
//       <Text size="sm" c="dimmed" ta="center" mb="lg">
//         Nhập mật khẩu mới cho tài khoản của bạn
//       </Text>

//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Stack>
//           {/* Ô mật khẩu với UI giống RegisterPage */}
//           <Box mb="lg" style={{ position: "relative" }}>
//             {(passFocused || form.values.new_password) && (
//               <Text
//                 size="xs"
//                 c="dimmed"
//                 style={{
//                   position: "absolute",
//                   top: -10,
//                   left: 0,
//                   fontSize: "12px",
//                 }}
//               >
//                 Mật khẩu mới
//               </Text>
//             )}
//           <PasswordInput
//   placeholder={
//     !passFocused && !form.values.new_password
//       ? "Nhập mật khẩu mới"
//       : ""
//   }
//   variant="unstyled"
//   leftSection={<IconLock size={18} />}
//   {...form.getInputProps("new_password")}
//   onFocus={() => setPassFocused(true)}
//   onBlur={() => setPassFocused(false)}
//   error={form.errors.new_password} // 👈 chỉ để hiển thị text lỗi
//   styles={{
//     input: {
//       borderBottom: "1px solid #ccc", // viền xám cố định
//       borderRadius: 0,
//       padding: "8px 0",
//     },
//   }}
// />
//           </Box>

    

//           <Group grow>
//             <Button
//               type="submit"
             
//               loading={loading}
//               style={{ backgroundColor: "#ffbe00",color: "#762f0b", }}
//             >
//               Đặt lại mật khẩu
//             </Button>
//           </Group>
//         </Stack>
//       </form>
//     </Box>
//   );
// }


"use client";

import {
  Box,
  Button,
  PasswordInput,
  Space,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "../../libray/axios";
import { AxiosError } from "axios";
import { NotificationExtension } from "../../extension/NotificationExtension";
import style from "./ResetPassword.module.css";

interface ResetPasswordForm {
  new_password: string;
}

interface ResetPasswordResponse {
  message: string;
}

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Lấy token từ URL
  const router = useRouter();

  const form = useForm<ResetPasswordForm>({
    initialValues: {
      new_password: "",
    },
    validate: {
      new_password: (value) =>
        value && value.length >= 5 && value.length <= 100
          ? null
          : "Mật khẩu phải chứa từ 5 đến 100 kí tự",
    },
  });

  const [clickPassword, setClickPassword] = useState(false);
  const floatingPassword =
    clickPassword || form.values.new_password.length > 0 || undefined;

  const [loading, setLoading] = useState(false);

  // Nếu đã login, redirect về trang chủ
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (values: ResetPasswordForm) => {
    if (!token) {
      NotificationExtension.Fails("Token không hợp lệ!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<ResetPasswordResponse>(
        "/api/v1/reset-password",
        {
          token,
          new_password: values.new_password,
        }
      );

      console.log("✅ Reset thành công:", response.data);
      NotificationExtension.Success("Đổi mật khẩu thành công!");
      router.push("/dang-nhap");
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      console.error("❌ Lỗi reset:", err.response?.data || err.message);
      const msg = err.response?.data?.detail || "Đổi mật khẩu thất bại!";
      NotificationExtension.Fails(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={style.registerPage}
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Box className={style.container}>
        {/* Header */}
        <Box className={style.topNavBar}>
          <Box className={style.navBarContainer}>
            <Box className={style.navBarTitle}>
              🔒 Đặt lại mật khẩu
                <Text size="sm" c="dimmed" ta="center" mb="lg">
         Nhập mật khẩu mới cho tài khoản của bạn
       </Text>
            </Box>
          
          </Box>
        </Box>

        <Space h="xl" />

        {/* Form */}
        <Box className={style.loginForm}>
          <Box className={style.formGroup}>
            <div className={style.inputBox}>
              <PasswordInput
                label="Mật khẩu"
                labelProps={{ "data-floating": floatingPassword }}
                withAsterisk
                mt="md"
                classNames={{
                  root: style.root,
                  input: style.input,
                  label: style.label,
                }}
                onFocus={() => setClickPassword(true)}
                onBlur={() => setClickPassword(false)}
                {...form.getInputProps("new_password")}
              />
            </div>
          </Box>
        </Box>

        <Button
          className={style.btn}
          type="submit"
          loading={loading}
        >
          Đặt lại mật khẩu
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
