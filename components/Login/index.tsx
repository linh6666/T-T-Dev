// "use client";

// import { useState, useEffect } from "react"; // ✅ thêm useEffect
// import {
//   Input,
//   PasswordInput,
//   Button,
//   Anchor,
//   Group,
//   Box,
//   Text,
//   Title,
// } from "@mantine/core";
// import ForgotPasswordModal from "./ForgotPasswordModal/index";
// import { loginUser } from "../../api/apiLogin";
// import { NotificationExtension } from "../../extension/NotificationExtension"; // import sẵn
// import axios from "axios";

// export default function LoginPage() {
//   const [username, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passFocused, setPassFocused] = useState(false);
//   const [opened, setOpened] = useState(false);

//   // ✅ Check nếu đã login thì redirect
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       window.location.href = "/";
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate cơ bản
//     if (!username) {
//       NotificationExtension.Fails("Email không được để trống");
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
//       NotificationExtension.Fails("Email không hợp lệ");
//       return;
//     }
//     if (!password) {
//       NotificationExtension.Fails("Mật khẩu không được để trống");
//       return;
//     }
//     if (password.length < 8) {
//       NotificationExtension.Fails("Mật khẩu phải ít nhất 8 ký tự");
//       return;
//     }

//     try {
//       const response = await loginUser(username, password);

