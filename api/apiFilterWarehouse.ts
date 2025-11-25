import { api } from "../libray/axios"; // ✅ file api em đã có sẵn
import { API_ROUTE } from "../const/apiRouter";

interface FilterItem {
  label: string;
  values: string[];
}

interface CreateNodeAttributeBody {
  project_id: string;
  filters: FilterItem[];
}

// 🧩 Hàm call API POST
export const createWarehouse = async (body: CreateNodeAttributeBody) => {
  try {
    const response = await api.post(API_ROUTE.CREATE_SALEINFORMATION, body);

    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error calling createNodeAttribute:", error);
    throw error;
  }
};
