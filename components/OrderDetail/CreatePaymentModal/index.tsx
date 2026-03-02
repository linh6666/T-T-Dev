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
  FileButton,
  Tooltip,
  Text,
  Modal,
  rem,
  Box,
} from "@mantine/core";
import {
  IconHelpCircle,
  IconUpload,
  IconTrash,
  IconFileText,
  IconFolder,
} from "@tabler/icons-react";
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

  // ✅ TÁCH RIÊNG
  const [invoiceCode, setInvoiceCode] = useState("");
  const [paymentStage, setPaymentStage] = useState("");

  const [saleNote, setSaleNote] = useState("");
  const [files, setFiles] = useState<PaymentFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileModalOpened, setFileModalOpened] = useState(false);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFile = (index: number, data: Partial<PaymentFileItem>) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], ...data };
      return newFiles;
    });
  };

  const hasInvalidFile = files.some((f) => f.file && !f.name_vi.trim());

  const canSubmit =
    !!projectId &&
    !!orderId &&
    totalAmount !== undefined &&
    !!invoiceCode.trim() &&
    !!paymentStage.trim() &&
    !hasInvalidFile;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setLoading(true);

      await createOrderPayment(projectId!, {
        order_id: orderId,
      // nếu backend có field này
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
          variant: "filled",
        },
      }),
      InputWrapper: Input.Wrapper.extend({
        defaultProps: {
          inputWrapperOrder: ["label", "input", "description", "error"],
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
              radius="md"
              required
              size="sm"
            />
            <TextInput
              label="SĐT liên hệ"
              placeholder="Nhập số điện thoại"
              radius="md"
              required
              size="sm"
            />
            <TextInput
              label="Số CCCD/CMND"
              placeholder="Nhập số CCCD/CMND"
              radius="md"
              required
              size="sm"
            />
            <TextInput
              label="Email khách hàng"
              placeholder="Nhập email khách hàng"
              radius="md"
              required
              size="sm"
            />
          </SimpleGrid>

          <Divider labelPosition="center" />
        </MantineProvider>

        {/* ✅ Mã hóa đơn riêng */}
        <TextInput
          label="Mã hóa đơn"
          placeholder="Nhập mã hóa đơn"
          value={invoiceCode}
          onChange={(e) => setInvoiceCode(e.currentTarget.value)}
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

          {/* ✅ Giai đoạn riêng */}
          <TextInput
            label="Giai Đoạn"
            placeholder="VD: Đợt 1"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
            size="sm"
          />

          <Stack gap={5} align="flex-start">
            <Group gap={4} align="center">
              <Text size="sm" fw={500}>
                Tải tệp lên
              </Text>
              <Tooltip label="Nhấn để quản lý danh sách file đính kèm">
                <IconHelpCircle size={14} style={{ cursor: "help" }} />
              </Tooltip>
            </Group>

            <Button
              variant="default"
              radius="xl"
              size="sm"
              leftSection={<IconUpload size={16} color="#adb5bd" />}
              onClick={() => setFileModalOpened(true)}
              fw={500}
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                border: "1px solid #dee2e6",
                color: "#495057",
                backgroundColor: "white",
                height: "36px",
              }}
            >
              {files.length > 0
                ? `${files.length} tệp đã chọn`
                : "Ấn để tải file lên"}
            </Button>
          </Stack>

          <Select
            label="Trạng thái"
            placeholder="Chọn trạng thái"
            autoSelectOnBlur
            searchable
            data={["Đã thanh toán", "Chưa thanh toán", "Đang xử lý"]}
            radius="md"
            size="sm"
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

        <Group justify="flex-end" mt="xl" gap="md">
          <Button
            variant="default"
            size="md"
            radius="xl"
            px={40}
            onClick={onCancel}
          >
            Hủy
          </Button>
          <Button
            color="blue"
            size="md"
            radius="xl"
            px={40}
            bg="#3b5d7d"
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
          >
            Xác nhận
          </Button>
        </Group>
      </Stack>

      {/* ================= FILE MODAL ================= */}
      <Modal
        opened={fileModalOpened}
        onClose={() => setFileModalOpened(false)}
        title={
          <Text fw={700} size="lg">
            File đính kèm
          </Text>
        }
        centered
        size="lg"
        radius="lg"
        padding="xl"
      >
        <Stack gap="xl">
          <FileButton
            onChange={(file) => {
              if (file) {
                setFiles((prev) => [
                  ...prev,
                  { file, name_vi: file.name, description_vi: "" },
                ]);
              }
            }}
            accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            {(props) => (
              <Box
                {...props}
                style={{
                  border: `${rem(1)} dashed #adb5bd`,
                  borderRadius: rem(8),
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                py={60}
              >
                <Stack align="center" gap="lg">
                  <IconFolder
                    size={100}
                    color="#e9ecef"
                    fill="#e9ecef"
                    stroke={1}
                  />

                  <Stack gap={8} align="center">
                    <Text size="md" fw={700} c="#212529">
                      <Text
                        span
                        style={{ textDecoration: "underline" }}
                        inherit
                      >
                        Ấn để tải file lên
                      </Text>{" "}
                      hoặc kéo thả vào đây
                    </Text>
                    <Text size="xs" c="#868e96">
                      Lưu ý chỉ hỗ trợ các định dạng file .jpg, .png, .docx,
                      .pdf
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            )}
          </FileButton>

          {files.length > 0 && (
            <>
              <Divider my="sm" />
              <SimpleGrid cols={2} spacing="md">
                {files.map((item, index) => {
                  const isPdf =
                    item.file?.type === "application/pdf" ||
                    item.name_vi.toLowerCase().endsWith(".pdf");

                  return (
                    <Card
                      key={index}
                      withBorder
                      p="xs"
                      radius="md"
                      bg="#f8f9fa"
                      style={{ position: "relative" }}
                    >
                      <Box
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          cursor: "pointer",
                          zIndex: 10,
                        }}
                        onClick={() => removeFile(index)}
                      >
                        <IconTrash size={14} color="#adb5bd" />
                      </Box>

                      <Group align="flex-start" wrap="nowrap" gap="xs">
                        <Box
                          p={5}
                          style={{
                            border: "1px solid #dee2e6",
                            borderRadius: 8,
                            backgroundColor: "white",
                            minWidth: 50,
                            height: 65,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconFileText
                            size={30}
                            color={isPdf ? "#40c057" : "#fab005"}
                          />
                          <Text size="8px" fw={700} c="dimmed">
                            {isPdf ? "PDF" : "PNG"}
                          </Text>
                        </Box>

                        <Stack gap={4} style={{ flex: 1 }}>
                          <TextInput
                            value={item.name_vi}
                            onChange={(e) =>
                              updateFile(index, {
                                name_vi: e.currentTarget.value,
                              })
                            }
                            variant="default"
                            size="xs"
                            radius="xs"
                            styles={{ input: { height: 30 } }}
                          />
                          <TextInput
                            placeholder="Nhập mô tả file"
                            value={item.description_vi}
                            onChange={(e) =>
                              updateFile(index, {
                                description_vi: e.currentTarget.value,
                              })
                            }
                            variant="default"
                            size="xs"
                            radius="xs"
                            styles={{ input: { height: 30 } }}
                          />
                        </Stack>
                      </Group>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </>
          )}

          <Group justify="flex-end" mt="xl" gap="md">
            <Button
              variant="default"
              size="md"
              radius="xl"
              px={20}
              onClick={() => setFileModalOpened(false)}
            >
              Hủy
            </Button>
            <Button
              color="blue"
              size="md"
              radius="xl"
              px={20}
              bg="#3b5d7d"
              onClick={() => setFileModalOpened(false)}
            >
              Xác nhận
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}