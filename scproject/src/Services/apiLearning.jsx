import {
  axiosCheckAIClient,
  axiosLearningClient,
  axiosUploadVideoClient,
  axiosUploadVolunteerClient,
} from "./axiosClient";

export const apiLearning = {
  getByContentVocabulary: (data) => {
    const url = "vocabularies/get-by-content";
    return axiosLearningClient.post(url, data);
  },
  getAllVocalizations: () => {
    const url = "vocabularies/all";
    return axiosLearningClient.get(url);
  },
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
    const url = `topics/all`;
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
  searchTopic: (data) => {
    const url = `topics/search`;
    return axiosLearningClient.post(url, data);
  },
  deleteTopic: (id) => {
    const url = `topics/${id}`;
    return axiosLearningClient.delete(url);
  },
  updateTopic: (data) => {
    const url = `topics`;
    return axiosLearningClient.put(url, data);
  },

  addQuestion: (data) => {
    const url = `questions`;
    return axiosLearningClient.post(url, data);
  },
  searchVocab: (data) => {
    const url = `vocabularies/search`;
    return axiosLearningClient.post(url, data);
  },
  getTableSearchData: (data) => {
    const url = `data-collection/search-for-admin`;
    return axiosLearningClient.post(url, data);
  },
  getTableDataVolunteer: (data) => {
    const url = `data-collection/search-for-me`;
    return axiosLearningClient.post(url, data);
  },
};

export const apiUploadFile = {
  uploadFile: (data) => {
    const url = "api/upload";
    return axiosUploadVideoClient.post(url, data);
  },
  rejectData: (data) => {
    const url = "data-collection/reject";
    return axiosUploadVolunteerClient.post(url, data);
  },
  sendData: (data) => {
    const url = "data-collection";
    return axiosUploadVolunteerClient.post(url, data);
  },
  getPendingData: () => {
    const url = "data-collection/pending-list-admin";
    return axiosUploadVolunteerClient.get(url);
  },
  getVolunteerTableData: (data) => {
    const url = "data-collection/get-approved";
    return axiosUploadVolunteerClient.post(url, data);
  },
  getAdminTableData: (data) => {
    const url = "data-collection/approved-list-me";
    return axiosUploadVolunteerClient.get(url, data);
  },
  approvedData: (id) => {
    const url = `data-collection/approve/${id}`;
    return axiosUploadVolunteerClient.post(url);
  },
  checkAI: (data) => {
    const url = "ai/detection";
    return axiosCheckAIClient.post(url, data);
  },
};

export const apiQuestions = {
  getListQuestions: (topicId) => {
    const url = `questions/${topicId}`;
    return axiosLearningClient.get(url);
  },
  getLimitQuestions: (data) => {
    const url = `questions/limits-topic`;
    return axiosLearningClient.post(url, data);
  },
};
