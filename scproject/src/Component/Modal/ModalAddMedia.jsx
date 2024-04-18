import { Button, Collapse, Image, Modal, Spin, Upload, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ButtonSystem from "../button/ButtonSystem";
import { useMutation } from "@tanstack/react-query";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import { UploadOutlined } from "@ant-design/icons";
import { CustomUpload } from "./VocabularyModal";

const CustomCollapse = styled(Collapse)`
  &&& {
    border: none;
    border-radius: 0px;
    background-color: white;
    box-shadow: none;
  }

  .ant-collapse-header-text {
    color: "#0F131A";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.07px;
  }
  &.ant-collapse > .ant-collapse-item:first-child .ant-collapse-header {
    color: red;
  }
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px 0px 8px 0px;
  }
  &.ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    &:nth-child(n + 2) {
      padding: 8px 0px 8px 0px;
    }
    padding: 0px;
  }
  &.ant-collapse-borderless > .ant-collapse-item {
    &:nth-child(n + 2) {
      padding: 16px 0px 8px 0px;
    }
    padding-bottom: 8px;
    border-bottom: none;
    &:nth-child(n + 2) {
      border-top: 1px solid #e2e8f3;
    }
  }
`;
const ModalAddMedia = (props) => {
  const {
    isShowModalAddMedia,
    recordMedia,
    setIsShowAddMedia,
    setLoading,
    loading,
    setShowAddWord,
    setIsUpdate,
    setIsUpdateMedia,
    refetch,
    handleOkWord,
    setPreviewFile,
    setPreviewVisible,
  } = props;

  const [urlImage, setUrlImage] = useState("");
  const [imageLocations, setImageLocations] = useState("");
  const [videoLocations, setVideoLocations] = useState("");
  const [fileUrl, setFileUrl] = useState(""); // State để lưu trữ URL của file
  const [fileList, setFileList] = useState([]); // State để lưu trữ danh sách tệp tin đã chọn

  const handleUpload = async () => {
    // Tạo FormData để truyền danh sách file cho API upload
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj); // originFileObj chứa thông tin về file gốc
    });
    // Gọi API upload với danh sách file đã chọn
    // Ví dụ sử dụng Fetch:
    const res = await apiUploadFile.upLoadVocabulary(formData);
    // Lọc ra imageLocation không phải null
    const images = res.data
      ?.filter((item) => item.imageLocation !== null)
      .map((item) => item.imageLocation);

    // Lọc ra videoLocation không phải null
    const videos = res.data
      ?.filter((item) => item.videoLocation !== null)
      .map((item) => item.videoLocation);

    // Đóng gói upload list image
    let bodyLitsImage = [
      {
        imageLocation: imageLocations,
        primary: true,
        vocabularyId: recordMedia.vocabularyId,
      },
    ];
    images?.map((e) =>
      bodyLitsImage.push({
        imageLocation: e,
        primary: false,
        vocabularyId: recordMedia.vocabularyId,
      })
    );

    // Đóng gói list video
    let bodyLitsVideo = [
      {
        videoLocation: videoLocations,
        primary: true,
        vocabularyId: recordMedia.vocabularyId,
      },
    ];
    videos?.map((e) =>
      bodyLitsVideo.push({
        videoLocation: e,
        primary: false,
        vocabularyId: recordMedia.vocabularyId,
      })
    );

    if (res.code === 200) {
      const responseImage = await apiLearning.addListImageVocabulary(
        bodyLitsImage
      );
      const responseVideo = await apiLearning.addListVideoVocabulary(
        bodyLitsVideo
      );
      if (responseImage.code === 200 && responseVideo.code === 200) {
        message.success("Thêm danh sách hình anh/ video thành công");
        setFileList([]);
        setIsShowAddMedia(false);
        onCloseAdd();
        refetch();
      } else if (responseImage.code === 200 && responseVideo.code !== 200) {
        message.error("Lỗi upload video");
      } else {
        message.error("Lỗi upload images");
      }
    } else {
      message.error("Lỗi upload files");
    }
  };

  const onCloseAdd = () => {
    setFileList([]);
    setImageLocations(null);
    setVideoLocations(null);
    setFileUrl(null);
    setUrlImage(null);
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

  // Hàm xử lý sự kiện khi thay đổi danh sách file
  const handleChange = ({ fileList }) => {
    // Kiểm tra xem danh sách tệp tin có chứa loại tệp tin khác không
    const containsOtherFileType = fileList.some(
      (file) =>
        !file.type.startsWith("image/") && !file.type.startsWith("video/")
    );
    if (containsOtherFileType) {
      message.error("Chỉ chấp nhận tệp ảnh và video!");
      return;
    }

    setFileList(fileList);
  };

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

  // Thông tin
  const items = [
    // {
    //   key: "1",
    //   label: "Hiển thị chính",
    //   children: (
    //     <div className="py-2">
    //       <div className="">
    //         <div className="flex gap-3">
    //           <div className="w-1/2">
    //             <p
    //               className="ant-upload-text"
    //               style={{ margin: "10px 0 10px 0" }}
    //             >
    //               Ảnh minh hoạ:
    //             </p>
    //             <Upload
    //               showUploadList={false}
    //               // beforeUpload={beforeUploadImage}
    //               accept="image/*"
    //               customRequest={({ file }) => {
    //                 const isImg = file.type.includes("image");
    //                 const formData = new FormData();
    //                 formData.append("file", file);
    //                 if (isImg) {
    //                   const fileReader = new FileReader();
    //                   fileReader.onload = (e) => {
    //                     setUrlImage(e.target.result);
    //                   };
    //                   fileReader.readAsDataURL(file);
    //                   uploadMutation.mutate(formData);
    //                 } else {
    //                   message.error("Sai định dạng ảnh");
    //                 }
    //               }}
    //             >
    //               <Button type="primary" icon={<UploadOutlined />}>
    //                 Chọn File
    //               </Button>
    //             </Upload>

    //             <div className="mt-3 flex justify-center flex-col items-center relative">
    //               {urlImage && (
    //                 <Image
    //                   src={urlImage}
    //                   alt="Uploaded Image"
    //                   className="flex justify-center items-center"
    //                   style={{ width: 300 }}
    //                 />
    //               )}
    //             </div>
    //           </div>
    //           <div className="w-1/2">
    //             <p
    //               className="ant-upload-text"
    //               style={{ margin: "10px 0 10px 0" }}
    //             >
    //               Video minh hoạ:
    //             </p>
    //             <Upload
    //               showUploadList={false}
    //               customRequest={({ file }) => {
    //                 const isVideo = file.type.startsWith("video/");
    //                 if (!isVideo) {
    //                   message.error("Sai định dạng video.");
    //                 } else {
    //                   const fileReader = new FileReader();
    //                   fileReader.onload = (e) => {
    //                     setFileUrl(e.target.result); // Lưu URL của file
    //                   };
    //                   fileReader.readAsDataURL(file); // Đọc file thành URL
    //                 }
    //                 const formData = new FormData();
    //                 formData.append("file", file);
    //                 uploadMutationVideo.mutate(formData);
    //               }}
    //             >
    //               <Button type="primary" icon={<UploadOutlined />}>
    //                 Chọn File
    //               </Button>
    //             </Upload>

    //             <div className="mt-3 flex justify-center flex-col items-center relative">
    //               {fileUrl && (
    //                 <video src={fileUrl} controls /> // Hiển thị video nếu là loại video
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      key: "1",
      label: "Thêm các video/ hình ảnh khác",
      children: (
        <div className="py-2">
          <div className="overflow-y-scroll max-h-[600px]">
            <CustomUpload
              listType="text"
              multiple
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
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
              <ButtonSystem icon={<UploadOutlined />}>Chọn File</ButtonSystem>
            </CustomUpload>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        open={isShowModalAddMedia}
        title={
          <div>
            {" "}
            Bổ sung hình ảnh/ video cho từ{" "}
            <span className="text-bold text-red-500">
              {recordMedia?.content}
            </span>
          </div>
        }
        onOk={handleOkWord}
        onCancel={() => {
          setIsShowAddMedia(false);
          onCloseAdd();
        }}
        footer={[
          <ButtonSystem
            key="back"
            onClick={() => {
              setIsShowAddMedia(false);
              onCloseAdd();
            }}
          >
            Hủy bỏ
          </ButtonSystem>,
          <ButtonSystem
            type="primary"
            loading={loading}
            disabled={!fileList?.length}
            onClick={() => {
              handleUpload();
            }}
          >
            Tải lên
          </ButtonSystem>,
        ]}
        destroyOnClose
        width={1000}
        centered
      >
        <CustomCollapse
          className="mt-6"
          defaultActiveKey={["1"]}
          items={items}
          bordered={false}
        />
      </Modal>
    </div>
  );
};

export default ModalAddMedia;
