import {
  FrownOutlined,
  LoadingOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Button, HeaderBar, MenuTakingExam, Nav } from "../../Component";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import ExamBlankPage from "../../Containers/ExamContainer/ExamBlankPage";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { apiLearning, apiQuestions } from "../../Services/apiLearning";
import "./ExamLayout.scss";
import ButtonSystem from "../../Component/button/ButtonSystem";

const generateUniqueArray = (length, min, max) => {
  const uniqueArray = [];
  while (uniqueArray.length < length) {
    const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
    if (isUnique(uniqueArray, randomValue)) {
      uniqueArray.push(randomValue);
    }
  }
  return uniqueArray;
};
const isUnique = (arr, value) => arr.indexOf(value) === -1;

const Examlayout = () => {
  const [takingExam, setTakingExam] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [listQuestions, setListQuestions] = useState();
  const [confirmExamStarted, setConfirmExamStarted] = useState(false);
  const [point, setPoint] = useState(0);
  const [topicChose, setTopicChose] = useState();

  const [topicInit, setTopicInit] = useState([]);
  const [indexx, setIndexx] = useState(0);
  const [showPoint, setshowPoint] = useState(false);
  const [showSelectTopic, setShowSelectTopic] = useState(false);
  const [confirmExam, setConfirmExam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [valueQuestionForm, setValueQuestionForm] = useState(-1);
  const [sizeQuestion, setSizeQuestion] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  // Lấy số lượng câu hỏi
  const {
    data: maxQuestion,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getListQuestions", topicChose],
    queryFn: async () => {
      let res;
      if (valueQuestionForm === 1) {
        res = await apiQuestions.getLimitQuestions({
          page: 1,
          size: sizeQuestion,
          topicId: topicChose,
        });
      } else {
        res = await apiQuestions.getListQuestions(topicChose);
      }
      if (!res.data) {
        message.warning(`Chủ để ${topicName} không có câu hỏi nào`);
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
        setListQuestions(res.data);
        setNumberQuestion(res.data?.length);
      }
      return res.data;
    },
    enabled: !!topicChose,
  });

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        setLoading(false);
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
      } catch (error) {
        setLoading(false);
        message.error("Kết nối không ổn định, vui lòng thử lại.");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (confirmExamStarted && countdown < 1) {
      onConfirmExam();
    }

    if (confirmExamStarted && countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
      }, countdown * 1000);

      return () => clearInterval(intervalId);
    }
  }, [countdown, confirmExamStarted]);

  const startCountdown = () => {
    if (countdown > 0) {
      setConfirmExamStarted(true);
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
      }, countdown * 1000);
    }
  };

  const openConfirmExam = () => {
    refetch();
    setConfirmExam(true);
    setCountdown(3);
    setTakingExam(false);
    startCountdown();
    setIndexx(0);
    setTopicChose(null);
    setValueQuestionForm(null);
    setSizeQuestion(null);
  };

  const onConfirmExam = () => {
    setConfirmExam(false);
    setTakingExam(true);
    setPoint(0);
  };

  const showPointResult = () => {
    setshowPoint(true);
  };

  const handleChoseTopic = (e) => {
    setTopicChose(e);
  };

  const confirmPoint = () => {
    setshowPoint(false);
    setTakingExam(false);
    setIndexx(0);
    setConfirmExamStarted(false);
    setCountdown(3);
  };

  const cancleStudy = () => {
    setConfirmExam(false);
    setCountdown(3);
    setConfirmExamStarted(false);
  };

  const handleStartTopicExam = async () => {
    setShowSelectTopic(false);

    // try {
    //   setLoading(false);
    //   const response = await apiLearning.getTopic();
    //   const items = [];
    //   response.data.forEach((element, index) => {
    //     items.push({
    //       id: element.topicId,
    //       value: element.topicId,
    //       label: element.content,
    //     });
    //   });
    //   setTopicInit(items);
    // } catch (error) {
    //   setLoading(false);
    //   message.error("Kết nối không ổn định, vui lòng thử lại.");
    // }
    openConfirmExam();
  };

  // Tính toán số câu đúng
  const calculateRating = () => {
    const correctPercentage = (point / numberQuestion) * 100;

    if (correctPercentage >= 70) {
      return <SmileOutlined style={{ fontSize: "140px", color: "#53d100" }} />;
    } else if (correctPercentage >= 40 && correctPercentage < 70) {
      return <MehOutlined style={{ fontSize: "140px", color: "orange" }} />;
    } else {
      return <FrownOutlined style={{ fontSize: "140px", color: "red" }} />;
    }
  };

  const renderRatingName = () => {
    const correctPercentage = (point / numberQuestion) * 100;

    if (correctPercentage >= 70) {
      return "Cố gắng phát huy.";
    } else if (correctPercentage >= 40 && correctPercentage < 70) {
      return "Cần cố gắng hơn.";
    } else {
      return "Lần tới sẽ tốt hơn thôi!!!";
    }
  };

  return (
    <div className="main-layout">
      <LoadingComponent loading={loading} />
      <Nav />
      <div className="main-layout__container">
        <div className="main-layout__side-bar">
          <div className="main-layout__header-bar">
            <HeaderBar disableSearch={true} />
          </div>
          <div className="main-layout__content">
            <MenuTakingExam
              takingExam={takingExam}
              setTakingExam={setTakingExam}
              openConfirmExam={openConfirmExam}
              setShowSelectTopic={setShowSelectTopic}
            />
          </div>
        </div>
        <div className="w-full py-4">
          {takingExam ? (
            <ExamContainer
              takingExam={takingExam}
              point={point}
              setPoint={setPoint}
              indexx={indexx}
              setIndexx={setIndexx}
              showPointResult={showPointResult}
              topicChose={topicChose}
              topicName={topicName}
              setNumberQuestion={setNumberQuestion}
              countdown={countdown}
              listQuestions={listQuestions}
              sizeQuestion={sizeQuestion}
              valueQuestionForm={valueQuestionForm}
              showSelectTopic={showSelectTopic}
            />
          ) : (
            <ExamBlankPage />
          )}

          <Modal
            open={confirmExam}
            footer={[]}
            onCancel={cancleStudy}
            closeIcon={false}
          >
            <div className="modal-content">
              <p
                className="ant-upload-text flex-center"
                style={{ fontSize: "24px", fontWeight: 500, color: "#1677ff" }}
              >
                Bài kiểm tra sẽ bắt đầu sau:
              </p>
              <div
                className="ant-upload-text flex-center"
                style={{ margin: "40px 0", fontSize: "60px", fontWeight: 600 }}
              >
                <LoadingOutlined
                  style={{ fontSize: "140px", color: "#1677ff" }}
                />
                <div style={{ position: "absolute", width: "140px" }}>
                  <p
                    className="flex-center"
                    style={{ justifyContent: "center", color: "#1677ff" }}
                  >
                    {countdown}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={showPoint}
            footer={[
              <Button type="primary" onClick={confirmPoint}>
                Đóng
              </Button>,
            ]}
            // onCancel={cancleStudy}
            closeIcon={false}
            style={{ top: "10vh" }}
          >
            <div className="modal-content">
              <p
                className="ant-upload-text flex-center"
                style={{ fontSize: "32px", fontWeight: 500, color: "#1677ff" }}
              >
                Kết quả
              </p>
              <div
                className="ant-upload-text"
                style={{ margin: "40px 0", fontSize: "60px", fontWeight: 600 }}
              >
                {calculateRating()}
                <div style={{ width: "100%" }}>
                  <p
                    className="flex-center"
                    style={{ justifyContent: "center", color: "#1677ff" }}
                  >
                    {point}/{numberQuestion}
                  </p>
                </div>
                <div style={{ width: "100%" }}>
                  <p
                    className="flex-center"
                    style={{
                      justifyContent: "center",
                      fontSize: "32px",
                      color: "#1677ff",
                    }}
                  >
                    {renderRatingName()}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={showSelectTopic}
            title="Chọn chủ đề kiểm tra"
            onOk={handleStartTopicExam}
            onCancel={() => {
              setShowSelectTopic(false);
              setTopicChose(null);
              setValueQuestionForm(null);
              setSizeQuestion(null);
            }}
            okText="Đồng ý"
            cancelText="Đóng"
            footer={
              <dic className="flex items-center gap-1 justify-end">
                <ButtonSystem
                  onClick={() => {
                    setShowSelectTopic(false);
                    setTopicChose(null);
                    setValueQuestionForm(null);
                    setSizeQuestion(null);
                  }}
                >
                  Đóng
                </ButtonSystem>
                <ButtonSystem
                  type="primary"
                  disabled={isDisabled}
                  onClick={handleStartTopicExam}
                >
                  Đồng ý
                </ButtonSystem>
              </dic>
            }
            destroyOnClose
          >
            <div className="text-sm">Chủ đề</div>
            <Select
              style={{ width: "100%", marginTop: "20px", margin: 0 }}
              options={topicInit}
              loading={isFetching}
              placeholder="Chọn chủ đề muốn kiểm tra"
              onChange={(e, option) => {
                handleChoseTopic(e);
                setTopicName(option.label);
                setSizeQuestion(null);
              }}
            />
            <div className="">Hình thức tạo câu hỏi</div>
            <Select
              allowClear
              style={{ width: "100%", marginTop: "20px", margin: 0 }}
              value={valueQuestionForm}
              options={[
                {
                  label: "Toàn bộ",
                  value: -1,
                },
                {
                  label: "Ngẫu nhiên",
                  value: 1,
                },
              ]}
              placeholder="Hình thức tạo câu hỏi"
              onChange={(e, option) => {
                setValueQuestionForm(e);
              }}
            />
            {valueQuestionForm === 1 && (
              <>
                <div className="">Số lượng câu hỏi</div>
                <Select
                  allowClear
                  style={{ width: "100%", marginTop: "20px", margin: 0 }}
                  value={sizeQuestion}
                  options={[
                    {
                      label: "10 câu",
                      value: 10,
                    },
                    {
                      label: "20 câu",
                      value: 20,
                    },
                    {
                      label: "30 câu",
                      value: 30,
                    },
                    {
                      label: "40 câu",
                      value: 40,
                    },
                    {
                      label: "50 câu",
                      value: 50,
                    },
                    {
                      label: "100 câu",
                      value: 100,
                    },
                  ]}
                  placeholder="Chọn số lượng câu hỏi"
                  onChange={(e, option) => {
                    setSizeQuestion(e);
                  }}
                />
                <div className="text-sm text-red-500">
                  {maxQuestion &&
                    maxQuestion.length < sizeQuestion &&
                    `Số lượng câu hỏi vượt quá câu hỏi theo chủ để ( chủ đề có ${maxQuestion.length} câu)`}
                </div>
              </>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Examlayout;
