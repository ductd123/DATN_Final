import { axiosChatClient } from "./axiosClient";

const apiChat = {
  getListChat: () => {
    // const url = "conversations/list/me";
    const url = "conversations/all-me";
    return axiosChatClient.get(url);
  },
  getMessage: (id) => {
    const url = `messages/${id}`;
    return axiosChatClient.get(url);
  },
  getConversationIdByUserId: (id) => {
    const url = `conversations/${id}`;
    return axiosChatClient.get(url);
  },
  postConversation: (data) => {
    const url = "conversations";
    return axiosChatClient.post(url, data);
  },
  createGroup: (data) => {
    const url = "group-member";
    return axiosChatClient.post(url, data);
  },
};
export default apiChat;
