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
  file: File;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const { file, ...data } = payload;

  const formData = new FormData();

  // append từng field text/number
  formData.append("unit_code", data.unit_code);
  formData.append("project_id", data.project_id);
  formData.append("email", data.email);
  formData.append("contract_code", data.contract_code);
  formData.append("total_price_at_sale_vi", String(data.total_price_at_sale_vi));
  formData.append("total_price_at_sale_en", String(data.total_price_at_sale_en));
  formData.append("id_cccd", data.id_cccd);

  // file upload
  formData.append("file", file);

  // KHÔNG cần set Content-Type, Axios sẽ tự thêm đúng boundary
  const response = await api.post(API_ROUTE.CREATE_ORDER, formData);

  return response.data;
};
