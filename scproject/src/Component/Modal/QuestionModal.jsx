import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect } from "react";
import ButtonSystem from "../button/ButtonSystem";
import { apiLearning } from "../../Services/apiLearning";
import { useQuery } from "@tanstack/react-query";

const { TextArea } = Input;

const PAGE_SIZE = 6;

// Danh sách các đuôi file ảnh
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

// Hàm kiểm tra đuôi file có thuộc danh sách ảnh hay không
export function isImageLocation(url) {
  for (let ext of imageExtensions) {
    if (url?.toLowerCase().endsWith(ext)) {
      return true;
    }
  }
  return false;
}

const QuestionModal = (props) => {
  const {
    openChooseVideo,
    setOpenChooseVideo,
    currentPage,
    locationUrl,
    setLocationUrl,
    onChange,
    contentQuestion,
    showCreateQuestions,
    topicChose,
    setshowCreateQuestions,
    valueChecked,
    valueText,
    setValueText,
    topicInit,
    setTopicChose,
    setContentQuestion,
    setCurrentPage,
    onCloseAdd,
    setLoading,
  } = props;

  // APi lấy danh sách
  const { data: listVideoAndImage } = useQuery({
    queryKey: ["listVideo", topicChose],
    queryFn: async () => {
      const res = await apiLearning.getTuDien(topicChose);
      return res.data;
    },
    enabled: !!topicChose,
  });

  // Làm dữ liệu hiển thị
  const flattenedData = listVideoAndImage?.flatMap((item) => {
    const locations = [];
    if (item.imageLocation) {
      locations.push({
        type: 1,
        location: item.imageLocation,
        content: item.content,
      });
    }
    if (item.videoLocation) {
      locations.push({
        type: 2,
        location: item.videoLocation,
        content: item.content,
      });
    }
    return locations;
  });

  // CHia page
  useEffect(() => {
    const totalPages =
      flattenedData?.length > PAGE_SIZE
        ? Math.ceil(flattenedData?.length / PAGE_SIZE)
        : 1;
    setCurrentPage(Math.min(currentPage, totalPages));
  }, [flattenedData, currentPage]);

  const handleCreateQuestion = async () => {
    setLoading(true);
    const data = {
      content: contentQuestion,
      explanation: "",
      imageLocation: isImageLocation(locationUrl) ? locationUrl : "",
      videoLocation: !isImageLocation(locationUrl) ? locationUrl : "",
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
    const res = await apiLearning.addQuestion(data);
    if (res.code === 200) {
      setLoading(false);
      setshowCreateQuestions(false);
      onCloseAdd();
      message.success(`Tạo câu hỏi thành công.`);
    } else {
      setLoading(false);
      setshowCreateQuestions(false);
      message.error("Tạo câu hỏi thất bại. Vui lòng thử lại!!!");
    }
  };

  return (
    <>
      {/* Modal hiển thị thư viện ảnh/video theo chủ đề */}
      <Modal
        open={openChooseVideo}
        onCancel={() => {
          setOpenChooseVideo(false);
          setshowCreateQuestions(true);
        }}
        width={1200}
        title="Chọn hình ảnh/video theo chủ đề"
        centered
        onOk={() => {
          setOpenChooseVideo(false);
          setshowCreateQuestions(true);
        }}
        zIndex={11}
        destroyOnClose
      >
        <div className="">
          {flattenedData?.length ? (
            <Radio.Group
              className="grid grid-cols-3 gap-3 "
              value={locationUrl}
              onChange={(e) => {
                setLocationUrl(e.target.value);
              }}
            >
              {flattenedData
                ?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                ?.map((item, i) => (
                  <Radio key={i} value={item.location} className="">
                    <div key={i}>
                      {item.type === 1 && (
                        <div className="w-full">
                          <div className="text-xl font-semibold">
                            {item.content}
                          </div>
                          <img
                            src={item.location}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                      {item.type === 2 && (
                        <div className="">
                          <div className="text-xl font-semibold">
                            {item.content}
                          </div>
                          <video controls>
                            <source src={item.location} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  </Radio>
                ))}
            </Radio.Group>
          ) : (
            <Empty
              style={{ width: "100%" }}
              description={`Không có dữ liệu `}
            />
          )}
        </div>
        {flattenedData?.length > PAGE_SIZE && (
          <div className="flex justify-center w-full mt-4">
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={flattenedData?.length}
              onChange={(pageNumber) => setCurrentPage(pageNumber)}
              showSizeChanger={false}
            />
          </div>
        )}
      </Modal>

      <Modal
        open={showCreateQuestions}
        title="Tạo câu hỏi kiểm tra"
        onOk={handleCreateQuestion}
        onCancel={onCloseAdd}
        onClose={onCloseAdd}
        footer={
          <div className="flex items-center justify-center gap-2 mt-2">
            <ButtonSystem onClick={onCloseAdd}>Huỷ bỏ</ButtonSystem>
            <ButtonSystem
              onClick={handleCreateQuestion}
              type="primary"
              disabled={topicChose ? false : true}
            >
              Tải lên
            </ButtonSystem>
          </div>
        }
        style={{ top: 20 }}
        className="radio-create-question"
        destroyOnClose
        zIndex={10}
      >
        <p
          className="ant-upload-text"
          style={{ margin: "10px 0", fontWeight: "500" }}
        >
          Chủ đề liên quan:
        </p>
        <Select
          style={{ width: "100%" }}
          options={topicInit}
          value={topicChose}
          placeholder="Chọn chủ đề"
          onChange={(e) => {
            setTopicChose(e);
          }}
        />

        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => {
            if (topicChose) {
              setshowCreateQuestions(false);
              setOpenChooseVideo(true);
            } else {
              message.warning("Vui lòng chọn chủ đề trước");
            }
          }}
        >
          Chọn File
        </Button>
        {isImageLocation(locationUrl) && (
          <div className="w-full">
            <img
              src={locationUrl}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        {locationUrl !== "" && !isImageLocation(locationUrl) && (
          <div className="">
            <video controls>
              <source src={locationUrl} type="video/mp4" />
            </video>
          </div>
        )}

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
      </Modal>
    </>
  );
};

export default QuestionModal;
