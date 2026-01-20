import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

/* =======================
   PAYLOAD
======================= */
export interface CreateImgPayload {
 
  file: File; // 🔥 THAY url -> file
}

/* =======================
   API
======================= */
export const createImg = async (
  projectId: string,
  unitCode: string,
  payload: CreateImgPayload
) => {
  // 👉 replace đúng path param
  const url = API_ROUTE.CREATE_IMG_DETAIL_HOME
    .replace("{project_id}", projectId)
    .replace("{unit_code}", unitCode);

  // 👉 FormData để upload file
  const formData = new FormData();
  
  formData.append("file_1", payload.file); // ⚠️ KEY BẮT BUỘC

  const response = await api.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
