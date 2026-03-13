import { api } from "../libray/axios";
import { API_ROUTE } from "../const/apiRouter";

interface GetListMappingParams {
  token?: string;
  script_id: string;
}

export const getListMapping = async ({
  token,
  script_id,
}: GetListMappingParams) => {

  const url = API_ROUTE.GET_LIST_DETAIL_MAPPING.replace(
    "{script_id}",
    script_id
  );

  const response = await api.get(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return response.data;
};