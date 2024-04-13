import { requestHandler } from "./axios";

export const GetRequest = (url = "", config: any = {}) => {
  return requestHandler.get(url, config);
};
export const PostRequest = (url = "", data = {}, config: any = {}) => {
  return requestHandler.post(url, data, config);
};

export const PutRequest = (url = "", config: any = {}) => {
  return requestHandler.put(url, config);
};

export const DeleteRequest = (url = "", config: any = {}) => {
  return requestHandler.delete(url, config);
};
