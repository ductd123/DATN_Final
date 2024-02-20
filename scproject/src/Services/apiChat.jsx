import { axiosChatClient } from "./axiosClient";

const apiChat = {
    getListChat: () => {
        const url = "conversations/list/me";
        return axiosChatClient.get(url);
    },
    getMessage: (id) => {
        const url = `messages/conversation/${id}`;
        return axiosChatClient.get(url);
    },
    getConversationIdByUserId: (id) => {
        const url = `conversations/contactId/${id}`;
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