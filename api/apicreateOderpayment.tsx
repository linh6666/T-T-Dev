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
  invoice_code?: string;
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

  // Trường bắt buộc
  formData.append("order_id", payload.order_id);
  formData.append("total_amount_vn", String(payload.total_amount_vn));
  formData.append("payment_stage", payload.payment_stage);

  if (payload.sale_note) {
    formData.append("sale_note", payload.sale_note);
  }

  if (payload.invoice_code) {
    formData.append("invoice_code", payload.invoice_code);
  }

  // File upload
  payload.files?.forEach((item, index) => {
    const i = index + 1;

    formData.append(`file_${i}`, item.file);

    if (item.name_vi) {
      formData.append(`file_${i}_name_vi`, item.name_vi);
    }

    if (item.description_vi) {
      formData.append(`file_${i}_description_vi`, item.description_vi);
    }
  });

  // 🔥 REPLACE {project_id}
  const url = API_ROUTE.CREATE_ODER_PAYMENT.replace(
    "{project_id}",
    projectId
  );

  const response = await api.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
