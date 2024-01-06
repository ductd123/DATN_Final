import { axiosLoginClient } from "./axiosClient";

const apiLogin = {
    postLogin: (data) => {
        const url = "api/auth/login";
        return axiosLoginClient.post(url, data);
    },
    getCheckLogin: () => {
        const url = "api/auth";
        return axiosLoginClient.get(url);
    },
    test: () => {
        const url = "api/test";
        return axiosLoginClient.get(url);
    },
    getUserInfo : ()=>{
        const url = "users/getUserInfor";
        return axiosLoginClient.get(url);
    }
};
export default apiLogin;
