"use client";

import { useState } from "react";
import {
  Button,
  Group,
  Stack,
  TextInput,
  NumberInput,
  SimpleGrid,
  Title,

  Divider,
  Textarea,
  Card,
 
  MantineProvider,
  createTheme,
  Input,
  Select,
} from "@mantine/core";
import { createOrderPayment } from "../../../api/apicreateOderpayment";

interface PaymentFileItem {
  file: File | null;
  name_vi: string;
  description_vi: string;
}

interface CreatePaymentFormProps {
  projectId: string | null;
  orderId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreatePaymentModal({
  projectId,
  orderId,
  onSuccess,
  onCancel,
}: CreatePaymentFormProps) {
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [paymentStage, setPaymentStage] = useState("");
  const [saleNote, setSaleNote] = useState("");
  const [files] = useState<PaymentFileItem[]>([
    { file: null, name_vi: "", description_vi: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // const addFile = () => {
  //   setFiles((prev) => [...prev, { file: null, name_vi: "", description_vi: "" }]);
  // };

  // const removeFile = (index: number) => {
  //   setFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  // const updateFile = (index: number, data: Partial<PaymentFileItem>) => {
  //   setFiles((prev) => {
  //     const newFiles = [...prev];
  //     newFiles[index] = { ...newFiles[index], ...data };
  //     return newFiles;
  //   });
  // };

  const hasInvalidFile = files.some((f) => f.file && !f.name_vi.trim());

  const canSubmit =
    !!projectId &&
    !!orderId &&
    totalAmount !== undefined &&
    !!paymentStage.trim() &&
    !hasInvalidFile;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      await createOrderPayment(projectId!, {
        order_id: orderId,
        total_amount_vn: totalAmount,
        payment_stage: paymentStage,
        sale_note: saleNote || undefined,
        files: files
          .filter((f) => f.file)
          .map((f) => ({
            file: f.file as File,
            name_vi: f.name_vi.trim(),
            description_vi: f.description_vi,
          })),
      });
      onSuccess();
    } catch (error) {
      console.error("Create order payment error:", error);
    } finally {
      setLoading(false);
    }
  };
  const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ['label', 'input', 'description', 'error'],
      },
    }),
  },
});

  return (
    <Card withBorder shadow="sm" radius="md" p="md" bg="white">
      <Stack gap="sm">
        <Title order={5}>Thông tin thanh toán mới</Title>
            <MantineProvider theme={theme}>
        <SimpleGrid cols={2} spacing="xs">
           <TextInput
            label="Tên khách hàng"
            placeholder="Nhập tên khách hàng"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
             <TextInput
            label="SĐT liên hệ"
            placeholder="Nhập số điện thoại"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
             <TextInput
            label="Số CCCD/CMND"
            placeholder="Nhập số CCCD/CMND"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
             <TextInput
            label="Email khách hàng"
            placeholder="Nhập email khách hàng"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
          {/* <NumberInput
            label="Số Tiền (VNĐ)"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            value={totalAmount}
            onChange={(value) =>
              setTotalAmount(typeof value === "number" ? value : undefined)
            }
            radius="md"
            required
            size="sm"
          />
          <TextInput
            label="Giai Đoạn"
            placeholder="VD: Đợt 1"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          /> */}
        </SimpleGrid>
             <Divider  labelPosition="center" />

</MantineProvider>
<TextInput
            label="Mã hóa đơn"
            placeholder="Nhập mã hóa đơn"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
<SimpleGrid cols={2} spacing="xs">

          <NumberInput
            label="Số Tiền khách thanh toán"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            value={totalAmount}
            onChange={(value) =>
              setTotalAmount(typeof value === "number" ? value : undefined)
            }
            radius="md"
            required
            size="sm"
          />
          <TextInput
            label="Giai Đoạn"
            placeholder="VD: Đợt 1"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />
            <Select
      label="Trạng thái"
      placeholder="Chọn trạng thái"
      autoSelectOnBlur
      searchable
      data={['Đã thanh toán', 'Chưa thanh toán', 'Đang xử lý']}
    />

       

     </SimpleGrid>
      <Textarea
          label="Ghi chú Sale"
          placeholder="Nhập ghi chú"
          autosize
          minRows={2}
          value={saleNote}
          onChange={(e) => setSaleNote(e.currentTarget.value)}
          radius="md"
          size="sm"
        />

        {/* <Stack gap="xs">
          {files.map((item, index) => (
            <Box key={index}>
              <SimpleGrid cols={2} spacing="xs">
                <FileInput
                  placeholder="Chọn file"
                  accept="image/*,.pdf"
                  value={item.file}
                  onChange={(file) => {
                    updateFile(index, {
                      file,
                      name_vi: file && !item.name_vi ? file.name : item.name_vi,
                    });
                  }}
                  radius="md"
                  size="xs"
                />
                <TextInput
                  placeholder="Tên file"
                  value={item.name_vi}
                  onChange={(e) => updateFile(index, { name_vi: e.currentTarget.value })}
                  radius="md"
                  size="xs"
                  required={!!item.file}
                />
                
              </SimpleGrid>
              {files.length > 1 && (
                <Text
                  size="xs"
                  c="red"
                  style={{ cursor: "pointer", textAlign: "right" }}
                  onClick={() => removeFile(index)}
                >
                  Xóa file
                </Text>
              )}
            </Box>
          ))}
          <Button variant="subtle" size="xs" onClick={addFile}>
            + Thêm file
          </Button>
        </Stack> */}

        <Group justify="flex-end" mt="md" gap="xs">
          <Button variant="default" size="sm" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            color="blue"
            size="sm"
            onClick={handleSubmit}
            loading={loading}
          >
            Xác nhận
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
