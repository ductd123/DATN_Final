import {axiosLoginClient} from "./axiosClient";

const apiSignUp = {
    generateOtp: (data) => {
        const url = "register/generateOtp";
        return axiosLoginClient.post(url, data);
    },
    validateOtp: (data) => {
        const url = "register/validateOtp";
        return axiosLoginClient.post(url, data);
    },
};
export default apiSignUp;
