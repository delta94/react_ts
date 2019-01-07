import axiosBase, {AxiosInstance} from 'axios';
import Cookies from 'universal-cookie';
import {Headers} from 'request';

const PRODUCTION_URL = 'https://somethingapi.club/';
const DOMAIN         = process.env.NODE_ENV == 'production' ? PRODUCTION_URL : process.env.REACT_APP_DOMAIN;
const ADMIN_URL      = DOMAIN + 'api/';
const CUSTOMER_URL   = DOMAIN + 'customer-api/';

const cookies = new Cookies();
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + cookies.get('_token'),
  // 'Accept-Encoding': 'gzip, deflate, br',
};

const instance: AxiosInstance = axiosBase.create({
  baseURL: CUSTOMER_URL,
  // withCredentials: true,
  headers,
});

export const axiosAdmin: AxiosInstance = axiosBase.create({
  baseURL: ADMIN_URL,
  headers,
});

export const axios = instance;
