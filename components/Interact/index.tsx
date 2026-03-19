"use client";

import { useEffect, useState } from "react";
import { Card, Image, Stack, Text, Button, Loader, Modal } from "@mantine/core";
import styles from "./Interact.module.css";
import { getListProject } from "../../api/apigetlistProjectControl";
import { NotificationExtension } from "../../extension/NotificationExtension";

interface Project {
  id: string;
  name: string;
  address?: string | null;
  overview_image?: string | null;
  investor?: string | null;
  project_template_id: string;
  rank?: number;
  template?: string | null;
  timeout_minutes?: number;
  rank_name?: string | null;
  type?: string | null;
  link?: string;
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? "";

    if (!token) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    async function fetchProjects() {
      try {
        const res = await getListProject({
          token,
          skip: 0,
          limit: 100,
        });

        const data = res?.data || [];

        const initialOrder = data.map((p: Project) => p.id);

        const sortedData = [...data].sort(
          (a, b) => initialOrder.indexOf(a.id) - initialOrder.indexOf(b.id)
        );

        const linkMap: Record<string, string> = {
          "T&T City Millennia": "/Tuong-tac/Millennia-City",
          "T&T Phước Thọ": "/Tuong-tac/Phuoc-tho",
          "T&T Times Square": "/Tuong-tac/Times-Square",
          "T&T Cà Mau": "/Tuong-tac/Ca-mau",
        };

        const dataWithLink = sortedData.map((project: Project) => {
          const baseLink =
            linkMap[project.name] || `/Dieu-khien-${project.id}`;

          return {
            ...project,
            link: `${baseLink}?id=${project.id}`,
          };
        });

        setProjects(dataWithLink);
      } catch (error: unknown) {
        console.error("Failed to fetch projects:", error);

        let errorMessage = "Không thể tải danh sách dự án";

        if (typeof error === "object" && error !== null && "response" in error) {
          const err = error as {
            response?: {
              data?: {
                detail?: string;
                message?: string;
              };
            };
          };

          errorMessage =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            errorMessage;
        }

        NotificationExtension.Fails(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          {/* ✅ SỬA Ở ĐÂY */}
          <div
            className={`${styles.cardGrid} ${
              projects.length <= 3 ? styles.centerGrid : ""
            }`}
          >
            {projects.map((project) => (
              <Card
                key={project.id}
                shadow="sm"
                radius="md"
                withBorder
                padding="0"
                className={styles.card}
              >
                <Image
                  src={project.overview_image || "/placeholder.png"}
                  height={160}
                  alt={project.name}
                  style={{
                    borderTopLeftRadius: "var(--mantine-radius-md)",
                    borderTopRightRadius: "var(--mantine-radius-md)",
                  }}
                />

                <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
                  <Text fw={500}>{project.name}</Text>

                  <Text size="sm" c="dimmed">
                    Loại dự án: {project.type || "Thông tin chưa có"}
                  </Text>

                  <Text size="sm" c="dimmed">
                    Địa chỉ: {project.address || "Địa chỉ chưa có"}
                  </Text>

                  <Text size="sm" c="dimmed">
                    Nhà đầu tư: {project.investor || "Thông tin chưa có"}
                  </Text>
                </Stack>

                <Button
                  component="a"
                  href={project.link}
                  className={`${styles.baseButton} ${styles.primaryButton}`}
                >
                  Đi tới dự án
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Thông báo"
        centered
      >
        <Text>Bạn cần đăng nhập để xem danh sách dự án.</Text>

        <Button
          mt="md"
          fullWidth
          onClick={() => (window.location.href = "/dang-nhap")}
          style={{
            backgroundColor: "#ffbe00",
            color: "#762f0b",
            fontWeight: 600,
          }}
        >
          Đăng nhập ngay
        </Button>
      </Modal>
    </>
  );
}