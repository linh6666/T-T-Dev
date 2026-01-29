import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

/* =======================
   Interfaces
======================= */

export interface OrderPaymentFile {
  file: File;
  name_vi?: string;
  description_vi?: string;
}

export interface CreateOrderPaymentPayload {
  order_id: string;
  total_amount_vn: number;
  payment_stage: string;
  sale_note?: string;
  files?: OrderPaymentFile[];
}

/* =======================
   API Function
======================= */

export const createOrderPayment = async (
  projectId: string,
  payload: CreateOrderPaymentPayload
) => {
  const formData = new FormData();

  // 🔴 Trường bắt buộc
  formData.append("order_id", payload.order_id);
  formData.append("total_amount_vn", String(payload.total_amount_vn));
  formData.append("payment_stage", payload.payment_stage);

  // 🟢 File upload (tùy chọn)
  payload.files?.forEach((item, index) => {
    const i = index + 1;

    formData.append(`file_${i}`, item.file);

    if (item.name_vi) {
      formData.append(`name_vi_${i}`, item.name_vi);
    }

    if (item.description_vi) {
      formData.append(`description_vi_${i}`, item.description_vi);
    }
  });

  const response = await api.post(
    API_ROUTE.CREATE_ODER_PAYMENT,
    formData,
    {
      params: {
        project_id: projectId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

