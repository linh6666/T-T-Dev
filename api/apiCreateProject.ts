// /api/userApi.ts
import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter"; // ✅ import đúng object chứa hằng số

export interface CreateUserPayload {
  id:string;
 name_vi:string;
timeout_minutes:string;
  


 
}

export const createUser = async (payload: CreateUserPayload) => {
  const response = await api.post(API_ROUTE.CREATE_PROJECTS, payload); // ✅ dùng đúng key từ object
  return response.data;
};