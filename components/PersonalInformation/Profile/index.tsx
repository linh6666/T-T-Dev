"use client";

import {
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Divider,
  Container,
  Title,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { getListProvinces } from "../../../api/apigetlistaddress";
import { getWardsByProvince } from "../../../api/apigetlistProvinces";
import useAuth from "../../../hook/useAuth";
import { Editme } from "../../../api/apiEditme";
import { NotificationExtension } from "../../../extension/NotificationExtension";
import { modals } from "@mantine/modals";

/* ================= TYPES ================= */
interface User {
  email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  is_superuser: boolean;
  province_id: string;
  ward_id: string;
  introducer_id: string;
  creation_time: string;
  detal_address: string;
  last_login: string;
}

interface Province {
  code: string;
  full_name_vi: string;
}

interface Ward {
  code: string;
  full_name_vi: string;
}

/* ================= COMPONENT ================= */
export default function ProfileInfo() {
  const { user } = useAuth(); // 👈 lấy user từ API

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editedUser, setEditedUser] = useState<User>({
    email: "",
    full_name: "",
    phone: "",
    is_active: false,
    is_superuser: false,
    province_id: "",
    ward_id: "",
    introducer_id: "",
    creation_time: "",
    detal_address: "",
    last_login: "",
  });

  const [provinceOptions, setProvinceOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [wardOptions, setWardOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  /* ========== LOAD USER FROM AUTH ========== */
  useEffect(() => {
    if (!user) return;

    setEditedUser({
      email: user.email || "",
      full_name: user.full_name || "",
      phone: user.phone || "",
     is_active: user.is_active ?? false,
is_superuser: user.is_superuser ?? false,
      province_id: user.province_id || "",
      ward_id: user.ward_id || "",
      introducer_id: user.introducer_id || "",
      creation_time: user.creation_time || "",
      detal_address: user.detal_address || "",
      last_login: user.last_login || "",
    });

    if (user.province_id) {
      setSelectedProvince(user.province_id);
    }
  }, [user]);

  /* ========== FETCH PROVINCES ========== */
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data: Province[] = await getListProvinces();
        setProvinceOptions(
          data.map((item) => ({
            value: item.code,
            label: item.full_name_vi,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      }
    };

    fetchProvinces();
  }, []);

  /* ========== FETCH WARDS ========== */
  useEffect(() => {
    if (!selectedProvince) return;

    const fetchWards = async () => {
      try {
        const data: Ward[] = await getWardsByProvince(selectedProvince);
        setWardOptions(
          data.map((item) => ({
            value: item.code,
            label: item.full_name_vi,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy phường/xã:", error);
        setWardOptions([]);
      }
    };

    fetchWards();
  }, [selectedProvince]);

  /* ========== SAVE ========== */
const handleSave = async () => {
  modals.openConfirmModal({
    title: "Xác nhận lưu thay đổi",
    children: "Bạn có chắc muốn lưu các thay đổi này không?",
    confirmProps: {
      style: { backgroundColor: "#ffbe00", color: "#762f0b" },
    },
    labels: { confirm: "Có", cancel: "Không" },

    onConfirm: async () => {
      setLoading(true);
      try {
        const payload = {
          full_name: editedUser.full_name,
          phone: editedUser.phone,
          province_id: editedUser.province_id,
          ward_id: editedUser.ward_id,
          introducer_id: editedUser.introducer_id,
          detal_address: editedUser.detal_address,
        };

        await Editme(payload);
        NotificationExtension.Success("Cập nhật thông tin thành công!");

        setTimeout(() => {
          window.location.reload();
        }, 10);

        setIsEditing(false);
      } catch (error: unknown) {
        let message = "Có lỗi xảy ra";

        if (error instanceof Error) {
          message = error.message;
        }

        NotificationExtension.Fails(`Cập nhật thất bại: ${message}`);
      } finally {
        setLoading(false);
      }
    },
  });
};

  /* ========== CANCEL ========== */
  const handleCancel = () => {
    modals.openConfirmModal({
      title: "Xác nhận",
      children: "Bạn có chắc muốn hủy các thay đổi không?",
      labels: { confirm: "Có", cancel: "Không" },
      confirmProps: {
        style: { backgroundColor: "#ffbe00", color: "#762f0b" },
      },
      onConfirm: () => {
        if (!user) return;

        setEditedUser({
          email: user.email || "",
          full_name: user.full_name || "",
          phone: user.phone || "",
          is_active: user.is_active ?? false,
is_superuser: user.is_superuser ?? false,
          province_id: user.province_id || "",
          ward_id: user.ward_id || "",
          introducer_id: user.introducer_id || "",
          creation_time: user.creation_time || "",
          detal_address: user.detal_address || "",
          last_login: user.last_login || "",
        });

        setSelectedProvince(user.province_id || null);
        setIsEditing(false);
        NotificationExtension.Info("Đã hủy các thay đổi");
      },
    });
  };

  /* ================= UI (GIỮ NGUYÊN 100%) ================= */
  return (
    <Container size="sm" py="xl">
      <Title order={2} c="#762f0b" ta="center" mb="lg">
        Hồ sơ cá nhân
      </Title>

      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Group mb="md" justify="space-between">
          <Group>
            <Avatar src={null} alt={editedUser.full_name} size={60} radius="xl" />
            <Stack gap={2}>
              <Text fw={600}>{editedUser.full_name || "Chưa có"}</Text>
              <Text c="dimmed" fz="sm">
                {editedUser.email}
              </Text>
            </Stack>
          </Group>

          {!isEditing && (
            <Button
              color="#ffbe00"
              onClick={() => setIsEditing(true)}
              style={{ color: "#762f0b" }}
            >
              Chỉnh sửa
            </Button>
          )}
        </Group>

        <Divider mb="md" />

        <Stack gap="sm">
          {/* Tên */}
          <Group justify="space-between">
            <Text c="dimmed">Tên:</Text>
            {isEditing ? (
              <TextInput
                value={editedUser.full_name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, full_name: e.currentTarget.value })
                }
              />
            ) : (
              <Text>{editedUser.full_name || "Chưa có"}</Text>
            )}
          </Group>

          {/* Email */}
          <Group justify="space-between">
            <Text c="dimmed">Email:</Text>
            {isEditing ? (
              <TextInput value={editedUser.email} disabled />
            ) : (
              <Text>{editedUser.email}</Text>
            )}
          </Group>

          {/* SĐT */}
          <Group justify="space-between">
            <Text c="dimmed">SĐT:</Text>
            {isEditing ? (
              <TextInput
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.currentTarget.value })
                }
              />
            ) : (
              <Text>{editedUser.phone || "Chưa có"}</Text>
            )}
          </Group>

          {/* Quyền */}
          <Group justify="space-between">
            <Text c="dimmed">Quyền:</Text>
            <Text>
              {editedUser.is_superuser
                ? "Admin"
                : editedUser.is_active
                ? "User thường"
                : "Không xác định"}
            </Text>
          </Group>

          {/* Tỉnh */}
          <Group justify="space-between">
            <Text c="dimmed">Tỉnh/Thành phố:</Text>
            {isEditing ? (
              <Select
                data={provinceOptions}
                value={editedUser.province_id}
                onChange={(value) => {
                  setEditedUser({ ...editedUser, province_id: value || "" });
                  setSelectedProvince(value);
                }}
                searchable
                style={{ maxWidth: 185 }}
                  styles={{
    input: {
      cursor: "pointer",
    },
  }}
              />
            ) : (
              <Text>
                {provinceOptions.find(
                  (p) => p.value === editedUser.province_id
                )?.label || "Chưa có"}
              </Text>
            )}
          </Group>

          {/* Phường */}
          <Group justify="space-between">
            <Text c="dimmed">Phường/Xã:</Text>
            {isEditing ? (
              <Select
                data={wardOptions}
                value={editedUser.ward_id}
                onChange={(value) =>
                  setEditedUser({ ...editedUser, ward_id: value || "" })
                }
                searchable
                style={{ maxWidth: 185 }}
                  styles={{
    input: {
      cursor: "pointer",
    },
  }}
              />
            ) : (
              <Text>
                {wardOptions.find(
                  (w) => w.value === editedUser.ward_id
                )?.label || "Chưa có"}
              </Text>
            )}
          </Group>

          {/* Người giới thiệu */}
          <Group justify="space-between">
            <Text c="dimmed">Mã người giới thiệu:</Text>
            {isEditing ? (
              <TextInput
                value={editedUser.introducer_id}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    introducer_id: e.currentTarget.value,
                  })
                }
              />
            ) : (
              <Text>{editedUser.introducer_id || "Chưa có"}</Text>
            )}
          </Group>

          {/* Địa chỉ */}
          <Group justify="space-between">
            <Text c="dimmed">Địa chỉ chi tiết:</Text>
            {isEditing ? (
              <TextInput
                value={editedUser.detal_address}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    detal_address: e.currentTarget.value,
                  })
                }
              />
            ) : (
              <Text>{editedUser.detal_address || "Chưa có"}</Text>
            )}
          </Group>
        </Stack>

        {isEditing && (
          <Group justify="flex-end" mt="xl">
            <Button
              color="#808080"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              style={{ fontSize: "12px" }}
            >
              Hủy
            </Button>
            <Button
              color="#ffbe00"
              onClick={handleSave}
              loading={loading}
              style={{ color: "#762f0b", fontSize: "12px" }}
            >
              Lưu thay đổi
            </Button>
          </Group>
        )}
      </Paper>
    </Container>
  );
}
