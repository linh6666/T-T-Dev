"use client";

import { useEffect, useState } from "react";
import { Modal, Text, Button, Select, Textarea } from "@mantine/core";
import { getListRoles } from "../../../api/getlistrole";

interface RequestModalProps {
  opened: boolean;
  onClose: () => void;
  projectName?: string;
  projectId?: string;
  onConfirm?: (payload: { role: string; content: string }) => void;
}

export default function RequestModal({
  opened,
  onClose,
  projectName,
  projectId,
  onConfirm,
}: RequestModalProps) {
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [requestContent, setRequestContent] = useState<string>("");

  useEffect(() => {
    if (opened) {
      const fetchRoles = async () => {
        try {
          const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
          if (!token) {
            console.error("Token not found");
            return;
          }

          const response = await getListRoles({ token });
          const roleOptions = response.data.map((role: { name: string }) => ({
            value: role.name,
            label: role.name,
          }));
          setRoles(roleOptions);
        } catch (error) {
          console.error("Failed to fetch roles:", error);
        }
      };

      fetchRoles();
    }
  }, [opened]);

  const handleConfirm = () => {
    if (!selectedRole) {
      alert("Vui lòng chọn vai trò");
      return;
    }
    const payload = {
      role: selectedRole,
      content: requestContent,
    };
    console.log("Gửi yêu cầu cho project:", projectId, payload);
    onConfirm?.(payload);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        <Text fw={500} size="lg">
          Tham gia dự án <span>{projectName}</span>
        </Text>
      }
    >
      <Select
        label="Vai trò"
        placeholder="Chọn vai trò của bạn trong dự án"
        data={roles}
        value={selectedRole}
        onChange={setSelectedRole}
        clearable
      />
      <Textarea
        label="Nội dung yêu cầu"
        placeholder="Nhập nội dung yêu cầu của bạn"
        value={requestContent}
        onChange={(event) => setRequestContent(event.currentTarget.value)}
        mt="md"
      />
      <Button fullWidth mt="md" color="yellow" onClick={handleConfirm}>
        Gửi yêu cầu tham gia
      </Button>
    </Modal>
  );
}