//       if (response?.access_token) {
//         localStorage.setItem("access_token", response.access_token);
//         window.location.href = "/";
//       } else {
//         NotificationExtension.Fails(
//           response?.message || "Sai tài khoản hoặc mật khẩu, vui lòng thử lại."
//         );
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         NotificationExtension.Fails(
//           error.response?.data?.detail || "Sai tài khoản hoặc mật khẩu"
//         );
//       } else {
//         NotificationExtension.Fails(
//           (error as Error).message || "Có lỗi xảy ra, vui lòng thử lại"
//         );
//       }
//     }
//   };

//   return (
//     <>
//       {/* Import modal */}
//       <ForgotPasswordModal opened={opened} onClose={() => setOpened(false)} />

//       <Box
//         style={{
//           maxWidth: 600,
//           margin: "auto",
//           marginTop: "100px",
//           borderRadius: "10px",
//           padding: "30px",
//           background: "#fff",
//         }}
//       >
//         <Title
//           order={2}
//           ta="center"
//           mb="xl"
//           style={{ fontWeight: 700, fontSize: "24px", color: "#762f0b" }}
//         >
//           Đăng nhập vào Hệ thống
//         </Title>
//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <Box mb="lg" style={{ position: "relative" }}>
//             {(emailFocused || username) && (
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
//                 Nhập email
//               </Text>
//             )}
//             <Input
//               type="email"
//               placeholder={!emailFocused && !username ? "Nhập email" : ""}
//               variant="unstyled"
//               value={username}
//               onChange={(e) => setEmail(e.currentTarget.value)}
//               onFocus={() => setEmailFocused(true)}
//               onBlur={() => setEmailFocused(false)}
//               styles={{
//                 input: {
//                   borderBottom: "1px solid #ccc",
//                   borderRadius: 0,
//                   padding: "8px 0",
//                 },
//               }}
//             />
//           </Box>

//           {/* Mật khẩu */}
//           <Box mb="lg" style={{ position: "relative" }}>
//             {(passFocused || password) && (
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
//                 Nhập mật khẩu
//               </Text>
//             )}
//             <PasswordInput
//               placeholder={!passFocused && !password ? "Nhập mật khẩu" : ""}
//               variant="unstyled"
//               value={password}
//               onChange={(e) => setPassword(e.currentTarget.value)}
//               onFocus={() => setPassFocused(true)}
//               onBlur={() => setPassFocused(false)}
//               styles={{
//                 input: {
//                   borderBottom: "1px solid #ccc",
//                   borderRadius: 0,
//                   padding: "8px 0",
//                 },
//               }}
//             />
//           </Box>

//           {/* Links phụ */}
//           <Group justify="space-between" mb="md">
//             <Anchor size="sm"></Anchor>
//             <Anchor
//               size="sm"
//               style={{ cursor: "pointer" }}
//               onClick={() => setOpened(true)}
//             >
//               Quên mật khẩu?
//             </Anchor>
//           </Group>

//           {/* Button */}
//           <Button
//             type="submit"
//             fullWidth
//             size="md"
//             color="#ffbe00"
//             styles={{
//               label: {
//                 color: "#762f0b", // đổi màu text ở đây
//                 fontWeight: 600, // có thể thêm đậm
//               },
//             }}
//           >
//             Đăng nhập
//           </Button>

//           <Text ta="center" mt="md">
//             Bạn chưa có tài khoản?{" "}
//             <Anchor href="/dang-ky" size="sm" c="red">
//               Đăng ký ngay
//             </Anchor>
//           </Text>
//         </form>
//       </Box>
//     </>
//   );
// }
"use client";

import {
  Anchor,
  Box,
  Button,
  Group,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { loginUser } from "../../api/apiLogin";
import ForgotPasswordModal from "./ForgotPasswordModal/index";
import { NotificationExtension } from "../../extension/NotificationExtension";
import { useState, useEffect } from "react";
import style from "./login.module.css";

interface Register {
  username: string;
  password: string;
}

const Login = () => {
  // ✅ Khai báo toàn bộ hooks trước
  const form = useForm<Register>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: (value) =>
        value && value.length >= 5 && value.length <= 100
          ? null
          : "Mật khẩu phải chứa từ 5 đến 100 kí tự",
      username: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Email không hợp lệ",
    },
  });

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clickPassword, setClickPassword] = useState(false);
  const [clickRePassword, setClickRePassword] = useState(false);

  // ✅ useEffect kiểm tra token, tránh vi phạm quy tắc hook
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        window.location.href = "/";
      }
    }
  }, []);

  // ✅ Theo dõi lỗi
  useEffect(() => {
    if (error) {
      console.log("❌ Current error state:", error);
    }
  }, [error]);

  // Floating labels logic
  const floatingPassword =
    clickPassword || form.values.password.length > 0 || undefined;
  const floatingEmail =
    clickRePassword || form.values.username.length > 0 || undefined;

  // ✅ Xử lý submit form
  const handleSubmit = async (values: Register) => {
  setLoading(true);
  setError(null);

  try {
    const data = await loginUser(values.username, values.password);
    console.log("Login success:", data);

    if (!data.access_token) {
      throw new Error("Không nhận được token hợp lệ");
    }

    // ✅ Lưu token vào localStorage
    localStorage.setItem("access_token", data.access_token);

    NotificationExtension.Success("Đăng nhập thành công!");
    window.location.href = "/";
  } catch (err: unknown) {
    console.error("Login error:", err);

    if (err instanceof Error) {
      setError(err.message);
      NotificationExtension.Fails(err.message || "Đăng nhập thất bại");
    } else {
      setError("Đăng nhập thất bại");
      NotificationExtension.Fails("Đăng nhập thất bại");
    }
  } finally {
    setLoading(false);
  }
};

  // ✅ Giao diện chính
  return (
    <>
      <ForgotPasswordModal opened={opened} onClose={() => setOpened(false)} />
      <Box
        className={style.registerPage}
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Box className={style.container}>
          {/* Header */}
          <Box className={style.topNavBar}>
            <Box className={style.navBarContainer}>
              <Box className={style.navBarTitle}>Đăng nhập vào Hệ thống</Box>
            </Box>
          </Box>

          <Space h="xl" />

          {/* Form */}
          <Box className={style.loginForm}>
            <Box className={style.formGroup}>
              <div className={style.inputBox}>
                <TextInput
                  label="Email"
                  labelProps={{ "data-floating": floatingEmail }}
                  withAsterisk
                  mt="md"
                  type="email"
                  classNames={{
                    root: style.root,
                    input: style.input,
                    label: style.label,
                  }}
                  onFocus={() => setClickRePassword(true)}
                  onBlur={() => setClickRePassword(false)}
                  {...form.getInputProps("username")}
                />
              </div>

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
                  {...form.getInputProps("password")}
                />
              </div>
            </Box>
          </Box>

          <Group justify="space-between" mb="md">
            <Anchor size="sm"></Anchor>
            <Anchor
              size="sm"
              style={{ cursor: "pointer" }}
              onClick={() => setOpened(true)}
            >
              Quên mật khẩu?
            </Anchor>
          </Group>

          {error && (
            <Text c="red" size="sm" ta="center" mb="sm">
              {error}
            </Text>
          )}

          <Button
            className={style.btn}
            type="submit"
            loading={loading}
            fullWidth
          >
            Đăng nhập
          </Button>

          <Text style={{ textAlign: "center", marginTop: "16px" }}>
            Bạn chưa có tài khoản?{" "}
            <Anchor href="/dang-ky" size="sm" c="red">
              Đăng ký ngay
            </Anchor>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Login;
