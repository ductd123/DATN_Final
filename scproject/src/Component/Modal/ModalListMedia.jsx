import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Image,
  Modal,
  Popconfirm,
  Popover,
  Switch,
  Table,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ButtonSystem from "../button/ButtonSystem";
import BasicDrawer from "../drawer/Drawer";

const ModalListMedia = ({
  showModalLstMedia,
  record,
  setShowModalLstMedia,
  refetch,
}) => {
  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);
  const [itemVocabulary, setItemVocabulary] = useState();
  const [isShowModalUpdateMedia, setIsShowModalUpdateMedia] = useState(false);
  const [recordUpdated, setRecordUpdated] = useState();
  const [fileUrlImage, setUrlImage] = useState("");
  const [fileUrlVideo, setUrlVideo] = useState("");
  const [imageLocations, setImageLocations] = useState();
  const [videoLocations, setVideoLocations] = useState();
  const [primaryMedia, setPrimaryMedia] = useState();

  useEffect(() => {
    if (recordUpdated) {
      setPrimaryMedia(recordUpdated?.primary);
    }
  }, [recordUpdated]);
  // setPrimary
  const mutationSetPrimaryVideo = useMutation({
    mutationFn: async (data) =>
      await apiLearning.setPrimaryVideoVocabulary(data),
    onSuccess: () => {
      message.success("Cập nhật video hiển thị chính thành công");
      setShowModalLstMedia(false);

      refetch();
    },
  });

  const mutationSetPrimaryImage = useMutation({
    mutationFn: async (data) =>
      await apiLearning.setPrimaryImageVocabulary(data),
    onSuccess: () => {
      message.success("Cập nhật hình ảnh hiển thị chính thành công");
      setShowModalLstMedia(false);

      refetch();
    },
  });

  // Update image
  const mutationUpdateImage = useMutation({
    mutationFn: async (body) => await apiLearning.updateImageVocabulary(body),
    onSuccess: () => {
      message.success("Cập nhật hình ảnh minh hoạ thành công");
      setIsShowModalUpdateMedia(false);
      setShowModalLstMedia(false);

      refetch();
    },
  });

  // Update video
  const mutationUpdateVideo = useMutation({
    mutationFn: async (body) => await apiLearning.updateVideoVocabulary(body),
    onSuccess: () => {
      message.success("Cập nhật video minh hoạ thành công");
      setIsShowModalUpdateMedia(false);
      setShowModalLstMedia(false);

      refetch();
    },
  });

  // Xoá media
  const mutationDelImage = useMutation({
    mutationFn: async (id) => await apiLearning.deleteImageVocabulary(id),
    onSuccess: () => {
      message.success("Xoá hình ảnh minh hoạ thành công");
      setIsShowModalUpdateMedia(false);
      setShowModalLstMedia(false);

      refetch();
    },
  });

  const mutationDelVideo = useMutation({
    mutationFn: async (id) => await apiLearning.deleteVideoVocabulary(id),
    onSuccess: () => {
      message.success("Xoá video minh hoạ thành công");
      setIsShowModalUpdateMedia(false);
      setShowModalLstMedia(false);

      refetch();
    },
  });

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

  const columns = (hiddenVideo, hiddenImage) => {
    return [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (value, record, index) => index + 1,
        width: 50,
      },
      {
        title: "Ảnh minh hoạ",
        dataIndex: "imageLocation",
        key: "imageLocation",
        render: (imageLocation, record) => {
          if (imageLocation) {
            return (
              <Image
                width={120} // Adjust image width as needed
                src={imageLocation}
                alt={record.content}
              />
            );
          } else {
            return <span>Không có minh họa</span>; // Display "No illustration" message
          }
        },
        width: "30%",
        align: "center",
        hidden: hiddenImage,
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
        width: "30%",
        hidden: hiddenVideo,
      },
      {
        title: "Hình ảnh minh hoạ chính",
        dataIndex: "primary",
        align: "center",
        render: (value, record) => (
          <Switch
            checked={value}
            onChange={(item) => {
              mutationSetPrimaryImage.mutate({
                vocabularyImageId: record.vocabularyImageId,
                primary: item,
              });
            }}
          />
        ),
        width: 200,
        hidden: hiddenImage,
      },
      {
        title: "Hình ảnh minh hoạ chính",
        dataIndex: "primary",
        align: "center",
        render: (value, record) => (
          <Switch
            checked={value}
            onChange={(item) => {
              mutationSetPrimaryVideo.mutate({
                vocabularyVideoId: record.vocabularyVideoId,
                primary: item,
              });
            }}
          />
        ),
        width: 200,
        hidden: hiddenVideo,
      },
      {
        title: "Hành động",
        dataIndex: "action",
        key: "action",
        render: (content, record) => (
          <div className="">
            <Popover placement="topLeft">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsShowModalUpdateMedia(true);
                  setRecordUpdated(record);
                  setImageLocations(record?.imageLocation);
                  setVideoLocations(record?.videoLocation);
                  setUrlImage(record?.imageLocation);
                  setUrlVideo(record?.videoLocation);
                }}
              />
            </Popover>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa hình ảnh này?"
              onConfirm={() => {
                if (record.primary && record?.imageLocation) {
                  message.warning(
                    "Không thể xoá. Do đang là hình ảnh hiển thị minh hoạ chính"
                  );
                } else if (record.primary && record?.videoLocation) {
                  message.warning(
                    "Không thể xoá. Do đang là video hiển thị minh hoạ chính"
                  );
                } else {
                  if (record?.imageLocation) {
                    mutationDelImage.mutate(record.vocabularyImageId);
                  } else {
                    mutationDelVideo.mutate(record.vocabularyVideoId);
                  }
                }
              }}
              onCancel={() => console.log("Huỷ")}
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        ),
      },
    ];
  };

  return (
    <div>
      <Modal
        open={showModalLstMedia}
        title={
          <div>
            `Danh sách hình ảnh / video minh hoạ của từ{" "}
            <span className="text-[28px] text-red-500">{record?.content}</span>`
          </div>
        }
        onCancel={() => setShowModalLstMedia(false)}
        centered
        width={1200}
        footer={null}
      >
        <div className="flex gap-4 items-start">
          <div className="w-1/2">
            Danh sách hình ảnh
            <Table
              columns={columns(true, false)?.filter((e) => !e.hidden)}
              dataSource={record?.vocabularyImageResList}
              pagination={{ pageSize: 4, position: ["bottomCenter"] }}
            />
          </div>
          <div className="w-1/2">
            Dánh sách video
            <Table
              columns={columns(false, true)?.filter((e) => !e.hidden)}
              dataSource={record?.vocabularyVideoResList}
              pagination={{ pageSize: 6, position: ["bottomCenter"] }}
            />
          </div>
        </div>
      </Modal>

      {/* Xem preview */}
      <Modal
        open={openPreviewVideo}
        onCancel={() => setOpenPreviewVideo(false)}
        centered
        footer={null}
        width={1000}
      >
        <div className="flex justify-center items-center mt-4 py-4">
          <video
            src={itemVocabulary?.videoLocation}
            controls
            style={{ width: 800 }}
          ></video>
        </div>
      </Modal>

      {/* Update video | images */}
      <BasicDrawer
        width={560}
        titleName="Chỉnh sửa Media"
        open={isShowModalUpdateMedia}
        onClose={() => setIsShowModalUpdateMedia(false)}
        onOk={() => {
          if (recordUpdated?.imageLocation) {
            mutationUpdateImage.mutate({
              ...recordUpdated,
              primary: primaryMedia,
              imageLocation: imageLocations,
            });
          } else {
            mutationUpdateVideo.mutate({
              ...recordUpdated,
              primary: primaryMedia,
              videoLocation: videoLocations,
            });
          }
        }}
        destroyOnClose
      >
        <div className="py-2">
          <div className="">
            <div className="w-full">
              <div className="flex justify-between items-center">
                Hiển thị minh hoạ chính
                <Switch
                  checked={primaryMedia}
                  onChange={(item) => {
                    setPrimaryMedia(item);
                  }}
                />
              </div>
              {recordUpdated?.imageLocation ? (
                <div className="w-full">
                  <p
                    className="ant-upload-text"
                    style={{ margin: "10px 0 10px 0" }}
                  >
                    Ảnh minh hoạ:
                  </p>
                  <Upload
                    showUploadList={false}
                    accept="image/*"
                    customRequest={({ file }) => {
                      const isImg = file.type.includes("image");
                      const formData = new FormData();
                      formData.append("file", file);
                      if (isImg) {
                        const fileReader = new FileReader();
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
                    <Image
                      src={fileUrlImage}
                      alt="Uploaded Image"
                      className="flex justify-center items-center"
                      style={{ width: 300 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <p
                    className="ant-upload-text"
                    style={{ margin: "10px 0 10px 0" }}
                  >
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
                          setUrlVideo(e.target.result); // Lưu URL của file
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
                    <video src={fileUrlVideo} controls />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BasicDrawer>
    </div>
  );
};

export default ModalListMedia;
