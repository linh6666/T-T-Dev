import { api } from '../libray/axios';
import { API_ROUTE } from '../const/apiRouter';

interface GetListhomeParams {
  unit_code: string;
}

export const Getlisthome = async ({  unit_code }: GetListhomeParams) => {
  const url = API_ROUTE.GET_LIST_DETAIL_HOME.replace("{unit_code}", unit_code);
  const response = await api.get(url, {
   
  });
  return response.data; // trả về dữ liệu để component dùng
};
