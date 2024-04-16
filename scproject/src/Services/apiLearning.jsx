import {
  axiosCheckAIClient,
  axiosLearningClient,
  axiosUploadVideoClient,
  axiosUploadVolunteerClient,
} from "./axiosClient";

export const apiLearning = {
  //media
  addListImageVocabulary: (data) => {
    const url = "vocabulary-images/add-list";
    return axiosLearningClient.post(url, data);
  },
  addListVideoVocabulary: (data) => {
    const url = "vocabulary-videos/add-list";
    return axiosLearningClient.post(url, data);
  },
  // update
  updateVideoVocabulary: (data) => {
    const url = "vocabulary-videos";
    return axiosLearningClient.put(url, data);
  },
  updateImageVocabulary: (data) => {
    const url = "vocabulary-images";
    return axiosLearningClient.put(url, data);
  },
  // delete
  deleteVideoVocabulary: (id) => {
    const url = `vocabulary-videos/${id}`;
    return axiosLearningClient.delete(url);
  },

  deleteImageVocabulary: (id) => {
    const url = `vocabulary-images/${id}`;
    return axiosLearningClient.delete(url);
  },
  // Sét primary
  setPrimaryVideoVocabulary: (data) => {
    const url = "vocabulary-videos/set-primary";
    return axiosLearningClient.put(url, data);
  },
  setPrimaryImageVocabulary: (data) => {
    const url = "vocabulary-images/set-primary";
    return axiosLearningClient.put(url, data);
  },

  getByContentVocabulary: (data) => {
    const url = "vocabularies/get-by-content";
    return axiosLearningClient.post(url, data);
  },
  getAllVocalizations: () => {
    const url = `vocabularies/all`;
    return axiosLearningClient.get(url);
  },
  searchAllVocalizations: (data) => {
    let url;
    if (data.topicId) {
      url = `vocabularies/all?topicId=${data.topicId}`;
    }
    if (data.content) {
      url = `vocabularies/all?content=${data.content}`;
    }
    if (data.topicId && data.content) {
      url = `vocabularies/all?topicId=${data.topicId}&content=${data.content}`;
    }

    return axiosLearningClient.get(url);
  },

  // CHi tiết từ
  getDetailVocabulary: (id) => {
    const url = `vocabularies/get-by-id/${id}`;
    return axiosLearningClient.get(url);
  },

  // Thêm từ vào chủ đề
  addNewTopic: (data) => {
    const url = "vocabularies/add-vocab-list-to-new-topic";
    return axiosLearningClient.post(url, data);
  },
  themTuDien: (data) => {
    const url = "vocabularies";
    return axiosLearningClient.post(url, data);
  },
  addListVocabulary: (data) => {
    const url = "vocabularies/add-list";
    return axiosLearningClient.post(url, data);
  },
  updateVocabulary: (data) => {
    const url = "vocabularies";
    return axiosLearningClient.put(url, data);
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
  approvedData: (body) => {
    const url = `data-collection/approve`;
    return axiosUploadVolunteerClient.post(url, body);
  },
  checkAI: (data) => {
    const url = "ai/detection";
    return axiosCheckAIClient.post(url, data);
  },

  // Upload nhiều ảnh/ video
  upLoadVocabulary: (data) => {
    const url = "upload-vocabularies/upload-list";
    return axiosUploadVideoClient.post(url, data);
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
