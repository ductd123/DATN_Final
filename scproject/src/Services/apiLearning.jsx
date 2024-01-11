import { axiosLearningClient, axiosUploadVideoClient } from "./axiosClient";

export const apiLearning = {
    themTuDien: (data) => {
        const url = "vocabularies";
        return axiosLearningClient.post(url, data);
    },
    getTuDien: (id) => {
        const url = `vocabularies/${id}`;
        return axiosLearningClient.get(url, id);
    },
    deleteTuDien: (id) => {
        const url = `vocabularies/${id}`;
        return axiosLearningClient.delete(url, id);
    },
    getTopic: () => {
        const url = `topics`;
        return axiosLearningClient.get(url);
    },
    addTopic: (data) => {
        const url = `topics`;
        return axiosLearningClient.post(url, data);
    },
    createTopic: (data) => {
        const url = `topics`;
        return axiosLearningClient.post(url, data);
    },
    addQuestion: (data) => {
        const url = `questions`;
        return axiosLearningClient.post(url, data);
    },
};

export const apiUploadFile = {
    uploadFile: (data) => {
        const url = "api/upload";
        return axiosUploadVideoClient.post(url, data);
    },
    rejectData: (data) => {
        const url = "collect-data/reject";
        return axiosUploadVideoClient.post(url, data);
    },
    getPendingData: () => {
        const url = "collect-data/get-pending";
        return axiosUploadVideoClient.get(url);
    },
    getApprovedData: () => {
        const url = "collect-data/get-approved";
        return axiosUploadVideoClient.get(url);
    },
    approvedData: (id) => {
        const url = `collect-data/approved/${id}`;
        return axiosUploadVideoClient.get(url);
    },
};