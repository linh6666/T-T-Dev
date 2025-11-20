"use client";

import { useEffect, useState } from "react";
import { Card, Image, Stack, Text, Button, Loader, Modal } from "@mantine/core";
import styles from './NotFoundTitle.module.css';
import { getListProject } from "../../api/apigetlistProject";
import { GetJoinProject } from "../../api/apiGetJoinProject";

// 👉 Import modal tách file
import RequestModal from "./RequestModal";

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
  const [initialOrder, setInitialOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 👉 State modal gửi yêu cầu
  const [requestModal, setRequestModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? "";

    if (!token) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    async function fetchProjects() {
      try {
        const [listProjectRes] = await Promise.all([
          getListProject({ token, skip: 0, limit: 20 }),
          GetJoinProject({ token })
        ]);

        const data = listProjectRes.data;

        if (initialOrder.length === 0) {
          setInitialOrder(data.map((p: Project) => p.id));
        }

        const sortedData = [...data].sort(
          (a, b) => initialOrder.indexOf(a.id) - initialOrder.indexOf(b.id)
        );

        const dataWithLink = sortedData.map((project, index) => {
          let baseLink = "";
          if (index === 0) baseLink = "/Tuong-tac/Millennia-City";
          else if (index === 1) baseLink = "/Tuong-tac/Phuoc-tho";
          else if (index === 2) baseLink = "/Dieu-khien";
          else baseLink = `/Dieu-khien-${index}`;

          const link = `${baseLink}?id=${project.id}`;
          return { ...project, link };
        });

        setProjects(dataWithLink);
      } catch (error) {
        console.error("Failed to fetch:", error);
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
          <div className={styles.cardGrid}>
            <Card></Card>
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
                  <Text size="sm" c="dimmed">Loại dự án: {project.template || "Thông tin chưa có"}</Text>
                  <Text size="sm" c="dimmed">Địa chỉ: {project.address || "Địa chỉ chưa có"}</Text>
                  <Text size="sm" c="dimmed">Nhà đầu tư: {project.investor || "Thông tin chưa có"}</Text>
                  <Text size="sm" c="dimmed">Vai trò: {project.rank_name || "Chưa gán rank"}</Text>
                </Stack>

                {/* 👉 Nút xử lý logic cũ + mở modal */}
                <Button
                  component={project.rank_name ? "a" : "button"}
                  href={project.rank_name ? project.link : undefined}
                  className={`${styles.baseButton} ${styles.primaryButton}`}
                  onClick={() => {
                    if (!project.rank_name) {
                      setSelectedProject(project);
                      setRequestModal(true);
                    }
                  }}
                >
                  {project.rank_name ? "Đi tới dự án" : "Gửi yêu cầu"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 👉 Modal gửi yêu cầu */}
      <RequestModal
  opened={requestModal}
  onClose={() => setRequestModal(false)}
  projectName={selectedProject?.name}
  projectId={selectedProject?.id}
  onConfirm={() => {
    console.log("API gửi yêu cầu...", selectedProject?.id);
  }}
  // Giả sử bạn có một biến userToken chứa token của người dùng
/>

      {/* Modal đăng nhập giữ nguyên */}
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
