"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  NumberInput,
  SimpleGrid,
  Title,
  FileInput,
  Divider,
  Textarea,
} from "@mantine/core";
import { createOrderPayment } from "../../../api/apicreateOderpayment";

interface CreatePaymentModalProps {
  opened: boolean;
  onClose: () => void;
  projectId: string | null;
  orderId: string;
}

interface PaymentFileItem {
  file: File | null;
  name_vi: string;
  description_vi: string;
}

export default function CreatePaymentModal({
  opened,
  onClose,
  projectId,
  orderId,
}: CreatePaymentModalProps) {
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [paymentStage, setPaymentStage] = useState("");
  const [saleNote, setSaleNote] = useState("");

  const [files, setFiles] = useState<PaymentFileItem[]>([
    { file: null, name_vi: "", description_vi: "" },
  ]);

  const [loading, setLoading] = useState(false);

  /* =========================
     FILE HANDLERS
  ========================= */

  const addFile = () => {
    setFiles((prev) => [
      ...prev,
      { file: null, name_vi: "", description_vi: "" },
    ]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFile = (
    index: number,
    data: Partial<PaymentFileItem>
  ) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], ...data };
      return newFiles;
    });
  };

  /* =========================
     VALIDATION
  ========================= */

  const hasInvalidFile = files.some(
    (f) => f.file && !f.name_vi.trim()
  );

  const canSubmit =
    !!projectId &&
    !!orderId &&
    totalAmount !== undefined &&
    !!paymentStage.trim() &&
    !hasInvalidFile;

  /* =========================
     SUBMIT
  ========================= */

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

      onClose();
    } catch (error) {
      console.error("Create order payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius="md"
      size={800}
      title={<Title order={1} size="h3">Tạo đơn thanh toán mới</Title>}
    >
      <Stack gap="md">
        <SimpleGrid cols={2} spacing="md">


          <NumberInput
            label="Số Tiền Thanh Toán (VNĐ)"
            placeholder="Nhập số tiền"
            thousandSeparator=","
            hideControls
            value={totalAmount}
            onChange={(value) =>
              setTotalAmount(typeof value === "number" ? value : undefined)
            }
            radius="md"
            required
          />

          <TextInput
            label="Giai Đoạn Thanh Toán"
            placeholder="VD: Thanh toán lần 1"
            value={paymentStage}
            onChange={(e) => setPaymentStage(e.currentTarget.value)}
            radius="md"
            required
          />

          <Textarea
            label="Ghi chú Sale"
            placeholder="Nhập ghi chú cho sale"
            autosize
            minRows={4}
            value={saleNote}
            onChange={(e) => setSaleNote(e.currentTarget.value)}
            radius="md"
          />
        </SimpleGrid>

        <Divider label="File đính kèm" labelPosition="center" />

        <Stack gap="sm">
          {files.map((item, index) => (
            <Stack key={index} gap="xs">
              <SimpleGrid cols={3} spacing="md">
                <FileInput
                  label={`File ${index + 1}`}
                  placeholder="Chọn file"
                  accept="image/*,.pdf"
                  value={item.file}
                  onChange={(file) => {
                    updateFile(index, {
                      file,
                      name_vi:
                        file && !item.name_vi
                          ? file.name
                          : item.name_vi,
                    });
                  }}
                  radius="md"
                />

                <TextInput
                  label="Tên file"
                  placeholder="Nhập tên file"
                  value={item.name_vi}
                  error={
                    item.file && !item.name_vi
                      ? "Bắt buộc nhập tên file"
                      : false
                  }
                  onChange={(e) =>
                    updateFile(index, {
                      name_vi: e.currentTarget.value,
                    })
                  }
                  radius="md"
                  required={!!item.file}
                />

                <TextInput
                  label="Ghi chú"
                  placeholder="Mô tả file"
                  value={item.description_vi}
                  onChange={(e) =>
                    updateFile(index, {
                      description_vi: e.currentTarget.value,
                    })
                  }
                  radius="md"
                />
              </SimpleGrid>

              {files.length > 1 && (
                <Group justify="flex-end">
                  <Button
                    color="red"
                    variant="light"
                    size="xs"
                    onClick={() => removeFile(index)}
                  >
                    Xóa file này
                  </Button>
                </Group>
              )}
            </Stack>
          ))}

          <Button variant="outline" onClick={addFile}>
            + Thêm file
          </Button>
        </Stack>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button
            color="blue"
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
          >
            Tạo đơn
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
