import { Button, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { deleteUserManagement } from "../../../api/apideleteproject";

type DeleteProductProps = {
  idItem: string[]; // UUID dưới dạng chuỗi
  onSearch: () => void;
  lang: "vi" | "en"; // ⬅️ thêm prop lang
};

const DeleteView = ({ idItem, onSearch, lang }: DeleteProductProps) => {
  const handleDeleteUsers = async () => {
    try {
      for (const userId of idItem) {
        await deleteUserManagement(userId); // Gọi API xóa từng dự án
      }

      // Hiển thị thông báo thành công
      notifications.show({
        title: lang === "vi" ? "Thành công" : "Success",
        message:
          lang === "vi"
            ? `${idItem.length} dự án đã xóa thành công.`
            : `${idItem.length} project(s) deleted successfully.`,
        color: "green",
        icon: <IconCheck size={20} />,
      });

      // Xoá thành công, đóng modal và gọi lại onSearch
      modals.closeAll();
      onSearch();
    } catch (error) {
      console.error("Lỗi xoá dự án:", error);

      notifications.show({
        title: lang === "vi" ? "Lỗi" : "Error",
        message:
          lang === "vi"
            ? "Đã xảy ra lỗi khi xóa dự án."
            : "An error occurred while deleting project(s).",
        color: "red",
        icon: <IconX size={20} />,
      });
    }
  };

  return (
    <div>
      <Text size="lg" fw={500} mb="md">
        {lang === "vi"
          ? `Bạn có chắc chắn muốn xóa ${idItem.length} dự án đã chọn?`
          : `Are you sure you want to delete ${idItem.length} selected project(s)?`}
      </Text>

      <Group justify="center" mt="lg">
        <Button
          color="red"
          onClick={handleDeleteUsers}
          leftSection={<IconCheck size={18} />}
        >
          {lang === "vi" ? "Xác nhận xóa" : "Confirm Delete"}
        </Button>

        <Button
          variant="outline"
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          {lang === "vi" ? "Hủy" : "Cancel"}
        </Button>
      </Group>
    </div>
  );
};

export default DeleteView;


