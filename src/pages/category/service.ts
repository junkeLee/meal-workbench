import axios from "axios";

export const getList = (params: any = {}) => {
  console.log('params', params);
  return axios.get('/api/category/business/list', { params })
    .then(res => res.data)
    .catch(() => {});
};
