"use client";
import { useEffect, useState } from "react";
import { Card, Image, Stack, Text, Button, Loader, Modal, Group } from "@mantine/core";
import { DonutChart } from '@mantine/charts';
import { Sector } from 'recharts';
import styles from './NotFoundTitle.module.css';
import { getListProject } from "../../api/apigetlistProject";
import { GetJoinProject } from "../../api/apiGetJoinProject";
import RequestModal from "./RequestModal";
import { useRouter } from "next/navigation";

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
  unit_status_summary?: {
    total_units: number;
    statuses: {
      id: string;
      status_name: string;
      count: number;
      percent: number;
    }[];
  };
}

interface JoinedProject {
  project_id: string;
  status: string;
}

function ProjectCard({ project, joinedProjects, onSelect }: { project: Project, joinedProjects: JoinedProject[], onSelect: (p: Project) => void }) {
  const router = useRouter();
  const joinedProject = joinedProjects.find(item => item.project_id === project.id);
  const status = joinedProject?.status;

  const [hoveredStatus, setHoveredStatus] = useState<{ name: string; color: string; percent: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getStatusColor = (name: string) => {
    switch (name) {
      case 'Đang bán': return '#40c057';
      case 'Đã đặt cọc': return '#fab005';
      case 'Đã bán': return '#f0441c';
      default: return '#dee2e6';
    }
  };

  const chartData = project.unit_status_summary?.statuses?.map((item) => ({
    name: item.status_name,
    value: item.percent,
    color: getStatusColor(item.status_name)
  })) || [];

  return (
    <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
      <Image
        src={project.overview_image || "/placeholder.png"}
        height={160}
        alt={project.name}
        style={{
          borderTopLeftRadius: "var(--mantine-radius-md)",
          borderTopRightRadius: "var(--mantine-radius-md)",
        }}
      />
        <Text className={styles.projectName}>{project.name}</Text>
      <Group wrap="nowrap" p="md" align="flex-start" style={{ flexGrow: 1 }}>
        
        <Stack gap="xs" style={{ flex: 1 }}>
        
          <Text size="xs" c="dimmed">Loại dự án: {project.type || "Thông tin chưa có"}</Text>
          <Text size="xs" c="dimmed">Địa chỉ: {project.address || "Địa chỉ chưa có"}</Text>
          <Text size="xs" c="dimmed">Chủ đầu tư: {project.investor || "Thông tin chưa có"}</Text>
        </Stack>

        <Stack align="center" gap={0} style={{ minWidth: 100 }}>
          <div className={styles.chartContainer}>
            <DonutChart
  size={80}
  thickness={16}
  // strokeWidth={1.5}
  data={chartData}
  withTooltip={false}
  chartLabel={
    hoveredStatus
      ? `${hoveredStatus.percent.toFixed(0)}%`
      : undefined
  }
  pieProps={{
    activeIndex: hoveredIndex !== null ? hoveredIndex : undefined,
    activeShape: (props: Record<string, number & string>) => (
      <Sector
        {...props}
        outerRadius={(props.outerRadius as number) + 4}
      />
    ),
    onMouseEnter: (_: unknown, index: number) => {
      setHoveredIndex(index);
      const item = project.unit_status_summary?.statuses?.[index];
      if (item) {
        setHoveredStatus({
          name: item.status_name,
          color: getStatusColor(item.status_name),
          percent: item.percent,
        });
      }
    },
    onMouseLeave: () => {
      setHoveredIndex(null);
      setHoveredStatus(null);
    },
  } as React.ComponentPropsWithoutRef<typeof DonutChart>['pieProps']}
/>
          </div>
          {/* Luôn render để không thay đổi chiều cao layout — chỉ ẩn bằng visibility */}
          <Text
            size="xs"
            fw={500}
            c="#752E0B"
            mt={5}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              height: 18,
              visibility: hoveredStatus ? 'visible' : 'hidden',
              opacity: hoveredStatus ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            {hoveredStatus?.name ?? '\u00a0'}
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: hoveredStatus?.color ?? 'transparent',
              display: 'inline-block',
              flexShrink: 0,
            }} />
          </Text>
        </Stack>
      </Group>

      <Button
        className={`${styles.baseButton} ${styles.primaryButton}`}
        onClick={() => {
          if (status === "approved" || project.rank_name) {
            router.push(`/quan-ly-ban-hang/tong-mat-bang/${project.id}?name=${encodeURIComponent(project.name)}`);
          } else if (!project.rank_name) {
            onSelect(project);
          }
        }}
        disabled={status === "pending"}
      >
        {status === "pending" 
          ? "Đang chờ phê duyệt" 
          : (project.rank_name ? "Đi tới dự án" : "Gửi yêu cầu")}
      </Button>
    </Card>
  );
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
          getListProject({ token, skip: 0, limit: 100 }),
          GetJoinProject({ token })
        ]);

        setProjects(listProjectRes.data);
        setJoinedProjects(joinedProjectRes.data);
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
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                joinedProjects={joinedProjects} 
                onSelect={(p) => {
                  setSelectedProject(p);
                  setRequestModal(true);
                }} 
              />
            ))}
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
