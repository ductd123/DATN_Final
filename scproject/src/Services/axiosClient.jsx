import axios from "axios";
import queryString from "query-string";

// const token = localStorage.getItem("token");
// const URL_BE = process.env.REACT_APP_URL_BE;

export const axiosLearningClient = axios.create({
  baseURL: "http://202.191.56.11:8060/",
  headers: {
    "content-type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosLoginClient = axios.create({
  baseURL: "http://202.191.56.11:8080/api/",
  headers: {
    "content-type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosUploadVideoClient = axios.create({
  baseURL: "http://202.191.56.11:8090/api/",
  headers: {
    "content-type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
// axiosClient.interceptors.request.use(async (config)=>{
//   return config;
// })
axiosLearningClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);
axiosLoginClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);
axiosUploadVideoClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);
