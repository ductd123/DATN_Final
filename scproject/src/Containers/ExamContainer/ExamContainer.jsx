import React, { useEffect, useState } from "react";
import "./ExamCOntainer.scss";
import { useLocation } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";
import ExamBlankPage from "./ExamBlankPage";
import QuestionLayout from "./QuestionLayout";
import { listQuestions } from "./listQuestion";
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
const random = generateUniqueArray(10, 0, 19);

export default function ExamContainer({ takingExam, point, setPoint, indexx, setIndexx, showPointResult  }) {
    const location = useLocation();
    const pathName = location.pathname;
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
        let index = random[indexx];
        if (indexx > 9) {
            showPointResult();
        }
        else {
            let newAnswers = shuffleArray(listQuestions[index].answers);
            setQuestion({ ...listQuestions[index], answers: newAnswers });
        }
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
                        setIndexx={setIndexx}
                        indexx={indexx}
                        setPoint={setPoint}
                        point={point}
                        showPointResult={showPointResult}
                    />
                </div>
                :
                <ExamBlankPage />}
        </>
    );
}
