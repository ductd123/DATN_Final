import { apiUploadFile } from "./apiLearning";
import { axiosLoginClient, axiosUserClient } from "./axiosClient";

const apiUser = {
  getUserInfo: () => {
    // const url = "users/getUserInfor";
    const url = "users/me";
    return axiosUserClient.get(url);
  },
  searchUser: (data) => {
    // const url = "users/api/search";
    const url = "users/search";
    return axiosUserClient.post(url, data);
  },
  updateUser: (data) => {
    const url = "users";
    return axiosUserClient.put(url, data);
  },

  changePassword: (data) => {
    const url = "users/change-password";
    return axiosUserClient.post(url, data);
  },

  getUserById: (id) => {
    const url = `users/${id}`;
    return axiosUserClient.get(url);
  },
  listRequestAddFr: () => {
    // const url = `friend-ship/pending`;
    const url = `friend-ship/request-list`;

    return axiosUserClient.get(url);
  },

  listSendingFr: () => {
    const url = `friend-ship/sending-list`;

    return axiosUserClient.get(url);
  },

  requestAddFr: (id) => {
    const url = `friend-ship/add-friend/${id}`;
    return axiosUserClient.post(url);
  },
  acceptRequestAddFr: (id) => {
    const url = `friend-ship/accept-friend/${id}`;
    return axiosUserClient.post(url);
  },
  cancelRequestAddFr: (id) => {
    const url = `friend-ship/cancel-friend/${id}`;
    return axiosUserClient.delete(url);
  },
  getListFriends: () => {
    // const url = `friend-ship/friend`;
    const url = `friend-ship/friend-list`;
    return axiosUserClient.get(url);
  },
  uploadAvt: async (data) => {
    const url = `users/uploadAvatar`;
    let response1 = {
      avatarLocation: await apiUploadFile.uploadFile(data),
    };
    return axiosUserClient.post(url, response1);
  },
};
export default apiUser;
