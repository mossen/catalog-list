import axios, { AxiosPromise, AxiosRequestConfig, Method } from "axios";

const api = (
  url: string,
  method: Method,
  data = null,
  headers = { headers: { "Content-Type": "application/json" } }
): AxiosPromise => {
  // axios expects params for get parameters
  let dataKey = "data";
  if (method === "GET") {
    dataKey = "params";
  }

  const options: AxiosRequestConfig = {
    method,
    [dataKey]: data,
    url,
    ...headers,
  };

  return axios(options);
};

export default api;
