import { axiosLoginClient, axiosUserClient } from "./axiosClient";

const apiUser = {
    getUserInfo: () => {
        const url = "users/getUserInfor";
        return axiosUserClient.get(url);
    },
    searchUser: (data) => {
        const url = "users/api/search";
        return axiosUserClient.post(url, data);
    },
    updateUser: (data) => {
        const url = "users";
        return axiosUserClient.put(url, data);
    },
    getUserById: (id) => {
        const url = `users/${id}`;
        return axiosUserClient.get(url);
    },
    listRequestAddFr: () => {
        const url = `friend-ship/pending`;
        return axiosUserClient.get(url);
    },
    requestAddFr: (id) => {
        const url = `friend-ship/add-friend/${id}`;
        return axiosUserClient.get(url);
    }, 
    acceptRequestAddFr: (id) => {
        const url = `friend-ship/accept-friend/${id}`;
        return axiosUserClient.get(url);
    }, 
    cancelRequestAddFr: (id) => {
        const url = `friend-ship/cencel-friend/${id}`;
        return axiosUserClient.get(url);
    },
    getListFriends: () => {
        const url = `friend-ship/friend`;
        return axiosUserClient.get(url);
    },
};
export default apiUser;
