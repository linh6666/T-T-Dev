"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Select, ActionIcon, Group, Box, TextInput, Button, Loader } from "@mantine/core";
import { IconPlus, IconChevronDown, IconTrash } from "@tabler/icons-react";
import { getListProject } from "../../../api/apigetlistProject";
import { getListRoles } from "../../../api/apigetlistAttributes";
import { createProjectTemplate } from "../../../api/apiNodeAttribute";

interface ProjectTemplate {
  id: string | number;
  label: string;
  name?: string;
}

interface SelectNode {
  id: string;
  value: string;
  quantity?: number;
  children: SelectNode[];
}

export default function RecursiveSelect() {
  const [templateOptions, setTemplateOptions] = useState<{ value: string; label: string }[]>([]);
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectTree, setSelectTree] = useState<SelectNode[]>([
    { id: "root", value: "", children: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") || "" : "";

  // 🧠 Lấy danh sách project (lớp 1)
  const fetchTemplateList = useCallback(async () => {
    try {
      const res = await getListProject({ token, skip: 0, limit: 100 });
      const data: ProjectTemplate[] = res.data || [];
      const options = data.map((item) => ({
        value: item.id.toString(),
        label: item.name || `Project ${item.id}`,
      }));
      setTemplateOptions(options);
    } catch (err) {
      console.error("Lỗi khi load danh sách project:", err);
      setTemplateOptions([]);
    }
  }, [token]);

  // 🧠 Lấy danh sách roles (lớp 2)
  const fetchRoles = useCallback(async () => {
    try {
      const res = await getListRoles({ token });
      const data: ProjectTemplate[] = res.data || [];
      const opts = data.map((item) => ({
        value: item.id.toString(),
        label: item.name || `${item.label}`,
      }));
      setRoleOptions(opts);
    } catch (err) {
      console.error("Lỗi khi load roles:", err);
      setRoleOptions([]);
    }
  }, [token]);

  useEffect(() => {
    fetchTemplateList();
    fetchRoles();
  }, [fetchTemplateList, fetchRoles]);

  // ✅ Cập nhật giá trị node
  const updateNodeValue = useCallback((id: string, newValue: string) => {
    const updateNode = (nodes: SelectNode[]): SelectNode[] =>
      nodes.map((node) => {
        if (node.id === id) return { ...node, value: newValue };
        if (node.children.length > 0) return { ...node, children: updateNode(node.children) };
        return node;
      });

    setSelectTree((prev) => updateNode(prev));
  }, []);

  // ✅ Cập nhật số lượng node (cho phép undefined)
  const updateNodeQuantity = useCallback((id: string, newQty: number | undefined) => {
    const updateQty = (nodes: SelectNode[]): SelectNode[] =>
      nodes.map((node) => {
        if (node.id === id) return { ...node, quantity: newQty };
        if (node.children.length > 0) return { ...node, children: updateQty(node.children) };
        return node;
      });

    setSelectTree((prev) => updateQty(prev));
  }, []);

  // ✅ Thêm lớp con
  const handleAddChild = useCallback((id: string) => {
    const addChild = (nodes: SelectNode[]): SelectNode[] =>
      nodes.map((node) => {
        if (node.id === id) {
          const quantity = node.quantity && node.quantity > 0 ? node.quantity : 1;

          const newChildren: SelectNode[] = [];
          for (let i = 0; i < quantity; i++) {
            newChildren.push({
              id: `${id}-${node.children.length + i + 1}`,
              value: "",
              quantity: 1, // luôn có quantity
              children: [],
            });
          }

          return { ...node, children: [...node.children, ...newChildren] };
        }

        if (node.children.length > 0) {
          return { ...node, children: addChild(node.children) };
        }

        return node;
      });

    setSelectTree((prev) => addChild(prev));
  }, []);

  // ✅ Xóa node
  const handleDeleteNode = useCallback((id: string) => {
    if (id === "root") return;

    const deleteNode = (nodes: SelectNode[]): SelectNode[] =>
      nodes
        .filter((node) => node.id !== id)
        .map((node) =>
          node.children.length > 0 ? { ...node, children: deleteNode(node.children) } : node
        );

    setSelectTree((prev) => deleteNode(prev));
  }, []);

  // ✅ Lấy tất cả giá trị cuối (lớp 3 trở đi)
  const collectAllValues = (nodes: SelectNode[]): { value: string }[] => {
    let result: { value: string }[] = [];
    for (const node of nodes) {
      if (node.children.length === 0 && node.value.trim() !== "") {
        result.push({ value: node.value });
      } else if (node.children.length > 0) {
        result = result.concat(collectAllValues(node.children));
      }
    }
    return result;
  };

  // ✅ Gửi API tạo dữ liệu
  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const project_id = selectTree[0]?.value || "";
      const attribute_id = selectTree[0]?.children?.[0]?.value || "";

      const values = collectAllValues(selectTree);

      if (!project_id || !attribute_id || values.length === 0) {
        alert("⚠️ Vui lòng chọn đủ Dự án, Thuộc tính và nhập ít nhất 1 giá trị!");
        setLoading(false);
        return;
      }

      const payload = {
        project_id,
        attribute_id,
        values,
      };

      console.log("📦 Payload gửi API:", payload);
      const res = await createProjectTemplate(payload);
      console.log("Kết quả trả về:", res);

      alert("✅ Tạo dữ liệu thành công!");

      // ✅ Reset form
      setSelectTree([{ id: "root", value: "", quantity: 1, children: [] }]);
    } catch (err) {
      console.error("❌ Lỗi khi tạo dữ liệu:", err);
      alert("❌ Có lỗi khi tạo, xem console để biết thêm chi tiết.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render đệ quy
  const renderSelects = (nodes: SelectNode[], level = 0) =>
    nodes.map((node) => (
      <Box key={node.id} ml={level * 20} mb="sm">
        <Group align="flex-end">
          {level === 0 && (
            <Select
              label="Dự án"
              placeholder="Chọn dự án"
              data={templateOptions}
              value={node.value}
              onChange={(val) => updateNodeValue(node.id, val || "")}
              rightSection={<IconChevronDown size={16} />}
              withAsterisk
              clearable
              mb="xs"
            />
          )}

          {level === 1 && (
            <Select
              label="Thuộc tính"
              placeholder="Chọn thuộc tính"
              data={roleOptions}
              value={node.value}
              onChange={(val) => updateNodeValue(node.id, val || "")}
              rightSection={<IconChevronDown size={16} />}
              withAsterisk
              clearable
              mb="xs"
            />
          )}

          {level >= 2 && (
            <Group align="flex-end">
              <TextInput
                label={`Giá trị lớp ${level + 1}`}
                placeholder="Nhập giá trị..."
                value={node.value}
                onChange={(e) => updateNodeValue(node.id, e.currentTarget.value)}
                style={{ flex: 2 }}
              />
              <TextInput
                label="Số lượng"
                type="number"
                placeholder="nhập số lượng"
                value={node.quantity !== undefined ? node.quantity.toString() : ""}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  const qty = val === "" ? undefined : parseInt(val, 10);
                  updateNodeQuantity(node.id, qty); // input có thể trống
                }}
                style={{ width: "100px" }}
              />
            </Group>
          )}

          {node.id !== "root" && (
            <ActionIcon color="red" variant="light" onClick={() => handleDeleteNode(node.id)}>
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>

        {node.value && (
          <Group mb="sm" mt="xs">
            <ActionIcon color="blue" variant="filled" onClick={() => handleAddChild(node.id)}>
              <IconPlus size={16} />
            </ActionIcon>
            <span>Thêm lớp con</span>
          </Group>
        )}

        {node.children.length > 0 && renderSelects(node.children, level + 1)}
      </Box>
    ));

  return (
    <div>
      {renderSelects(selectTree)}

      <Group mt="xl">
        <Button onClick={handleCreateUser} color="green" disabled={loading}>
          {loading ? <Loader size="xs" /> : "Tạo dữ liệu"}
        </Button>
      </Group>
    </div>
  );
}
