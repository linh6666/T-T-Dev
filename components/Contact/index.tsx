"use client";

import { Textarea, TextInput, Button } from "@mantine/core";
import styles from "./Contact.module.css";
import useAuth from "../../hook/useAuth";
import React, { useEffect, useState } from "react";

export default function ContactPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ⭐ Khi user load xong → fill form
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Liên hệ với chúng tôi</h1>

      <div className={styles.card}>
        <div className={styles.grid}>
          <TextInput
            label="Họ và tên"
            withAsterisk
            readOnly
            value={form.full_name}
            onChange={handleChange("full_name")}
            className={styles.input}
          />

          <TextInput
            label="Email"
            withAsterisk
            readOnly
            value={form.email}
            onChange={handleChange("email")}
            className={styles.input}
          />

          <TextInput
            label="Chủ đề"
                   placeholder="Nhập chủ đề liên hệ..."
            withAsterisk
            value={form.subject}
            onChange={handleChange("subject")}
            className={styles.input}
          />

          <TextInput
            label="Số điện thoại"
            withAsterisk
            value={form.phone}
            readOnly
            onChange={handleChange("phone")}
            className={styles.input}
          />
        </div>

        <Textarea
          label="Nội dung"
                 placeholder="Nhập nội dung liên hệ..."
          withAsterisk
          minRows={4}
          value={form.message}
          onChange={handleChange("message")}
          className={styles.textarea}
        />

        <Button className={styles.submitBtn}>Gửi</Button>
      </div>
    </div>
  );
}
