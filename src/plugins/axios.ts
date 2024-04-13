import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../config/baseUrl";
import { IBucketKeyEnums, bucket } from "../utils/helpers/storage";

export const getToken = () => {
  const token = bucket.get(IBucketKeyEnums.TOKEN);
  return token ? token : null;
};
const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const requestHandler: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

requestHandler.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthorizationHeader();

  return config;
});

export { requestHandler };
