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
export const createON = async (body: CreateNodeAttributeBody) => {
  try {
   const response = await api.post(API_ROUTE.CREATE_NODEATTRIBUTE, body, {
  params: {
    type_control: "all",
    value: 1,
    rs: 0,
  },
});

    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("❌ Error calling createNodeAttribute:", error instanceof Error ? error.message : error);
    throw error;
  }
};
