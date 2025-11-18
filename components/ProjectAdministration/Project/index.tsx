"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// import AppSearch from "../../../common/AppSearch";
import { modals } from "@mantine/modals";
import { getListProject } from "../../../api/apigetlistProject";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Group } from "@mantine/core";
import EditView from "./EditView";
import DeleteView from "./DeleteView";

interface DataType {
  id: string;
  name: string;
  template: string;
  address: string;
  investor: string;
  overview_image: string;
  rank: number;
}

export default function LargeFixedTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const token = localStorage.getItem("access_token") || "YOUR_TOKEN_HERE";

  // ===========================
  // 🔥 FETCH DATA CÓ THÊM LANG
  // ===========================
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("⚠️ Không tìm thấy token. Vui lòng đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const result = await getListProject({
        token,
        skip: 0,
        limit: 100,
        lang: language, // ⬅️ thêm lang vào API
      });

      const users = result.data.map((user: DataType) => ({
        id: user.id,
        name: user.name,
        rank: user.rank,
        template: user.template,
        address: user.address,
        investor: user.investor,
        overview_image: user.overview_image,
      }));

      setData(users);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [token, language]); // ⬅️ tự động load lại khi đổi language

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===========================
  // 🔥 MỞ MODAL EDIT
  // ===========================
const openEditUserModal = (role: DataType) => {
  modals.openConfirmModal({
    title: (
      <div style={{ fontWeight: 600, fontSize: 18 }}>
        {language === "vi" ? "Chỉnh sửa dự án" : "Edit Project"}
      </div>
    ),
    children: (
      <EditView
        id={role.id}
        lang={language}        // ⬅️ TRUYỀN LANG VÀO EDITVIEW
        onSearch={fetchData}
      />
    ),
    confirmProps: { display: "none" },
    cancelProps: { display: "none" },
  });
};

  // ===========================
  // 🔥 MỞ MODAL DELETE
  // ===========================
const openDeleteUserModal = (role: DataType) => {
  modals.openConfirmModal({
    title: (
      <div style={{ fontWeight: 600, fontSize: 18 }}>
        {language === "vi" ? "Xóa dự án" : "Delete Project"}
      </div>
    ),
    children: (
      <DeleteView
        idItem={[role.id]}
        lang={language}        // ⬅️ TRUYỀN LANG VÀO DELETEVIEW
        onSearch={fetchData}
      />
    ),
    confirmProps: { display: "none" },
    cancelProps: { display: "none" },
  });
};


  // ===========================
  // 🔥 CÁC CỘT — THAY ĐỔI THEO LANG
  // ===========================
  const columns: ColumnsType<DataType> = [
    {
      title: language === "vi" ? "Tên dự án" : "Project Name",
      dataIndex: "name",
      key: "name",
      width: 5,
      fixed: "left",
    },
    {
      title: language === "vi" ? "Loại dự án" : "Template",
      dataIndex: "template",
      key: "template",
      width: 10,
    },
    {
      title: language === "vi" ? "Địa chỉ" : "Address",
      dataIndex: "address",
      key: "address",
      width: 10,
    },
    {
      title: language === "vi" ? "Chủ đầu tư" : "Investor",
      dataIndex: "investor",
      key: "investor",
      width: 10,
    },
    {
      title: language === "vi" ? "Hình ảnh" : "Image",
      dataIndex: "overview_image",
      key: "overview_image",
      width: 10,
      render: (url: string) => (
        <img
          src={url}
          alt="overview"
          style={{ width: 130, height: 70, objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: language === "vi" ? "Cấp bậc" : "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 5,
    },
    {
      title: language === "vi" ? "Hành động" : "Action",
      width: 5,
      fixed: "right",
      render: (user: DataType) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Chỉnh sửa"
              color="success"
              onClick={() => openEditUserModal(user)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label="Xóa"
              color="danger"
              onClick={() => openDeleteUserModal(user)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  return (
    <>
      <Group
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {/* <AppSearch /> */}

        {/* 🔥 SELECT LANG */}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="language-select" style={{ marginRight: 8 }}>
            {language === "vi" ? "Chọn ngôn ngữ:" : "Select Language:"}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </Group>

      {/* 🔥 TABLE */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 2000 }}
        pagination={false}
        bordered
        rowKey="id"
      />

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </>
  );
}
