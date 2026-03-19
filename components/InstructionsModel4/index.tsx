"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./PdfViewer.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button, Group } from "@mantine/core";

export default function PdfViewer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Tuong-tac/Ca-mau?id=${project_id}`);
  };

  return (
    <div className={styles.pdfContainer}>
      <iframe
        src="https://drive.google.com/file/d/18bc11bWiSwcg6Nd-0A71GAMJSB9eEeZO/preview"
        width="100%"
        height="700px"
        style={{ border: "none" }}
      />

      <Group justify="flex-end">
        <Button
          className={styles.backButton}
          onClick={handleBack}
          variant="filled"
        >
          <IconArrowLeft size={18} color="#752E0B" />
        </Button>
      </Group>
    </div>
  );
}