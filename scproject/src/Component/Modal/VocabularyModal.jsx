import {
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import React from "react";
import Button from "../Common/Button/Button";
import { UploadOutlined } from "@ant-design/icons";
import ButtonSystem from "../button/ButtonSystem";

const { TextArea } = Input;

const VocabularyModal = (props) => {
  const {
    showAddWord,
    handleOkWord,
    setContentWord,
    urlImage,
    setUrlImage,
    setIsImage,
    fileUrl,
    setFileUrl,
    topicInit,
    setTopicChose,
    uploadMutation,
    uploadMutationVideo,
    loading,
    onCloseAdd,
  } = props;
  return (
    <>
      {/* Thêm từ */}
      <Modal
        open={showAddWord}
        title="Bổ sung thư viện ngôn ngữ ký hiệu"
        onOk={handleOkWord}
        onCancel={onCloseAdd}
        footer={[
          <ButtonSystem key="back" onClick={onCloseAdd}>
            Hủy bỏ
          </ButtonSystem>,
          <ButtonSystem type="primary" loading={loading} onClick={handleOkWord}>
            Tải lên
          </ButtonSystem>,
        ]}
        destroyOnClose
        width={1000}
        centered
      >
        <p className="ant-upload-text" style={{ margin: "25px 0 10px 0" }}>
          Ngôn ngữ văn bản:
        </p>
        <TextArea
          placeholder="Lưu ý viết đúng chính tả và viết thường"
          autoSize
          className="w-1/2"
          onChange={(e) => setContentWord(e.target.value)}
        />
        <div className="flex gap-3">
          <div className="w-1/2">
            <p className="ant-upload-text" style={{ margin: "10px 0 10px 0" }}>
              Ảnh minh hoạ:
            </p>
            <Upload
              showUploadList={false}
              // beforeUpload={beforeUploadImage}
              accept="image/*"
              customRequest={({ file }) => {
                const isImg = file.type.includes("image");
                const formData = new FormData();
                formData.append("file", file);
                if (isImg) {
                  const fileReader = new FileReader();
                  setIsImage(file.type.includes("image"));
                  fileReader.onload = (e) => {
                    setUrlImage(e.target.result);
                  };
                  fileReader.readAsDataURL(file);
                  uploadMutation.mutate(formData);
                } else {
                  message.error("Sai định dạng ảnh");
                }
              }}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Chọn File
              </Button>
            </Upload>

            <div className="mt-3 flex justify-center flex-col items-center relative">
              {urlImage && (
                <Image
                  src={urlImage}
                  alt="Uploaded Image"
                  className="flex justify-center items-center"
                  style={{ width: 300 }}
                />
              )}
            </div>
          </div>
          <div className="w-1/2">
            <p className="ant-upload-text" style={{ margin: "10px 0 10px 0" }}>
              Video minh hoạ:
            </p>
            <Upload
              showUploadList={false}
              customRequest={({ file }) => {
                const isVideo = file.type.startsWith("video/");
                if (!isVideo) {
                  message.error("Sai định dạng video.");
                } else {
                  const fileReader = new FileReader();
                  fileReader.onload = (e) => {
                    setFileUrl(e.target.result); // Lưu URL của file
                  };
                  fileReader.readAsDataURL(file); // Đọc file thành URL
                }
                const formData = new FormData();
                formData.append("file", file);
                uploadMutationVideo.mutate(formData);
              }}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Chọn File
              </Button>
            </Upload>

            <div className="mt-3 flex justify-center flex-col items-center relative">
              {fileUrl && (
                <video
                  src={fileUrl}
                  controls
                  style={{ width: 300, height: 300 }}
                /> // Hiển thị video nếu là loại video
              )}
            </div>
          </div>
        </div>

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
    </>
  );
};

export default VocabularyModal;
