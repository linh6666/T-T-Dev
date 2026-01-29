
import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";


export const releaseControl = async (projectId: string) => {

  const url = API_ROUTE.DELETE_CONTROL.replace("{project_id}", projectId);

  const response = await api.post(url);

  return response.data;
};
