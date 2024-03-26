import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ExamBlankPage from "./ExamBlankPage";
import "./ExamCOntainer.scss";
import QuestionLayout from "./QuestionLayout";
import QuestionList from "./QuestionList";

const { TabPane } = Tabs;
export default function ExamContainer({
  takingExam,
  point,
  setPoint,
  indexx,
  setIndexx,
  showPointResult,
  topicName,
  listQuestions,
}) {
  const [q, setQuestion] = useState();

  useEffect(() => {
    if (indexx > listQuestions?.length) {
      showPointResult();
    } else {
      if (listQuestions) {
        setQuestion(listQuestions[indexx]);
      }
    }
  }, [indexx, listQuestions]);

  return (
    <>
      {takingExam && q ? (
        <div className="w-full px-4">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Danh sách" key="1">
              <div className="text-xl font-bold text-center">
                Câu hỏi kiểm tra chủ đề: {topicName}
              </div>
              <QuestionList
                questions={listQuestions}
                setPoint={setPoint}
                point={point}
                showPointResult={showPointResult}
              />
            </TabPane>
            <TabPane tab="Quiz" key="2">
              <div className="text-xl font-bold text-center">
                Câu hỏi kiểm tra chủ đề: {topicName}
              </div>
              <div className="question-layout">
                <QuestionLayout
                  question={q}
                  answers={q?.answerResList}
                  id={q.topicId}
                  setIndexx={setIndexx}
                  indexx={indexx}
                  setPoint={setPoint}
                  point={point}
                  showPointResult={showPointResult}
                  maxLength={listQuestions?.length}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      ) : (
        <ExamBlankPage />
      )}
    </>
  );
}
