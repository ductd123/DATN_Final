import axios from "axios";
import queryString from "query-string";

// const token = localStorage.getItem("token");
// const URL_BE = process.env.REACT_APP_URL_BE;
let token = localStorage.getItem("access_token");

const updateToken = () => {
  token = localStorage.getItem("access_token");
};

export const axiosLearningClient = axios.create({
  // baseURL: "http://wetalk.ibme.edu.vn:8060/",
  baseURL: "https://wetalk.ibme.edu.vn/learning-service/",
  headers: {
    "content-type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosLoginClient = axios.create({
  // baseURL: "http://wetalk.ibme.edu.vn:8080/api/",
  baseURL: "https://wetalk.ibme.edu.vn/user-service/api/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosUserClient = axios.create({
  baseURL: "https://wetalk.ibme.edu.vn/user-service/",
  // baseURL: "http://wetalk.ibme.edu.vn:8080/",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosUploadVideoClient = axios.create({
  baseURL: "https://wetalk.ibme.edu.vn/data-collection-service/",
  headers: {
    "content-type": 'multipart/form-data',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export  const axiosUploadVolunteerClient = axios.create({
  baseURL: "https://wetalk.ibme.edu.vn/data-collection-service/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
// axiosClient.interceptors.request.use(async (config)=>{
//   return config;
// })

axiosUserClient.interceptors.request.use(
  (config) => {
    updateToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
axiosLearningClient.interceptors.request.use(
  (config) => {
    updateToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
axiosUploadVolunteerClient.interceptors.request.use(
  (config) => {
    updateToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
axiosUploadVideoClient.interceptors.request.use(
  (config) => {
    updateToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

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
axiosUserClient.interceptors.response.use(
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
axiosUploadVolunteerClient.interceptors.response.use(
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