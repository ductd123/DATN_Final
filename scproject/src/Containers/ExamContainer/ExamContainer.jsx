import React, { useEffect, useState } from "react";
import "./ExamCOntainer.scss";
import { useLocation } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";
import ExamBlankPage from "./ExamBlankPage";
import QuestionLayout from "./QuestionLayout";
import { listQuestions } from "./listQuestion";

export default function ExamContainer({ src, type, answers, takingExam, onAnswerSelected }) {
    const location = useLocation();
    const pathName = location.pathname;
    const [indexx, setIndexx] = useState(2);
    const [q, setQuestion] = useState();

    const shuffleArray = (array) => {
        const shuffledArray = array.slice();

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }

        return shuffledArray;
    };

    useEffect(() => {
        let newAnswers = shuffleArray(listQuestions[indexx].answers);
        setQuestion({ ...listQuestions[indexx], answers: newAnswers });
    }, [indexx]);

    return (
        <>
            {takingExam ?
                <div className="question-layout">
                    <QuestionLayout
                        question={q.question}
                        type={q.type}
                        src={q.src}
                        answers={q.answers}
                    />
                </div>
                :
                <ExamBlankPage />}
        </>
    );
}
