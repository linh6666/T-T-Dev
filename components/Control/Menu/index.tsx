"use client";

import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import Sun from "./Sun";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import FilterMenu from "./FilterMenu";
import ProjectionModal from "./ProjectionModal";
import { getListMapping } from "../../../api/apigetlimapping";

interface MenuProps {
  project_id: string | null;
}

interface MappingItem {
  id: string;
  project_id: string;
  name: string;
  node_attribute_id: string | null;
  button_label_vi: string;
  button_label_en: string;
}

interface MenuItem {
  label: string;
  link?: string;
  type?: "modal";
  mappingId?: string;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();

  const [showFilter, setShowFilter] = useState(false);
  const [openedProjection, setOpenedProjection] = useState(false);
  const [mappingButtons, setMappingButtons] = useState<MappingItem[]>([]);
  const [selectedMappingId, setSelectedMappingId] = useState<string | null>(
    null
  );

  // Call API lấy mapping
  useEffect(() => {
    const fetchMapping = async () => {
      if (!project_id) return;

      try {
        const res = await getListMapping({
          token: "",
          project_id: project_id,
        });

        setMappingButtons(res.data);
      } catch (error) {
        console.error("Lỗi lấy mapping:", error);
      }
    };

    fetchMapping();
  }, [project_id]);

  // Menu items
  const menuItems: MenuItem[] = [
    ...mappingButtons.map((item) => ({
      label: item.button_label_vi,
      type: "modal" as const,
      mappingId: item.id,
    })),

    {
      label: "GIỚI THIỆU DỰ ÁN",
      link: `/Tuong-tac/Millennia-City/Gioi-thieu-du-an${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
    {
      label: "HỆ THỐNG PHÂN KHU",
      link: `/Tuong-tac/Millennia-City/Phan-khu${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
    {
      label: "HỆ THỐNG TIỆN ÍCH",
      link: `/Tuong-tac/Millennia-City/Tien-ich${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
    {
      label: "HIỆU ỨNG ÁNH SÁNG",
      link: `/Tuong-tac/Millennia-City/Hieu-ung-anh-sang${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
    {
      label: "THƯ VIỆN ẢNH",
      link: `/Tuong-tac/Millennia-City/Thu-vien-anh${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
    {
      label: "HƯỚNG DẪN SỬ DỤNG",
      link: `/Tuong-tac/Millennia-City/Mo-hinh${
        project_id ? `?id=${project_id}` : ""
      }`,
    },
  ];

  return (
    <div className={styles.box}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/Logo/logo-tt-city-millennia.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>MÔ HÌNH TƯƠNG TÁC</h1>
      </div>

      {/* Menu Buttons */}
      <div className={styles.Function}>
        <Stack align="center" style={{ gap: "20px", marginTop: "10px" }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              className={styles.menuBtn}
              variant="outline"
              onClick={() => {
                if (item.type === "modal") {
                  setSelectedMappingId(item.mappingId || null);
                  setOpenedProjection(true);
                } else if (item.link) {
                  router.push(item.link);
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </div>

      {/* Bộ lọc */}
      <div className={styles.searchParams}>
        <div
          className={styles.innerBtn}
          onClick={() => setShowFilter(!showFilter)}
        >
          <IconSearch size={16} /> Bộ lọc sản phẩm
        </div>

        {showFilter && (
          <FilterMenu
            project_id={project_id}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Group gap="xs">
          <Sun project_id={project_id} />

          <Button
            onClick={() => router.push("/Tuong-tac")}
            variant="filled"
            style={{
              width: 30,
              height: 30,
              padding: 0,
              borderRadius: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transition: "background 0.3s",
              background: "#FFFAEE",
              color: "#752E0B",
              border: "1.5px solid #752E0B",
            }}
          >
            <Group gap={0} align="center">
              <IconArrowLeft size={18} color="#752E0B" />
            </Group>
          </Button>
        </Group>
      </div>

      {/* Modal Projection */}
      <ProjectionModal
        opened={openedProjection}
        onClose={() => setOpenedProjection(false)}
          project_id={project_id}
        mappingId={selectedMappingId}
      />
    </div>
  );
}