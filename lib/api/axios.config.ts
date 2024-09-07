import axios from "axios";
import { getAccessToken } from "../utils";

const streamtylBaseUrl = "https://api.streamtyl.io/api/v1";
// const streamtylBaseUrl = 'http://localhost:5000/api/v1'

const headers = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "application/json; charset=utf-8",
};

const axiosConfig = axios.create({
  baseURL: streamtylBaseUrl,
  headers,
  timeout: 60000,
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const uploadHeaders = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "multipart/form-data",
};

const axiosUploadConfig = axios.create({
  baseURL: streamtylBaseUrl,
  headers: uploadHeaders,
  timeout: 60000,
  withCredentials: true,
});

axiosUploadConfig.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosConfig, axiosUploadConfig };
