import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

export interface CreateOrderPayload {
  unit_code: string;
  project_id: string;
  email: string;
  contract_code: string;
  total_price_at_sale_vi: number;
  total_price_at_sale_en: number;
  id_cccd: string;
}

export const createOrder = async (
  payload: CreateOrderPayload,
  file: File
) => {
  const formData = new FormData();

  // Đưa JSON vào dưới dạng chuỗi
  formData.append("data", JSON.stringify(payload));

  // Đưa file vào form
  formData.append("file", file);

  const response = await api.post(API_ROUTE.CREATE_ORDER, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
