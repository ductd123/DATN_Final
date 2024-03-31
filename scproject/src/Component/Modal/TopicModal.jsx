import {
  Button,
  Drawer,
  Image,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import React from "react";
import ButtonSystem from "../button/ButtonSystem";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { apiLearning } from "../../Services/apiLearning";

const { Search } = Input;
const TopicModal = (props) => {
  const {
    onCloseAdd,
    showAddTopic,
    contentTopic,
    loading,
    setContentTopic,
    fileUrl,
    urlImageUpdateTopic,
    file,
    isShowModalTopic,
    setIsShowModalTopic,
    setVideoTNV,
    setshowAddTopic,
    getTopic,
    listTopic,
    setFile,
    setIsImage,
    setFileUrl,
    setUrlImageUpdateTopic,
    setTopicIdUpdate,
    setUpdateTopic,
    setListTopic,
    updateTopic,
    apiUploadFile,
    isImage,
    setLoading,
    topicIdUpdate,
  } = props;

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

  const addTopic = async () => {
    let data;
    const formData = new FormData();
    formData.append("file", file);
    if (!updateTopic) {
      if (file) {
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
      } else {
        data = {
          content: contentTopic,
        };
        const res = await apiLearning.addTopic(data);
        if (res.code === 200) {
          message.success(`Thêm chủ đề ${data.content} thành công.`);
          setLoading(false);
          setshowAddTopic(false);
          getTopic();
          onCloseAdd();
        }
      }
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
    <>
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
            <ButtonSystem
              disabled={contentTopic === ""}
              loading={loading}
              onClick={addTopic}
              className=""
              type="primary"
            >
              Xác nhận
            </ButtonSystem>
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
    </>
  );
};

export default TopicModal;
