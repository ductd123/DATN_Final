import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Drawer,
  Image,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import ButtonSystem from "../button/ButtonSystem";
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
const { Search } = Input;
const MenuAdmin = ({ setVideoTNV, getHistory, history }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [showPanelHistory, setShowPanelHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateQuestions, setshowCreateQuestions] = useState(false);
  const [showAddTopic, setshowAddTopic] = useState(false);
  const [showAddWord, setShowAddWord] = useState(false);
  const [valueText, setValueText] = useState(["", "", "", ""]);
  const [linkFile, setLinkFile] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [contentTopic, setContentTopic] = useState("");
  const [contentWord, setContentWord] = useState("");
  const [contentQuestion, setContentQuestion] = useState();
  const [topicChose, setTopicChose] = useState();
  const [topicInit, setTopicInit] = useState([]);
  const [valueChecked, setValueChecked] = useState(0);
  const [isImage, setIsImage] = useState(true);
  const videoRef = useRef(null);
  const [fileType, setFileType] = useState(""); // State để lưu trữ loại file
  const [fileUrl, setFileUrl] = useState(""); // State để lưu trữ URL của file
  const [isShowModalTopic, setIsShowModalTopic] = useState(false);
  const [listTopic, setListTopic] = useState([]);
  const [updateTopic, setUpdateTopic] = useState(false);
  const [urlImageUpdateTopic, setUrlImageUpdateTopic] = useState("");
  const [topicIdUpdate, setTopicIdUpdate] = useState();
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
      "Tạo câu hỏi kiểm tra",
      "addQuestion",
      <CloudUploadOutlined style={{ fontSize: "1.25rem" }} />
    ),
  ];

  // Tìm kiếm chủ đề
  const mutation = useMutation({
    mutationFn: async (data) => await apiLearning.searchTopic(data),
    onSuccess: (res) => {
      setListTopic(res.data);
    },
  });

  // Xoá chủ đề
  const mutationDel = useMutation({
    mutationFn: async (id) => await apiLearning.deleteTopic(id),
    onSuccess: () => {
      message.success("Xoá chủ đề thành công");
      getTopic();
    },
  });

  // Cập nhật chủ đề
  const mutationUpdate = useMutation({
    mutationFn: async (data) => await apiLearning.updateTopic(data),

    onSuccess: () => {
      message.success("Cập nhật chủ đề thành công");
      onCloseAdd();
      getTopic();
    },
  });

  useEffect(() => {
    getTopic();
    getHistory();
  }, []);

  const handleCreateQuestion = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    apiUploadFile
      .uploadFile(formData)
      .then((response) => {
        const imageData = isImage ? response : "";
        const videoData = isImage ? "" : response;
        const data = {
          content: contentQuestion,
          explanation: "",
          imageLocation: imageData,
          videoLocation: videoData,
          topicId: topicChose,
          answerReqs: [
            {
              content: valueText[0],
              imageLocation: "",
              videoLocation: "",
              correct: valueChecked === 0,
            },

            {
              content: valueText[1],
              imageLocation: "",
              videoLocation: "",
              correct: valueChecked === 1,
            },
            {
              content: valueText[2],
              imageLocation: "",
              videoLocation: "",
              correct: valueChecked === 2,
            },
            {
              content: valueText[3],
              imageLocation: "",
              videoLocation: "",
              correct: valueChecked === 3,
            },
          ],
        };
        return apiLearning.addQuestion(data);
      })
      .then(() => {
        setLoading(false);
        setshowCreateQuestions(false);
        onCloseAdd();
        message.success(`Tạo câu hỏi thành công.`);
      })
      .catch((error) => {
        setLoading(false);
        setshowCreateQuestions(false);
        console.error("Error creating question:", error);
        message.error("Tạo câu hỏi thất bại. Vui lòng thử lại!!!");
      });
  };

  const handleOkWord = async () => {
    setLoading(true);
    setTopicInit([]);
    const formData = new FormData();
    formData.append("file", file);
    apiUploadFile
      .uploadFile(formData)
      .then((response) => {
        const imageData = isImage ? response : "";
        const videoData = isImage ? "" : response;
        const data = {
          content: contentWord,
          imageLocation: imageData,
          videoLocation: videoData,
          topicId: topicChose,
        };
        return apiLearning.themTuDien(data);
      })
      .then(() => {
        setLoading(false);
        onCloseAdd();
        getTopic();
        setShowAddWord(false);
        message.success(`Thêm từ điển lên thành công.`);
      })
      .catch((error) => {
        setLoading(false);
        setShowAddWord(false);
        message.error(`Thêm từ điển thất bại. Vui lòng thử lại!!!`);
      });
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
    setLinkFile("");
    setValueChecked(0);
    setValueText(["", "", "", ""]);
    setFileUrl("");
    setUrlImageUpdateTopic("");
    setUpdateTopic(false);
  };

  // Xử lý trước khi upload file
  const beforeUpload = (file) => {
    const fileReader = new FileReader();
    setFile(file);
    setIsImage(file.type.includes("image"));
    fileReader.onload = (e) => {
      setFileUrl(e.target.result); // Lưu URL của file
    };
    fileReader.readAsDataURL(file); // Đọc file thành URL
    setFileType(file.type.split("/")[0]); // Lưu loại file (image hoặc video)
    return false; // Prevent upload action
  };

  const beforeUploadTopic = (file) => {
    const isImage = file.type.startsWith("image/"); // More accurate check for image types

    if (!isImage) {
      message.error("Chỉ cho phép chọn file ảnh."); // Informative error message
      return Upload.LIST_IGNORE; // Prevent upload
    } else {
      const fileReader = new FileReader();
      setFile(file);
      setIsImage(file.type.includes("image"));
      fileReader.onload = (e) => {
        setFileUrl(e.target.result);
      };
      fileReader.readAsDataURL(file);
    }

    return true;
  };

  const addTopic = async () => {
    let data;
    const formData = new FormData();
    formData.append("file", file);
    if (file && !updateTopic) {
      apiUploadFile
        .uploadFile(formData)
        .then((response) => {
          const imageData = isImage ? response : "";
          data = {
            content: contentTopic,
            imageLocation: imageData || urlImageUpdateTopic,
          };

          return apiLearning.addTopic(data);
        })
        .then(() => {
          setLoading(false);
          setshowAddTopic(false);
          getTopic();
          onCloseAdd();
          message.success(`Thêm chủ đề ${data.content} thành công.`);
        })
        .catch((error) => {
          setLoading(false);
          setshowAddTopic(true);
          message.error(
            `Thêm chủ đề ${data.content} thất bại. Vui lòng thử lại!!!`
          );
        });
    } else if (updateTopic && !file) {
      mutationUpdate.mutate({
        content: contentTopic,
        imageLocation: urlImageUpdateTopic,
        topicId: topicIdUpdate,
        videoLocation: "",
      });
    } else {
      if (updateTopic && file) {
        apiUploadFile.uploadFile(formData).then((response) => {
          const imageData = isImage ? response : "";
          data = {
            content: contentTopic,
            imageLocation: imageData || urlImageUpdateTopic,
            topicId: topicIdUpdate,
            videoLocation: "",
          };
          return mutationUpdate.mutate(data);
        });
      }
    }
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
        setShowPanelHistory(true);
        break;
      case "tnv":
        setVideoTNV(true);
        break;
      default:
        break;
    }
  };

  const onPreviewHistory = (item) => {
    setShowPreview(true);
    setPreview(item);
  };

  // Column
  const columns = [
    {
      title: "Chủ đề",
      dataIndex: "content",
      key: "content",
      render: (content) => <span style={{ fontWeight: 500 }}>{content}</span>,
    },
    {
      title: "Minh hoạ",
      dataIndex: "imageLocation",
      key: "imageLocation",
      render: (imageLocation, record) => {
        if (imageLocation) {
          const isImage =
            imageLocation.endsWith(".jpg") ||
            imageLocation.endsWith(".png") ||
            imageLocation.endsWith(".jpeg"); // Check for common image extensions
          if (isImage) {
            return (
              <Image
                width={100} // Adjust image width as needed
                src={imageLocation}
                alt={record.content + " illustration"}
              />
            );
          } else {
            // Handle non-image media types (e.g., video preview placeholder)
            return <span>Video</span>; // Placeholder for now, replace with video preview logic
          }
        } else {
          return <span>Không có minh họa</span>; // Display "No illustration" message
        }
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (value, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setshowAddTopic(true);
              setContentTopic(record.content);
              setUrlImageUpdateTopic(record.imageLocation);
              setTopicIdUpdate(record.topicId);
              setUpdateTopic(true);
            }}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa chủ đề này?"
            onConfirm={() => {
              mutationDel.mutate(record.topicId);
            }}
            onCancel={() => console.log("Huỷ")}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="AI-menu-taking">
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          paddingLeft: 0,
        }}
        mode="inline"
        items={items}
      />
      <Modal
        open={showPreview}
        footer={[]}
        onCancel={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          setShowPreview(false);
        }}
        style={{ top: 20 }}
        title={preview?.content}
        key={preview?.id}
      >
        <video
          ref={videoRef}
          controls
          style={{
            width: "100%",
            height: "auto",
            marginTop: "30px",
          }}
        >
          <source src={preview?.dataLocation} type="video/mp4" />
        </video>
      </Modal>
      <Modal
        open={showCreateQuestions}
        title="Tạo câu hỏi kiểm tra"
        onOk={handleCreateQuestion}
        onCancel={onCloseAdd}
        onClose={onCloseAdd}
        okText="Tải lên"
        cancelText="Hủy bỏ"
        style={{ top: 20 }}
        className="radio-create-question"
      >
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0 10px 0", fontWeight: "500" }}
        >
          Câu hỏi
        </p>
        <TextArea
          style={{
            width: "100%",
          }}
          value={contentQuestion}
          onChange={(e) => {
            setContentQuestion(e.target.value);
          }}
          placeholder="Nhập câu hỏi ở đây."
        />
        <div style={{ height: "8px" }} />
        <Upload showUploadList={false} beforeUpload={beforeUpload}>
          <Button type="primary" icon={<UploadOutlined />}>
            Chọn File
          </Button>
        </Upload>
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", fontWeight: "500" }}
        >
          File: {file?.name}
        </p>
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", fontWeight: "500" }}
        >
          Đáp án:{" "}
        </p>
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", color: "#a3a3a3" }}
        >
          Lưu ý: tích vào đáp án đúng.
        </p>
        <Radio.Group onChange={onChange} value={valueChecked}>
          <Space direction="vertical">
            <Radio value={0}>
              <Input
                style={{
                  width: "100%",
                  marginLeft: 10,
                }}
                value={valueText[0]}
                onChange={(e) => {
                  const updatedValueText = [...valueText];
                  updatedValueText[0] = e.target.value;
                  setValueText(updatedValueText);
                }}
              />
            </Radio>
            <Radio value={1}>
              <Input
                style={{
                  width: "100%",
                  marginLeft: 10,
                }}
                value={valueText[1]}
                onChange={(e) => {
                  const updatedValueText = [...valueText];
                  updatedValueText[1] = e.target.value;
                  setValueText(updatedValueText);
                }}
              />
            </Radio>
          </Space>
          <Space direction="vertical">
            <Radio value={2}>
              <Input
                style={{
                  width: "100%",
                  marginLeft: 10,
                }}
                value={valueText[2]}
                onChange={(e) => {
                  const updatedValueText = [...valueText];
                  updatedValueText[2] = e.target.value;
                  setValueText(updatedValueText);
                }}
              />
            </Radio>
            <Radio value={3}>
              <Input
                style={{
                  width: "100%",
                  marginLeft: 10,
                }}
                value={valueText[3]}
                onChange={(e) => {
                  const updatedValueText = [...valueText];
                  updatedValueText[3] = e.target.value;
                  setValueText(updatedValueText);
                }}
              />
            </Radio>
          </Space>
        </Radio.Group>
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", fontWeight: "500" }}
        >
          Chủ đề liên quan:
        </p>
        <Select
          style={{ width: "100%" }}
          options={topicInit}
          onChange={(e) => {
            setTopicChose(e);
          }}
        />
      </Modal>

      {/* Thêm chủ đề */}
      <Drawer
        title="Thêm chủ đề"
        placement="right"
        onClose={onCloseAdd}
        open={showAddTopic}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <Space>
            <Button
              className="ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-default"
              onClick={onCloseAdd}
            >
              Hủy bỏ
            </Button>
            <Button
              loading={loading}
              onClick={addTopic}
              className="ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-primary"
              type="primary"
            >
              Xác nhận
            </Button>
          </Space>
        }
      >
        <p className="ant-upload-text" style={{ margin: "0 0 10px 0" }}>
          Nhập chủ đề muốn thêm:
        </p>
        <Input
          placeholder="Nhập tên chủ đề muốn thêm"
          value={contentTopic}
          onChange={(e) => setContentTopic(e.target.value)}
        />
        {/* Nội dung */}
        <div className="mt-3">
          <Upload
            showUploadList={false}
            beforeUpload={beforeUploadTopic}
            accept="image/*"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Chọn File
            </Button>
          </Upload>

          <div className="mt-3 flex justify-center flex-col items-center relative">
            {(fileUrl || urlImageUpdateTopic) && (
              <Image
                src={fileUrl || urlImageUpdateTopic}
                alt="Uploaded Image"
              /> // Hiển thị ảnh nếu là loại image
            )}
          </div>

          <p
            className="ant-upload-text"
            style={{ margin: "10px 0", fontWeight: "500" }}
          >
            File: {file ? file.name : ""}
          </p>
        </div>
      </Drawer>

      {/* Thêm từ */}
      <Modal
        open={showAddWord}
        title="Bổ sung thư viện ngôn ngữ ký hiệu"
        onOk={handleOkWord}
        onCancel={onCloseAdd}
        footer={[
          <Button key="back" onClick={onCloseAdd}>
            Hủy bỏ
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={handleOkWord}
          >
            Tải lên
          </Button>,
        ]}
        destroyOnClose
      >
        <p className="ant-upload-text" style={{ margin: "25px 0 10px 0" }}>
          Ngôn ngữ văn bản:
        </p>
        <TextArea
          placeholder="Lưu ý viết đúng chính tả và viết thường"
          autoSize
          onChange={(e) => setContentWord(e.target.value)}
        />
        <p className="ant-upload-text" style={{ margin: "10px 0 10px 0" }}>
          Ngôn ngữ ký hiệu:
        </p>
        <Upload showUploadList={false} beforeUpload={beforeUpload}>
          <Button type="primary" icon={<UploadOutlined />}>
            Chọn File
          </Button>
        </Upload>

        <div className="mt-3 flex justify-center flex-col items-center relative">
          {fileType === "image" && fileUrl && (
            <Image src={fileUrl} alt="Uploaded Image" /> // Hiển thị ảnh nếu là loại image
          )}
          {fileType === "video" && fileUrl && (
            <video src={fileUrl} controls style={{ width: 500, height: 500 }} /> // Hiển thị video nếu là loại video
          )}
        </div>

        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", fontWeight: "500" }}
        >
          File: {file ? file.name : ""}
        </p>
        <p className="ant-upload-text" style={{ margin: "10px 0 10px 0" }}>
          Chủ đề liên quan:
        </p>
        <Select
          mode=""
          placeholder="Chọn chủ đề"
          style={{ width: "100%" }}
          options={topicInit}
          onChange={(e) => {
            setTopicChose(e);
          }}
        ></Select>
      </Modal>

      {/* Danh sách topic */}
      <Modal
        open={isShowModalTopic}
        footer={
          <>
            <ButtonSystem
              className="mr-4"
              onClick={() => setIsShowModalTopic(false)}
            >
              Đóng
            </ButtonSystem>
          </>
        }
        width={800}
        closeIcon={null}
        centered
        destroyOnClose
        zIndex={10}
      >
        <div className="w-full px-4">
          {/* Tìm kiếm topic */}
          <div className="text-xl font-bold mb-2">Danh sách chủ đề</div>
          <div className="flex items-center justify-between gap-3">
            <Search
              placeholder="Tìm kiếm chủ đề"
              allowClear
              onSearch={(data) => {
                if (data) {
                  mutation.mutate({
                    page: 1,
                    size: 999999,
                    text: data,
                    ascending: true,
                    orderBy: "",
                  });
                } else {
                  getTopic();
                }
              }}
              style={{
                width: 200,
              }}
            />

            {/* Thêm mới */}
            <ButtonSystem
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setVideoTNV(false);
                setshowAddTopic(true);
              }}
            >
              Thêm mới
            </ButtonSystem>
          </div>

          <div className="mt-4">
            <Table columns={columns} dataSource={listTopic} />
          </div>
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default MenuAdmin;
