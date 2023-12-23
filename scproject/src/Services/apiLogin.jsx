import { axiosLoginClient } from "./axiosClient";

const apiLogin = {
    postLogin: (data) => {
        const url = "auth/login";
        return axiosLoginClient.post(url, data);
    },
    getCheckLogin: () => {
        const url = "auth";
        return axiosLoginClient.get(url);
    },
    test: () => {
        const url = "test";
        return axiosLoginClient.get(url);
    },
};
export default apiLogin;
