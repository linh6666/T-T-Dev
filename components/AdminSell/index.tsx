"use client";
import { useEffect, useState } from "react";
import { Card, Image, Stack, Text, Button, Loader, Modal } from "@mantine/core";
import styles from './NotFoundTitle.module.css';
import { getListProject } from "../../api/apigetlistProject";
import { GetJoinProject } from "../../api/apiGetJoinProject";
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

interface JoinedProject {
  project_id: string;
  status: string; // e.g., "pending", "approved"
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<JoinedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
        const [listProjectRes, joinedProjectRes] = await Promise.all([
          getListProject({ token, skip: 0, limit: 20 }),
          GetJoinProject({ token })
        ]);

        const projectData = listProjectRes.data;
        const joinedData = joinedProjectRes.data; // Dữ liệu từ GetJoinProject

        setProjects(projectData);
        setJoinedProjects(joinedData); // Lưu trữ dữ liệu dự án đã tham gia
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
            {projects.map((project) => {
              // Kiểm tra xem dự án có trong danh sách joinedProjects không
              const joinedProject = joinedProjects.find(item => item.project_id === project.id);
              const status = joinedProject?.status; // Lấy trạng thái của joinedProject

              return (
                
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

              <Button
  component={status === "approved" ? "a" : "button"}
  href={status === "approved" ? project.link : undefined}
  className={`${styles.baseButton} ${styles.primaryButton}`}
  onClick={() => {
    if (status !== "approved" && !project.rank_name) {
      setSelectedProject(project);
      setRequestModal(true);
    }
  }}
  disabled={status === "pending"} // Disable button if pending
>
  {status === "pending" 
    ? "Đang chờ phê duyệt" 
    : (project.rank_name ? "Đi tới dự án" : "Gửi yêu cầu")}
</Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <RequestModal
        opened={requestModal}
        onClose={() => setRequestModal(false)}
        projectName={selectedProject?.name}
        projectId={selectedProject?.id}
        onConfirm={() => {
          console.log("API gửi yêu cầu...", selectedProject?.id);
        }}
      />

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