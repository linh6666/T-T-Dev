"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppSearch from "../../../common/AppSearch";
// import AppAction from "../../../common/AppAction";

import { modals } from "@mantine/modals";
import {  getListProject } from "../../../api/apigetlistProject";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Group } from "@mantine/core";
// import CreateView from "./CreateView";
import EditView from "./EditView";
import DeleteView from "./DeleteView";

interface DataType {
  id: string; // ✅ thêm id để dùng cho chỉnh sửa
  name: string;
  type: string;
  address: string;
  investor: string;
  image_url: string;
  rank: number;
//   description_en: string;
}

export default function LargeFixedTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token") || "YOUR_TOKEN_HERE";

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("⚠️ Không tìm thấy token. Vui lòng đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const result = await  getListProject({ token, skip: 0, limit: 100 });
      const users = result.data.map((user: DataType) => ({
        id: user.id, // ✅ map thêm id
        name: user.name,
        rank: user.rank,
        type: user.type,
        address: user.address,
        investor: user.investor,
        image_url: user.image_url,
        // description_en: user.description_en,
      }));
      setData(users);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Hàm mở modal chỉnh sửa
  const openEditUserModal = (role: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa dự án</div>,
      children: <EditView id={role.id} onSearch={fetchData} />, // ✅ đổi fetchRoles → fetchData
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  // ✅ Định nghĩa cột bảng
  const columns: ColumnsType<DataType> = [
    { title: "Tên dự án", dataIndex: "name", key: "name", width: 20 ,fixed: "left"},
    { title: "Loại dự án", dataIndex: "type", key: "type", width: 20 },
    { title: "Địa chỉ", dataIndex: "address", key: "address", width: 20 },
    { title: "Chủ đầu tư", dataIndex: "investor", key: "investor", width: 50 },
    { title: "Hình ảnh", dataIndex: "image_url", key: "image_url", width: 20 },
    { title: "Cấp bậc", dataIndex: "rank", key: "rank", width: 15 },
    // { title: "Mô Tả (Tiếng Anh)", dataIndex: "description_en", key: "description_en", width: 100 },
   
   
    {
      title: "Hành Động",
      width: 15,
      fixed: "right",
      render: (user: DataType) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            {/* ✅ truyền đúng user vào onClick */}
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Chỉnh sửa"
              color="success"
              onClick={() => openEditUserModal(user)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon iconType="trash" aria-label="Xóa" color="danger" onClick={() => openDeleteUserModal(user)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // ✅ Modal thêm người dùng
  // const openModal = () => {
  //   modals.openConfirmModal({
  //     title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm dự án mới</div>,
  //     children: <CreateView onSearch={fetchData} />,
  //     size: "lg",
  //     radius: "md",
  //     confirmProps: { display: "none" },
  //     cancelProps: { display: "none" },
  //   });
  // };

    const openDeleteUserModal = (role: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa dự án</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchData} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  return (
    <>
      <Group style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppSearch />
        {/* <AppAction openModal={openModal} /> */}
      </Group>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
         scroll={{ x: 2000 }}
        pagination={false}
        bordered
        rowKey="id" // ✅ thêm key cho mỗi hàng
      />

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </>
  );
}
