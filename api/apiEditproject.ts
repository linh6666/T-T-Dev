import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter"; // ✅ import đúng object chứa hằng số

export interface CreateUserPayload {
  
  name: string;
  type: string;
  address: string;
  investor: string;
  image_url: string;
  rank: string;
    
}

export const createUser = async (payload: CreateUserPayload) => {
  const response = await api.post(API_ROUTE.CREATE_PROJECTS, payload); // ✅ dùng đúng key từ object
  return response.data;
};
