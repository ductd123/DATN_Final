import React, { useState } from "react";
import { Row, Col, Button, Radio, Checkbox } from "antd";
import ButtonSystem from "../../Component/button/ButtonSystem";

const QuestionList = ({ questions, setPoint, point }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [pointQuestions, setPointQuestions] = useState(0);
  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: value,
    });
    setShowResult(false);
  };

  const handleSubmit = () => {
    setShowResult(!showResult); // Hiển thị kết quả

    // Kiểm tra kết quả đúng/sai và tính điểm
    const newPoint = questions?.reduce((acc, question) => {
      const selectedAnswerIds = selectedAnswers[question.questionId];

      // Kiểm tra selectedAnswerIds và correctAnswers
      if (selectedAnswerIds) {
        const correctAnswers = question.answerResList
          ?.filter((answer) => answer.correct)
          ?.map((answer) => answer.answerId);

        // Kiểm tra correctAnswers để tránh trường hợp không có câu trả lời đúng
        if (correctAnswers.length > 0) {
          let isCorrect = false;

          if (Array.isArray(selectedAnswerIds)) {
            // Trường hợp Checkbox
            isCorrect = correctAnswers.every((id) =>
              selectedAnswerIds.includes(id)
            );
          } else {
            // Trường hợp Radio
            isCorrect = correctAnswers.includes(selectedAnswerIds);
          }

          if (isCorrect) {
            return acc + 1; // Tăng điểm nếu câu trả lời đúng
          }
        }
      }
      return acc;
    }, 0);
    setPointQuestions(newPoint);
  };

  return (
    <div className="mt-6 px-4">
      <Row gutter={[16, 16]}>
        {questions?.map((question, index) => (
          <Col
            key={question.questionId}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
            <div>
              <p>
                Câu {index + 1}: {question.content} ?
              </p>
              {question.imageLocation && (
                <img
                  src={question.imageLocation}
                  alt="Question"
                  className="w-full"
                />
              )}
              {question.videoLocation && (
                <video controls>
                  <source src={question.videoLocation} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {/* Kiểm tra số lượng đáp án đúng */}
              {question.answerResList?.filter((answer) => answer.correct)
                .length === 1 ? (
                <Radio.Group
                  onChange={(e) =>
                    handleAnswerChange(question.questionId, e.target.value)
                  }
                  value={selectedAnswers[question.questionId]}
                >
                  {question.answerResList?.map((answer) => (
                    <Radio key={answer.answerId} value={answer.answerId}>
                      {answer.content}
                    </Radio>
                  ))}
                </Radio.Group>
              ) : (
                <Checkbox.Group
                  onChange={(checkedValues) =>
                    handleAnswerChange(question.questionId, checkedValues)
                  }
                  value={selectedAnswers[question.questionId]}
                >
                  {question.answerResList?.map((answer) => (
                    <Checkbox key={answer.answerId} value={answer.answerId}>
                      {answer.content}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <div className="flex justify-center w-full">
        <ButtonSystem
          className="mt-4 text-center"
          type="primary"
          onClick={handleSubmit}
        >
          Kiểm tra kết quả
        </ButtonSystem>
      </div>

      {showResult && (
        <div>
          <h3>Kết quả kiểm tra:</h3>
          <ul>
            {questions?.map((question, index) => {
              let isCorrect = false;

              if (Array.isArray(selectedAnswers[question.questionId])) {
                // Trường hợp Checkbox
                const selectedIds = selectedAnswers[question.questionId];
                const correctIds = question.answerResList
                  ?.filter((answer) => answer.correct)
                  ?.map((answer) => answer.answerId);
                isCorrect = correctIds.every((id) => selectedIds.includes(id));
              } else {
                // Trường hợp Radio
                const selectedId = selectedAnswers[question.questionId];
                isCorrect = question.answerResList?.some(
                  (answer) => answer.answerId === selectedId && answer.correct
                );
              }

              return (
                <li key={question.questionId}>
                  Câu {index + 1}: {isCorrect ? "Đúng" : "Sai"}
                </li>
              );
            })}
          </ul>
          <p>
            Điểm cuối cùng: {pointQuestions}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
