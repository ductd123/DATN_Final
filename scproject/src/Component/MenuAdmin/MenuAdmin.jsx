import {
  CloudUploadOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Menu, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import QuestionModal from "../Modal/QuestionModal";
import StatisticalModal from "../Modal/StatisticalModal";
import TopicModal from "../Modal/TopicModal";
import VocabularyModal from "../Modal/VocabularyModal";
import "./MenuAdmin.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const CustomMenu = styled(Menu)`
  .ant-menu-submenu.ant-menu-submenu-inline {
    padding-left: 0px;
  }
`;

const MenuAdmin = ({ setVideoTNV, getHistory }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const [showCreateQuestions, setshowCreateQuestions] = useState(false);
  const [showAddTopic, setshowAddTopic] = useState(false);
  const [showAddWord, setShowAddWord] = useState(false);
  const [valueText, setValueText] = useState(["", "", "", ""]);
  const [file, setFile] = useState("");
  const [contentTopic, setContentTopic] = useState("");
  const [contentWord, setContentWord] = useState("");
  const [contentQuestion, setContentQuestion] = useState();
  const [topicChose, setTopicChose] = useState();
  const [topicInit, setTopicInit] = useState([]);
  const [valueChecked, setValueChecked] = useState(0);
  const [isImage, setIsImage] = useState(true);
  const [fileType, setFileType] = useState(""); // State để lưu trữ loại file
  const [fileUrl, setFileUrl] = useState(""); // State để lưu trữ URL của file
  const [isShowModalTopic, setIsShowModalTopic] = useState(false);
  const [listTopic, setListTopic] = useState([]);
  const [updateTopic, setUpdateTopic] = useState(false);
  const [urlImageUpdateTopic, setUrlImageUpdateTopic] = useState("");
  const [topicIdUpdate, setTopicIdUpdate] = useState();
  const [urlImage, setUrlImage] = useState("");
  const [imageLocations, setImageLocations] = useState("");
  const [videoLocations, setVideoLocations] = useState("");
  const [openChooseVideo, setOpenChooseVideo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationUrl, setLocationUrl] = useState("");
  const [showStatistical, setShowStatistical] = useState(false);

  const items = [
    getItem(
      "Chủ đề",
      "topic",
      <PlusCircleOutlined style={{ fontSize: "1.25rem" }} />
    ),
    getItem(
      "Thêm từ điển ký hiệu",
      "addWord",
      <CloudUploadOutlined style={{ fontSize: "1.25rem" }} />
    ),
    getItem(
      "Câu hỏi kiểm tra",
      "addQuestion",
      <CloudUploadOutlined style={{ fontSize: "1.25rem" }} />
    ),
    getItem(
      "Thống kê",
      "statistical",
      <PieChartOutlined style={{ fontSize: "1.25rem" }} />
    ),
  ];

  useEffect(() => {
    getTopic();
    getHistory();
  }, []);

  // Upload file
  const uploadMutation = useMutation({
    mutationFn: async (formData) => apiUploadFile.uploadFile(formData),
    onSuccess: (res) => {
      setImageLocations(res);
    },
  });

  const uploadMutationVideo = useMutation({
    mutationFn: async (formData) => apiUploadFile.uploadFile(formData),
    onSuccess: (res) => {
      setVideoLocations(res);
    },
  });

  const handleOkWord = async () => {
    setLoading(true);
    setTopicInit([]);
    const data = {
      content: contentWord,
      imageLocation: imageLocations,
      videoLocation: videoLocations,
      topicId: topicChose,
    };
    const res = await apiLearning.themTuDien(data);
    if (res.code === 200) {
      setLoading(false);
      onCloseAdd();
      getTopic();
      setShowAddWord(false);
      message.success(`Thêm từ điển lên thành công.`);
    } else {
      setLoading(false);
      setShowAddWord(false);
      message.error(`Thêm từ điển thất bại. Vui lòng thử lại!!!`);
    }
  };

  const getTopic = async () => {
    try {
      let response = await apiLearning.getTopic();
      const items = [];
      response.data.forEach((element, index) => {
        items.push({
          id: element.topicId,
          value: element.topicId,
          label: element.content,
        });
      });
      setTopicInit(items);
      setListTopic(response.data);
    } catch (error) {}
  };

  const onChange = (e) => {
    setValueChecked(e.target.value);
  };

  const onCloseAdd = () => {
    setshowAddTopic(false);
    setShowAddWord(false);
    setshowCreateQuestions(false);
    setContentTopic("");
    setContentWord("");
    setContentQuestion("");
    setFile();
    setValueChecked(0);
    setValueText(["", "", "", ""]);
    setFileUrl("");
    setUrlImageUpdateTopic("");
    setUpdateTopic(false);
    setUrlImage("");
    setTopicChose();
    setLocationUrl("");
  };

  const onClick = (e) => {
    switch (e.key) {
      case "topic":
        setIsShowModalTopic(true);
        setVideoTNV(false);
        // setshowAddTopic(true);
        break;
      case "addTopic":
        setVideoTNV(false);
        setshowAddTopic(true);
        break;
      case "addQuestion":
        setVideoTNV(false);
        setshowCreateQuestions(true);
        break;
      case "addWord":
        setVideoTNV(false);
        setShowAddWord(true);
        break;
      case "history":
        setVideoTNV(false);
        break;
      case "tnv":
        setVideoTNV(true);
        break;
      case "statistical":
        setShowStatistical(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="AI-menu-taking">
      <CustomMenu
        onClick={onClick}
        style={{
          width: "100%",
          paddingLeft: 0,
        }}
        mode="inline"
        items={items}
      />

      {/* Câu hỏi */}
      <QuestionModal
        openChooseVideo={openChooseVideo}
        setOpenChooseVideo={setOpenChooseVideo}
        currentPage={currentPage}
        locationUrl={locationUrl}
        setLocationUrl={setLocationUrl}
        onChange={onChange}
        contentQuestion={contentQuestion}
        showCreateQuestions={showCreateQuestions}
        setLoading={setLoading}
        topicChose={topicChose}
        setshowCreateQuestions={setshowCreateQuestions}
        valueChecked={valueChecked}
        valueText={valueText}
        setValueText={setValueText}
        topicInit={topicInit}
        setTopicChose={setTopicChose}
        setContentQuestion={setContentQuestion}
        setCurrentPage={setCurrentPage}
        onCloseAdd={onCloseAdd}
      />

      {/* Từ vụng */}
      <VocabularyModal
        showAddWord={showAddWord}
        handleOkWord={handleOkWord}
        setContentWord={setContentWord}
        urlImage={urlImage}
        setUrlImage={setUrlImage}
        setIsImage={setIsImage}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        topicInit={topicInit}
        setTopicChose={setTopicChose}
        uploadMutation={uploadMutation}
        uploadMutationVideo={uploadMutationVideo}
        loading={loading}
        onCloseAdd={onCloseAdd}
      />

      {/* Chủ đề */}
      <TopicModal
        onCloseAdd={onCloseAdd}
        showAddTopic={showAddTopic}
        contentTopic={contentTopic}
        loading={loading}
        setContentTopic={setContentTopic}
        fileUrl={fileUrl}
        urlImageUpdateTopic={urlImageUpdateTopic}
        file={file}
        isShowModalTopic={isShowModalTopic}
        setIsShowModalTopic={setIsShowModalTopic}
        setVideoTNV={setVideoTNV}
        setshowAddTopic={setshowAddTopic}
        getTopic={getTopic}
        listTopic={listTopic}
        setFile={setFile}
        setIsImage={setIsImage}
        setFileUrl={setFileUrl}
        setUrlImageUpdateTopic={setUrlImageUpdateTopic}
        setTopicIdUpdate={setTopicIdUpdate}
        setUpdateTopic={setUpdateTopic}
        isImage={isImage}
        fileType={fileType}
        setFileType={setFileType}
        setListTopic={setListTopic}
        updateTopic={updateTopic}
        apiUploadFile={apiUploadFile}
        setLoading={setLoading}
        topicIdUpdate={topicIdUpdate}
      />

      {/* Thống kê */}
      <StatisticalModal
        showStatistical={showStatistical}
        setShowStatistical={setShowStatistical}
        listTopic={listTopic}
      />

      {contextHolder}
    </div>
  );
};

export default MenuAdmin;
