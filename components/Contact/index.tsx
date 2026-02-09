"use client";

import { Textarea, TextInput, Button } from "@mantine/core";
import styles from "./Contact.module.css";
import React from "react";

export default function ContactPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Liên hệ với chúng tôi</h1>

      <div className={styles.card}>
      

        <div className={styles.grid}>
          <TextInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            className={styles.input}
                  withAsterisk
          />

          <TextInput
            label="Email"
            placeholder="Nhập email"
                  withAsterisk
            className={styles.input}
          />

          <TextInput
            label="Chủ đề"
            placeholder="Nhập chủ đề"
                  withAsterisk
            className={styles.input}
          />

          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
                  withAsterisk
            className={styles.input}
          />
        </div>

        <Textarea
              withAsterisk
          label="Nội dung"
          placeholder="Nhập nội dung tin nhắn"
          minRows={4}
          className={styles.textarea}
        />

        <Button className={styles.submitBtn}>Gửi</Button>
      </div>
    </div>
  );
}
