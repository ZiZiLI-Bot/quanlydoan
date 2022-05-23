import axios from 'axios';
import qs from 'qs';
import AuthStorage from '../feature/AuthStorage';

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

axiosClient.interceptors.request.use((config) => {
  if (AuthStorage.getKey('token')) {
    config.headers = {
      Authorization: `Bearer ${AuthStorage.getKey('token')}`,
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.error(error.response);
    return error.response;
  },
);
export default axiosClient;
