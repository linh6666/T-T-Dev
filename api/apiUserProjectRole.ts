import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

// ==========================
// 📌 Interface & Type
// ==========================
export interface GetListRolesParams {
  token: string;
  skip?: number;
  limit?: number;
}

export interface CreateUserPayload {
      system_id: string;
      project_id:string;
  user_id?: string;
  role_id?: string;
  
}


export const getListRoles = async ({ token, skip, limit }: GetListRolesParams) => {
  const response = await api.get(API_ROUTE. GET_LIST_USERPROJECTROLE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      skip,
      limit,
    },
  });

  return {
    data: response.data.data,
    total: response.data.count,
  };
};

// 🔹 Tạo mới Role
export const createUser = async (
  project_id: string,
  payload: CreateUserPayload
) => {
  const url = API_ROUTE. CREATE_USERPROJECTROLE.replace("{project_id}", project_id);
  const response = await api.post(url, payload);
  return response.data;
};

export const rolesApi = {
  getListRoles,
  createUser,
};

export default rolesApi;
export const deleteUserManagement = async (userId: string) => {
  try {
    const url = API_ROUTE.DELETE_USERPROJECTROLE.replace("{user_project_role_id}", userId);
    console.log("Đang gửi DELETE tới:", url); // kiểm tra trước khi gửi
    const res = await api.delete(url);
    return res.data;
  } catch (error) {
    console.error("Lỗi xoá người dùng:", error);
    throw error;
  }
};
