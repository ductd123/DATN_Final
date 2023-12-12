import axiosClient from "./axiosClient";

const apiSignUp = {
    generateOtp: (data) => {
        const url = "register/generateOtp";
        return axiosClient.post(url, data);
    },
    validateOtp: (data) => {
        const url = "register/validateOtp";
        return axiosClient.post(url, data);
    },
};
export default apiSignUp;
