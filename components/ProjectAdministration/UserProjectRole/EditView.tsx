"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,

  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef,  } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiEditproject";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
}

// interface SystemOption {
//   id: number; // hoặc string, tùy thuộc vào API của bạn
//   name: string;
// }

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  // const [systemOptions, setSystemOptions] = useState<
  //   { value: string; label: string }[]
  // >([]);

  const form = useForm<CreateUserPayload>({
    initialValues: {
      name: "",
  template: "",
  address: "",
  investor: "",
  overview_image: "",
  rank: "",
    },
    validate: {
      // name: (value) => (value ? null : "Tên không được để trống"),
      // rank: (value) => (value ? null : "Cấp bậckhông được để trống"),
      // type: (value) => (value ? null : "Loại không được để trống"),
      // address: (value) => (value ? null : "Địa chỉ không được để trống"),
      // investor: (value) => (value ? null : "Chủ đầu tư không được để trống"),
      // image_url: (value) => (value ? null : "Hình ảnh không được để trống"),
     
      
    },
  });

  const formRef = useRef(form);

  /** Submit cập nhật user */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE. UPDATE_PROJECTS.replace("{project_id}", id);
      await api.put(url, values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      alert("Đã xảy ra lỗi khi cập nhật người dùng.");
    } finally {
      close();
    }
  };

  /** Lấy dữ liệu chi tiết user */
  const fetchUserDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      const url = API_ROUTE. UPDATE_PROJECTS.replace("{project_id}", id);
      const response = await api.get(url);
      const userData = response.data;

      formRef.current.setValues({
        name: userData.name || "",
        rank: userData.rank || "",
  template: userData.template|| "",
  address: userData.address || "",
  investor: userData.investor || "",
  overview_image: userData.overview_image || "",
 
       
    
      
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      alert("Không thể tải thông tin người dùng.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  /** Lấy danh sách chức vụ hệ thống */
  const fetchSystemOptions = useCallback(async () => {
    try {
      // const res = await api.get(API_ROUTE.GET_LIST_ROLES);
      // const rawData = Array.isArray(res.data) ? res.data : res.data.data;
      // const options = rawData.map((item: SystemOption) => ({
      //   value: item.id.toString(),
      //   label: item.name,
      // }));
      // setSystemOptions(options);
    } catch (error) {
      console.error("Lỗi khi load system options:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetail();
    fetchSystemOptions();
  }, [fetchUserDetail, fetchSystemOptions]);

  return (
   <Box
  component="form"
  miw={320}
  mx="auto"
  onSubmit={form.onSubmit(handleSubmit)}
>
  <LoadingOverlay
    visible={visible}
    zIndex={1000}
    overlayProps={{ radius: "sm", blur: 2 }}
  />

  <TextInput
    label="Tên dự án"
    placeholder="Nhập Tên dự án"
    withAsterisk
    mt="md"
    {...form.getInputProps("name")}
  />

  <TextInput
    label="Cấp bậc"
    placeholder="Nhập Cấp bậc"
    withAsterisk
    mt="md"
    {...form.getInputProps("rank")}
  />

  <TextInput
    label="Loại dự án"
    placeholder="Nhập loại dự án"
    withAsterisk
    mt="md"
    {...form.getInputProps("template")}
  />

  <TextInput
    label="Địa chỉ"
    placeholder="Nhập địa chỉ"
    mt="md"
    {...form.getInputProps("address")}
  />

  <TextInput
    label="Chủ đầu tư"
    placeholder="Nhập tên chủ đầu tư"
    mt="md"
    {...form.getInputProps("investor")}
  />

  <TextInput
    label="Đường dẫn hình ảnh"
    placeholder="Nhập URL hình ảnh"
    mt="md"
    {...form.getInputProps("overview_image")}
  />

  <Group justify="flex-end" mt="lg">
    <Button
      type="submit"
      color="#3598dc"
      loading={visible}
      leftSection={<IconCheck size={18} />}
    >
      Lưu
    </Button>

    <Button
      variant="outline"
      color="black"
      type="button"
      loading={visible}
      onClick={() => modals.closeAll()}
      leftSection={<IconX size={18} />}
    >
      Đóng
    </Button>
  </Group>
</Box>
  );
};

export default EditView;