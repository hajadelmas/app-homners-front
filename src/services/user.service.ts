import {
  default as axios,
  AxiosRequestConfig,
} from 'axios';

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const requestConfig: AxiosRequestConfig = {headers: authHeader()}

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", requestConfig);
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", requestConfig);
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", requestConfig);
};