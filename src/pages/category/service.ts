import axios from 'axios';
import { ICategory } from 'interfaces/category.interface';

const mockList: ICategory[] = [
  { id: 1, image: null, name: '肉类', isRoot: 1, parentId: null },
  { id: 2, image: null, name: '各地菜系', isRoot: 1, parentId: null },
  { id: 3, image: null, name: '牛肉类', isRoot: 0, parentId: 1 },
  { id: 4, image: null, name: '鸡肉类', isRoot: 0, parentId: 1 },
  { id: 5, image: null, name: '鱼肉类', isRoot: 0, parentId: 1 },
  { id: 6, image: null, name: '鸭肉类', isRoot: 0, parentId: 1 },
  { id: 7, image: null, name: '北京菜', isRoot: 0, parentId: 2 },
  { id: 8, image: null, name: '鲁菜', isRoot: 0, parentId: 2 },
  { id: 9, image: null, name: '川菜', isRoot: 0, parentId: 2 }
];

export const getList = (params: any = {}) => {
  console.log('params', params);
  return Promise.resolve({ data: mockList });
  // return axios.get('/api/category/business/list', { params })
  //   .then(res => res.data)
  //   .catch(() => {});
};


export const getDetail = (id: number) => {
  return axios.get('/api/category/business/detail', { params: { id }})
    .then(res => res.data)
    .catch(() => {});
};