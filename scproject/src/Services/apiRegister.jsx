import { axiosLoginClient } from "./axiosClient";

const apiSignUp = {
  generateOtp: (data) => {
    const url = "register/generate-otp";
    return axiosLoginClient.post(url, data);
  },
  validateOtp: (data) => {
    const url = "register/validate-otp";
    return axiosLoginClient.post(url, data);
  },
};
export default apiSignUp;
