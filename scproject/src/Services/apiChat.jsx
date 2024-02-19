import {axiosChatClient} from "./axiosClient";

const apiChat = {
    getListChat: () => {
        const url = "conversations/list/me";
        return axiosLoginClient.get(url);
    },
    validateOtp: (data) => {
        const url = "register/validateOtp";
        return axiosLoginClient.post(url, data);
    },
};
export default apiSignUp;