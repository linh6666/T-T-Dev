import { api } from '../libray/axios';
import { API_ROUTE } from '../const/apiRouter';

export const getListFavorites = async () => {
  const response = await api.get(API_ROUTE.GET_LIST_FAVORITES, {
    params: {
      lang: 'vi',
    },
  });

  return {
    data: response.data.data,
    total: response.data.count,
  };
};
