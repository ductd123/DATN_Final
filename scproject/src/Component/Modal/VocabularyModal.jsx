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
  Tabs,
  Popover,
  Switch,
  Collapse,
  Dropdown,
} from "antd";
import React, { useMemo, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UploadOutlined,
  PlusSquareOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import ButtonSystem from "../button/ButtonSystem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import { CaretRightIcon } from "../../assets/icon";
import ModalAddMedia from "./ModalAddMedia";
import ModalListMedia from "./ModalListMedia";
import { colors } from "../../assets/colors";

const { TextArea } = Input;
const { TabPane } = Tabs;

export const CustomUpload = styled(Upload)`
  .ant-upload-icon {
    display: none;
  }
`;

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
  const [tabKey, setTabKey] = useState("1");
  const debouncedSetFilter = (e) => {
    setFilter({ ...filter, content: e.target.value });
  };

  // Thêm từ vào chủ để
  const [selectedRowKey, setSelectedRowKey] = useState([]);
  const [recordSelected, setRecordSelected] = useState();
  const [openModalAddVocabulary, setOpenModalAddVocabulary] = useState(false);
  const [topicSelected, setTopiSelected] = useState();

  // Checkbox item table
  const rowSelection = {
    selectedRowKey,
    onChange: (selectedRowKeys, record) => {
      setSelectedRowKey(selectedRowKeys);
      setRecordSelected(record);
    },
  };

  // Up nhiều
  const [isShowModalAddMedia, setIsShowAddMedia] = useState(false);
  const [recordMedia, setRecordMedia] = useState();
  const [fileList, setFileList] = useState([]); // State để lưu trữ danh sách tệp tin đã chọn
  const [previewFile, setPreviewFile] = useState(null); // State để lưu trữ file đang được xem trước
  const [previewVisible, setPreviewVisible] = useState(false); // State để điều khiển hiển thị của modal xem trước
  const [uploading, setUploading] = useState(false);

  //  Table dạng cha con
  const [isUpdateMedia, setIsUpdateMedia] = useState(false);
  const [showModalLstMedia, setShowModalLstMedia] = useState(false);
  const [recordImageVideo, setRecordImageVideo] = useState();

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
      // Sắp xếp priamry lên đầu
      res?.data.forEach((item) => {
        item.vocabularyImageResList.sort((a, b) => {
          // Sắp xếp sao cho phần tử có primary = true được đặt lên đầu
          return a.primary === b.primary ? 0 : a.primary ? -1 : 1;
        });
        item.vocabularyVideoResList.sort((a, b) => {
          // Sắp xếp sao cho phần tử có primary = true được đặt lên đầu
          return a.primary === b.primary ? 0 : a.primary ? -1 : 1;
        });
      });
      return res.data;
    },
    enabled: !!showModalVocabulary,
  });

  // Thêm từ vào chủ đề
  const mutationAddNewTopic = useMutation({
    mutationFn: async (body) => await apiLearning.addNewTopic(body),
    onSuccess: () => {
      message.success("Thêm thành công");
      setOpenModalAddVocabulary(false);
      setSelectedRowKey([]);
      setTopiSelected(null);
      refetch();
    },
  });

  // Xoá từ vựng
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

  // Update media
  const mutationUpdateMedia = useMutation({
    mutationFn: async (data) => await apiLearning.updateMediaVocabulary(data),
    onSuccess: () => {
      message.success("Cập nhật hình ảnh/ video minh hoạ thành công");
      setShowAddWord(false);
      setLoading(false);
      setIsUpdate(false);
      setIsUpdateMedia(false);
      refetch();
    },
  });

  // APi thêm mới
  const handleOkWord = async () => {
    setLoading(true);
    const data = {
      content: contentWord,
      vocabularyImageReqs: [
        {
          imageLocation: imageLocations,
          primary: true,
        },
      ],
      vocabularyVideoReqs: [
        {
          videoLocation: videoLocations,
          primary: true,
        },
      ],

      topicId: topicChose,
    };
    if (isUpdate && !isUpdateMedia) {
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
        onCloseAdd();
        getTopic();
        setShowAddWord(false);
        message.error(`Thêm từ điển thất bại. Vui lòng thử lại!!!`);
      }
    }
  };

  // Item dropwdown tuỳ chọn
  const items = [
    {
      key: "1",
      label: (
        <div
          className="hover:text-blue-700"
          onClick={() => {
            setShowAddWord(true);
          }}
        >
          Thêm mới
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="hover:text-blue-700"
          style={{
            cursor: selectedRowKey.length > 0 ? "pointer" : "not-allowed",
            color: selectedRowKey.length > 0 ? "black" : "#cccc",
          }}
          onClick={() => setOpenModalAddVocabulary(true)}
        >
          Thêm từ vào chủ đề
        </div>
      ),
    },
  ];

  // Column
  const columns = [
    {
      title: "Từ vựng",
      dataIndex: "content",
      key: "content",
      render: (content, record) => (
        <span
          className="cursor-pointer "
          style={{ fontWeight: 500, color: colors.primary600 }}
          onClick={() => {
            setRecordImageVideo(record);
            setShowModalLstMedia(true);
          }}
        >
          {content}
        </span>
      ),
    },
    {
      title: "Chủ đề",
      dataIndex: "topicContent",
      key: "topicContent",
      render: (content) => <span style={{ fontWeight: 500 }}>{content}</span>,
    },

    {
      title: "Ảnh minh hoạ",
      dataIndex: "imageLocation",
      key: "imageLocation",
      render: (imageLocation, record) => {
        if (
          record.vocabularyImageResList?.length &&
          record.vocabularyImageResList[0].imageLocation
        ) {
          return (
            <Image
              width={100} // Adjust image width as needed
              src={record.vocabularyImageResList[0].imageLocation}
              alt={record.content}
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
        if (
          record.vocabularyVideoResList?.length &&
          record.vocabularyVideoResList[0].videoLocation
        ) {
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
          <Popover
            placement="topLeft"
            title={"Thêm hình ảnh video minh hoạ cho từ"}
          >
            <Button
              type="link"
              icon={<PlusSquareOutlined />}
              onClick={() => {
                setIsShowAddMedia(true);
                setRecordMedia(record);
              }}
            />
          </Popover>

          <Popover placement="topLeft" title={"Chỉnh sửa ảnh minh hoạ cho từ "}>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setIsUpdate(true);
                setShowAddWord(true);
                setItemVocabulary(record);
                setContentWord(record?.content);
                setTopicChose(record?.topicId);
                if (record.vocabularyImageResList[0].imageLocation !== "") {
                  setUrlImage(record.vocabularyImageResList[0].imageLocation);
                  setImageLocations(
                    record.vocabularyImageResList[0].imageLocation
                  );
                }
                if (record.vocabularyVideoResList[0].videoLocation !== "") {
                  setFileUrl(record.vocabularyVideoResList[0].videoLocation);
                  setVideoLocations(
                    record.vocabularyVideoResList[0].videoLocation
                  );
                }
              }}
            />
          </Popover>
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

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  // Hàm xử lý sự kiện khi click vào file để xem trước
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // Nếu không có URL hoặc preview, thì tạo một preview từ file
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onloadend = () => resolve(reader.result);
      });
    }
    setPreviewFile(file); // Lưu file cần xem trước vào state
    setPreviewVisible(true); // Hiển thị modal xem trước
  };

  // Hàm xử lý sự kiện khi đóng modal xem trước
  const handlePreviewCancel = () => setPreviewVisible(false);

  // Hàm xử lý sự kiện khi thay đổi danh sách file
  const handleChange = ({ fileList }) => {
    setUploading(true);

    // Kiểm tra xem danh sách tệp tin có chứa loại tệp tin khác không
    const containsOtherFileType = fileList.some(
      (file) =>
        !file.type.startsWith("image/") && !file.type.startsWith("video/")
    );
    if (containsOtherFileType) {
      message.error("Chỉ chấp nhận tệp ảnh và video!");
      return;
    }
    setTimeout(() => {
      setUploading(false);
    }, 1000);
    setFileList(fileList);
  };

  const handleUpload = async () => {
    setUploading(true);
    // Tạo FormData để truyền danh sách file cho API upload
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj); // originFileObj chứa thông tin về file gốc
    });

    // Gọi API upload với danh sách file đã chọn
    // Ví dụ sử dụng Fetch:
    const res = await apiUploadFile.upLoadVocabulary(formData);

    if (res.code === 200) {
      const body = res.data?.map((e) => ({
        content: e.content,
        vocabularyImageReqs: [
          {
            imageLocation: e.imageLocation,
            vocabularyId: e.vocabularyId,
            primary: true,
          },
        ],
        vocabularyVideoReqs: [
          {
            vocabularyId: e.vocabularyId,
            videoLocation: e.videoLocation,
            primary: true,
          },
        ],
        topicId: topicChose,
      }));
      const response = await apiLearning.addListVocabulary(body);
      if (response.code === 200) {
        message.success("Thêm danh sách từ vựng thành công");
        refetch();
        onCloseAdd();
        setFileList([]);
        setTopicChose(null);
      } else {
        message.error("Thêm thất bại");
        onCloseAdd();
        setFileList([]);
        setTopicChose(null);
      }
      setUploading(false);
    } else {
      message.error("Lỗi tải file");
      setUploading(false);
    }
  };

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
          <Dropdown menu={{ items }} placement="bottomLeft">
            <ButtonSystem type="primary" icon={<DownOutlined />}>
              Tuỳ chọn
            </ButtonSystem>
          </Dropdown>
        </div>
        <Spin spinning={isFetching}>
          <Table
            className="mt-4"
            columns={columns}
            dataSource={listVocabulary}
            rowKey={(record) => record.vocabularyId}
            rowSelection={rowSelection}
            expandIconColumnIndex={1}
            pagination={{ pageSize: 8 }}
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
        onCancel={() => {
          onCloseAdd();
          setIsUpdate(false);
          setIsUpdateMedia(false);
        }}
        footer={[
          <ButtonSystem
            key="back"
            onClick={() => {
              onCloseAdd();
              setIsUpdate(false);
              setIsUpdateMedia(false);
              getTopic();
              setFileList([]);
            }}
          >
            Hủy bỏ
          </ButtonSystem>,
          <ButtonSystem
            type="primary"
            loading={loading}
            onClick={() => {
              if (tabKey === "1") {
                handleOkWord();
                getTopic();
              } else {
                handleUpload();
              }
            }}
          >
            {isUpdateMedia ? "Xác nhận" : "Tải lên"}
          </ButtonSystem>,
        ]}
        destroyOnClose
        width={1000}
        centered
      >
        <Spin spinning={uploading}>
          {isUpdate ? (
            <div className="">
              {!isUpdateMedia && (
                <>
                  <p
                    className="ant-upload-text"
                    style={{ margin: "25px 0 10px 0" }}
                  >
                    Ngôn ngữ văn bản:
                  </p>
                  <TextArea
                    placeholder="Lưu ý viết đúng chính tả và viết thường"
                    autoSize
                    value={contentWord}
                    className="w-1/2"
                    onChange={(e) => setContentWord(e.target.value)}
                  />
                </>
              )}

              <div className="flex gap-3">
                <div className="w-1/2">
                  <p
                    className="ant-upload-text"
                    style={{ margin: "10px 0 10px 0" }}
                  >
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
              {!isUpdateMedia && (
                <>
                  <p
                    className="ant-upload-text"
                    style={{ margin: "10px 0 10px 0" }}
                  >
                    Chủ đề liên quan:
                  </p>
                  <Select
                    mode=""
                    placeholder="Chọn chủ đề"
                    style={{ width: "100%" }}
                    options={topicInit?.filter((e) => e.id !== 1)}
                    value={topicChose}
                    onChange={(e) => {
                      setTopicChose(e);
                    }}
                  ></Select>
                </>
              )}
            </div>
          ) : (
            <Tabs activeKey={tabKey} onChange={handleTabChange}>
              <TabPane tab="Thêm một" key="1">
                <p
                  className="ant-upload-text"
                  style={{ margin: "25px 0 10px 0" }}
                >
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
                    <p
                      className="ant-upload-text"
                      style={{ margin: "10px 0 10px 0" }}
                    >
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

                <p
                  className="ant-upload-text"
                  style={{ margin: "10px 0 10px 0" }}
                >
                  Chủ đề liên quan:
                </p>
                <Select
                  mode=""
                  placeholder="Chọn chủ đề"
                  style={{ width: "100%" }}
                  options={topicInit?.filter((e) => e.id !== 1)}
                  value={topicChose}
                  onChange={(e) => {
                    setTopicChose(e);
                  }}
                ></Select>
              </TabPane>
              <TabPane tab="Thêm nhiều" key="2">
                <Select
                  title="Chọn chủ đề"
                  mode=""
                  className="mb-3"
                  placeholder="Chọn chủ đề"
                  style={{ width: "100%" }}
                  options={topicInit}
                  value={topicChose}
                  onChange={(e) => {
                    setTopicChose(e);
                  }}
                ></Select>
                <div className="overflow-y-scroll max-h-[600px]">
                  <CustomUpload
                    listType="text"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple
                    customRequest={async ({ file }) => {
                      const isImageOrVideo =
                        file.type.startsWith("image/") ||
                        file.type.startsWith("video/");
                      if (!isImageOrVideo) {
                        message.error("Chỉ được chọn file video hoặc ảnh.");
                      }
                    }}
                    accept="image/*,video/*"
                  >
                    <ButtonSystem icon={<UploadOutlined />}>
                      Chọn File
                    </ButtonSystem>
                  </CustomUpload>
                </div>
              </TabPane>
            </Tabs>
          )}
        </Spin>
      </Modal>

      {/* Modal xem trước */}
      <Modal
        visible={previewVisible}
        onCancel={handlePreviewCancel}
        footer={null}
        width={600}
        closeIcon={null}
      >
        <div className="flex justify-center items-center w-full">
          {previewFile && (
            <>
              {previewFile.type.startsWith("image/") ? (
                <img
                  className="w-full"
                  alt=""
                  src={previewFile.url || previewFile.preview}
                />
              ) : (
                <div className="w-full">
                  <video controls style={{ width: "100%", height: "auto" }}>
                    <source src={previewFile.url || previewFile.preview} />
                  </video>
                </div>
              )}
            </>
          )}
        </div>
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
          {ItemVocabulary?.vocabularyVideoResList?.length ? (
            <video
              src={ItemVocabulary?.vocabularyVideoResList[0]?.videoLocation}
              controls
              style={{ width: 800 }}
            ></video>
          ) : (
            <video
              src={ItemVocabulary?.videoLocation}
              controls
              style={{ width: 800 }}
            ></video>
          )}
        </div>
      </Modal>

      {/* Thêm nhiều media cho từ */}
      <ModalAddMedia
        isShowModalAddMedia={isShowModalAddMedia}
        recordMedia={recordMedia}
        setIsShowAddMedia={setIsShowAddMedia}
        setLoading={setLoading}
        loading={loading}
        setShowAddWord={setShowAddWord}
        setIsUpdate={setIsUpdate}
        setIsUpdateMedia={setIsUpdateMedia}
        refetch={refetch}
        handleOkWord={handleOkWord}
        setPreviewFile={setPreviewFile}
        setPreviewVisible={setPreviewVisible}
      />
      {/* Modal hiển thị list media */}
      <ModalListMedia
        record={recordImageVideo}
        showModalLstMedia={showModalLstMedia}
        setShowModalLstMedia={setShowModalLstMedia}
        refetch={refetch}
        setOpenPreviewVideo={setOpenPreviewVideo}
        setItemVocabulary={setItemVocabulary}
      />

      {/* Modal chọn topic thêm từ vào */}
      <Modal
        open={openModalAddVocabulary}
        onCancel={() => {
          setOpenModalAddVocabulary(false);
        }}
        okText="Xác nhận"
        cancelText="Huỷ"
        title="Thêm từ vào chủ đề"
        onOk={() => {
          const req = selectedRowKey?.map((key) => ({
            id: key,
            topicId: topicSelected,
          }));
          mutationAddNewTopic.mutate(req);
        }}
      >
        <Select
          allowClear
          className="w-full"
          placeholder="Chọn chủ đề muốn thêm"
          value={topicSelected}
          options={topicInit?.filter((e) => e.id !== 1)}
          onChange={(e) => {
            setTopiSelected(e);
          }}
        />
      </Modal>
    </>
  );
};

export default VocabularyModal;
