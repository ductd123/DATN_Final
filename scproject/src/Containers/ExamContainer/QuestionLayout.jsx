import { Modal } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";

const QuestionLayout = ({
  question,
  answers,
  indexx,
  setIndexx,
  point,
  setPoint,
  showPointResult,
  maxLength,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const correctAnswersCount = answers.filter((answer) => answer.correct).length;

  const videoRef = useRef(null);

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    setSelectedAnswers([]);
  }, [indexx]); // Reset khi chuyển câu hỏi

  useEffect(() => {
    if (selectedAnswers?.length === correctAnswersCount) {
      setTimeout(() => {
        if (indexx < maxLength - 1) {
          setIndexx((prev) => prev + 1);
        } else {
          showPointResult();
        }
      }, 1500);
    }
  }, [selectedAnswers]);

  const handleChoose = (index, check) => {
    stopVideo();

    const updatedSelectedAnswers = [...selectedAnswers];

    const answerIndex = updatedSelectedAnswers.indexOf(index);
    if (answerIndex !== -1) {
      // Nếu câu trả lời đã được chọn trước đó, hủy chọn
      updatedSelectedAnswers.splice(answerIndex, 1);
    } else {
      // Ngược lại, thêm vào danh sách câu trả lời đã chọn
      updatedSelectedAnswers.push(index);
    }
    if (check && correctAnswersCount === 1) {
      setPoint(point + 1);
    }
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const answerOptions = ({ answer, index }) => {
    let color1 = "";
    const isAnswerSelected = selectedAnswers.includes(index);
    const isCorrectAnswer = answer.correct;

    if (isAnswerSelected) {
      color1 = isCorrectAnswer ? "#53d100" : "#fdd340";
    } else {
      color1 = "rgb(0, 152, 253)";
    }

    return (
      <div
        key={index}
        className="answer-container"
        style={{ backgroundColor: color1 }}
      >
        <button
          disabled={isAnswerSelected && !isCorrectAnswer}
          onClick={() => handleChoose(index, isCorrectAnswer)}
          style={styles.answerLabel}
        >
          {answer?.content}
        </button>
      </div>
    );
  };

  return (
    <Fragment>
      <span className="question-number">
        Câu {indexx + 1}/{maxLength}
      </span>
      <div className="relative" style={styles.questionContainer}>
        <span className="text-[16px] font-normal absolute top-0 left-0 bg-white">
          {correctAnswersCount > 1 &&
            `Câu hỏi nhiều đáp án (${correctAnswersCount} đáp án )`}
        </span>
        <span className="question-title">{question.content} </span>
        {question.imageLocation ? (
          <img
            src={question.imageLocation}
            alt="Lỗi"
            style={{ width: "900px" }}
          />
        ) : (
          <video
            ref={videoRef}
            loop
            playsInline
            controls
            width="100%"
            height="auto"
            style={styles.media}
          >
            <source src={question.videoLocation} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="answer-box" style={{ width: "100%" }}>
          {answers?.map((answer, index) =>
            answerOptions({ answer, index, key: index })
          )}
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  questionContainer: {
    height: "100%",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    height: "50vh",
    maxWidth: "max-content",
    align: "middle",
    marginBottom: "20px",
  },
  answerContainer: {},
  answerLabel: {
    marginLeft: "8px",
    width: "100%",
    height: "100%",
  },
};

export default QuestionLayout;
