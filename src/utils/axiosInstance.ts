import axiosBase, {AxiosInstance} from 'axios';
import Cookies from 'universal-cookie';
import {Headers} from 'request';

const cookies = new Cookies();
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + cookies.get('_token'),
  // 'Accept-Encoding': 'gzip, deflate, br',
};

const instance: AxiosInstance = axiosBase.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  headers,
});

export const axiosAdmin: AxiosInstance = axiosBase.create({
  baseURL: process.env.REACT_APP_ADMIN_API_URL,
  headers,
});

export const axios = instance;
