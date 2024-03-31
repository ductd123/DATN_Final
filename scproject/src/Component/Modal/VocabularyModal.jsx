import {
  Button,
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Spin,
  Table,
  Upload,
  message,
} from "antd";
import React, { useMemo, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ButtonSystem from "../button/ButtonSystem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiLearning } from "../../Services/apiLearning";

const { TextArea } = Input;

const VocabularyModal = (props) => {
  const {
    showAddWord,
    setShowAddWord,
    setContentWord,
    contentWord,
    urlImage,
    setUrlImage,
    setIsImage,
    fileUrl,
    setFileUrl,
    topicInit,
    setTopicChose,
    topicChose,
    uploadMutation,
    uploadMutationVideo,
    loading,
    onCloseAdd,
    showModalVocabulary,
    setShowVocabulary,
    setLoading,
    setTopicInit,
    imageLocations,
    setImageLocations,
    setVideoLocations,
    videoLocations,
    getTopic,
  } = props;

  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);
  const [ItemVocabulary, setItemVocabulary] = useState();
  const [filter, setFilter] = useState({
    topicId: "",
    content: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const debouncedSetFilter = (e) => {
    setFilter({ ...filter, content: e.target.value });
  };

  // APi danh sách
  const {
    data: listVocabulary,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getListVocabulary", filter],
    queryFn: async () => {
      let res;
      if (
        filter.topicId === "" ||
        filter.content === "" ||
        filter.topicId === undefined
      ) {
        res = await apiLearning.getAllVocalizations();
      }
      if (filter.topicId || filter.content !== "") {
        res = await apiLearning.searchAllVocalizations(filter);
      }
      return res.data;
    },
    enabled: showModalVocabulary,
  });

  // Xoá chủ đề
  const mutationDel = useMutation({
    mutationFn: async (id) => await apiLearning.deleteTuDien(id),
    onSuccess: () => {
      message.success("Xoá từ thành công");
      refetch();
    },
  });

  // Cập nhật
  const mutationUpdate = useMutation({
    mutationFn: async (data) => await apiLearning.updateVocabulary(data),
    onSuccess: () => {
      message.success("Cập nhật từ vựng thành công");
      setShowAddWord(false);
      setLoading(false);
      setIsUpdate(false);
      refetch();
    },
  });

  // APi thêm mới
  const handleOkWord = async () => {
    setLoading(true);
    const data = {
      content: contentWord,
      imageLocation: imageLocations,
      videoLocation: videoLocations,
      topicId: topicChose,
    };
    if (isUpdate) {
      return mutationUpdate.mutate({
        ...data,
        vocabularyId: ItemVocabulary.vocabularyId,
      });
    } else {
      setTopicInit([]);
      const res = await apiLearning.themTuDien(data);
      if (res.code === 200) {
        setLoading(false);
        onCloseAdd();
        getTopic();
        refetch();
        setShowAddWord(false);
        message.success(`Thêm từ điển lên thành công.`);
      } else {
        setLoading(false);
        setShowAddWord(false);
        message.error(`Thêm từ điển thất bại. Vui lòng thử lại!!!`);
      }
    }
  };

  // Column
  const columns = [
    {
      title: "Chủ đề",
      dataIndex: "topicContent",
      key: "topicContent",
      render: (content) => <span style={{ fontWeight: 500 }}>{content}</span>,
    },
    {
      title: "Từ vựng",
      dataIndex: "content",
      key: "content",
      render: (content) => <span style={{ fontWeight: 500 }}>{content}</span>,
    },

    {
      title: "Ảnh minh hoạ",
      dataIndex: "imageLocation",
      key: "imageLocation",
      render: (imageLocation, record) => {
        if (imageLocation) {
          return (
            <Image
              width={100} // Adjust image width as needed
              src={imageLocation}
              alt={record.content + " illustration"}
            />
          );
        } else {
          return <span>Không có minh họa</span>; // Display "No illustration" message
        }
      },
    },
    {
      title: "Video minh hoạ",
      dataIndex: "videoLocation",
      key: "videoLocation",
      align: "center",
      render: (videoLocation, record) => {
        if (videoLocation) {
          return (
            <EyeOutlined
              style={{ fontSize: "1.5rem" }}
              onClick={() => {
                setOpenPreviewVideo(true);
                setItemVocabulary(record);
              }}
            />
          );
        } else {
          return <span>Không video có minh họa</span>; // Display "No illustration" message
        }
      },
      width: 200,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (content, record) => (
        <div className="">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setIsUpdate(true);
              setShowAddWord(true);
              setItemVocabulary(record);
              setContentWord(record?.content);
              setTopicChose(record?.topicId);
              if (record.imageLocation !== "") {
                setUrlImage(record.imageLocation);
                setImageLocations(record.imageLocation);
              }
              if (record.videoLocation !== "") {
                setFileUrl(record.videoLocation);
                setVideoLocations(record.videoLocation);
              }
            }}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa chủ đề này?"
            onConfirm={() => {
              mutationDel.mutate(record.vocabularyId);
            }}
            onCancel={() => console.log("Huỷ")}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Danh sách */}
      <Modal
        open={showModalVocabulary}
        onCancel={() => setShowVocabulary(false)}
        centered
        width={1200}
        title="Từ vựng"
        footer={null}
      >
        <div className="flex gao-2 items-center">
          {/* Tìm kiếm */}

          <Select
            allowClear
            className="w-1/3"
            placeholder="Chủ dề"
            options={topicInit}
            onChange={(value) => setFilter({ ...filter, topicId: value })}
          />
          <Input
            className="w-1/3"
            placeholder="Từ vựng"
            onChange={debouncedSetFilter}
          ></Input>
        </div>
        <div className="flex justify-between items-center">
          Danh sách từ vựng
          <ButtonSystem type="primary" onClick={() => setShowAddWord(true)}>
            Thêm mới
          </ButtonSystem>
        </div>
        <Spin spinning={isFetching}>
          <Table
            className="mt-4"
            columns={columns}
            dataSource={listVocabulary}
          />
        </Spin>
      </Modal>

      {/* Thêm từ & cập nhật */}
      <Modal
        open={showAddWord}
        title={
          isUpdate
            ? "Cập nhật ngôn ngữ ký hiệu"
            : "Bổ sung thư viện ngôn ngữ ký hiệu"
        }
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
          value={contentWord}
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
                <video src={fileUrl} controls /> // Hiển thị video nếu là loại video
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
          value={topicChose}
          onChange={(e) => {
            setTopicChose(e);
          }}
        ></Select>
      </Modal>

      {/* Video minh hoạ */}
      <Modal
        open={openPreviewVideo}
        onCancel={() => setOpenPreviewVideo(false)}
        centered
        footer={null}
        width={1000}
      >
        <div className="flex justify-center items-center mt-4 py-4">
          <video
            src={ItemVocabulary?.videoLocation}
            controls
            style={{ width: 800 }}
          ></video>
        </div>
      </Modal>
    </>
  );
};

export default VocabularyModal;
