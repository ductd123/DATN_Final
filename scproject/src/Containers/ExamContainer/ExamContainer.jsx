import React, { useState } from "react";
import "./ExamCOntainer.scss";
import { useLocation } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";
import ExamBlankPage from "./ExamBlankPage";
const questions = {
    id: '004',
    question: 'Đây là gì?',
    image: `https://picsum.photos/`,
    answers: [
        { value: 'a', check: true },
        { value: 'b', check: false },
        { value: 'c', check: false },
        { value: 'd', check: false },
    ],
    correctAnswerIndex: 1,
};

export default function ExamContainer({ question, image, video, answers, correctAnswerIndex, onAnswerSelected }) {
    const location = useLocation();
    const pathName = location.pathname;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [takingExam, setTakingExam] = useState(false);
    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
        //   onAnswerSelected(index === correctAnswerIndex);
    };
    const chooseOptions = () => {

    }
    return (
        // <div style={styles.questionContainer}>
        //     <h3>{question}</h3>
        //     {image && <img src={image} alt="Question" style={styles.media} />}
        //     {video && (
        //         <video controls width="100%" height="auto" style={styles.media}>
        //             <source src={video} type="video/mp4" />
        //             Your browser does not support the video tag.
        //         </video>
        //     )}
        //     <div>
        //         {answers.map((answer, index) => (
        //             <div key={index} style={styles.answerContainer}>
        //                 <input
        //                     type="radio"
        //                     id={`answer${index}`}
        //                     name="answers"
        //                     checked={selectedAnswer === index}
        //                     onChange={() => handleAnswerSelect(index)}
        //                 />
        //                 <label htmlFor={`answer${index}`} style={styles.answerLabel}>
        //                     {answer.value}
        //                 </label>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <>{takingExam ? <></> : <ExamBlankPage />}</>

    );
}
const styles = {
    questionContainer: {
        maxWidth: '600px',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    media: {
        maxWidth: '100%',
        height: 'auto',
        marginBottom: '10px',
    },
    answerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    answerLabel: {
        marginLeft: '8px',
    },
};
