import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

export const getListOrder = async (
  projectId: string,
  options?: {
    token?: string;
    offset?: number;
    limit?: number;
  }
) => {
  const url = API_ROUTE.GET_LOCK_REQUEST.replace(
    "{project_id}",
    projectId
  );

  const response = await api.get(url, {
    headers: {
      Authorization: options?.token
        ? `Bearer ${options.token}`
        : undefined,
    },
    params: {
      offset: options?.offset ?? 0,
      limit: options?.limit ?? 100,
    },
  });

  return {
    items: response.data.items,
    total: response.data.total,
  };
};