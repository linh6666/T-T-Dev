import { api } from "../libray/axios"; // ✅ file api em đã có sẵn
import { API_ROUTE } from "../const/apiRouter";

interface FilterItem {
  label: string;
  values: string[];
}

interface CreateNodeAttributeBody {
  project_id: string;

}

// 🧩 Hàm call API POST
export const createNodeAttribute = async (
  body: CreateNodeAttributeBody,
  params: { type_control: string; value: number; rs: number; id: number } // Thêm params
) => {
  try {
    const response = await api.post(API_ROUTE.CREATE_NODEATTRIBUTE, body, {
      params, // Sử dụng params đã truyền vào
    });

    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error calling createNodeAttribute:", error);
    throw error;
  }
};