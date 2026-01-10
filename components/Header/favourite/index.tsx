"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ProjectList.module.css";
import { getListProject } from "../../../api/apigetlistProject";

interface Project {
  id: string;
  name: string;
  address?: string | null;
  overview_image?: string | null;
  investor?: string | null;
  project_template_id?: string;
  rank?: number;
  template?: string | null;
  timeout_minutes?: number;
  rank_name?: string | null;
  type?: string | null;
  link?: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getListProject({
        token: "", 
        skip: 0,
        limit: 100,
      });

      if (res && res.data) {
        setProjects(res.data);
        // Lưu cache để lần sau load nhanh hơn
        localStorage.setItem("projects", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách project:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Kiểm tra cache trước
    const cached = localStorage.getItem("projects");
    if (cached) {
      setProjects(JSON.parse(cached));
      setLoading(false);
    }

    // Gọi API để cập nhật dữ liệu mới
    fetchProjects();
  }, [fetchProjects]);

  const handleNavigate = (link?: string) => {
    if (link) {
      window.location.href = link;
    } else {
      alert("Dự án này chưa có link truy cập.");
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Đang tải dữ liệu dự án...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {projects.length > 0 ? (
        projects.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imagePlaceholder}>
              {item.overview_image ? (
                <img
                  src={item.overview_image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-project.png";
                  }}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.text}>
                <h3 className={styles.title}>{item.name}</h3>

                {item.address && (
                  <p className={styles.address}>
                    <strong>Địa chỉ:</strong> {item.address}
                  </p>
                )}

                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.button}
                    onClick={() => handleNavigate(item.link)}
                  >
                    Truy cập
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.empty}>
          <p>Không có dữ liệu dự án nào để hiển thị.</p>
        </div>
      )}
    </div>
  );
}
