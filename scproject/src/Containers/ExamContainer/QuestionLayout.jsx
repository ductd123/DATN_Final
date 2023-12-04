import React, { Fragment, useState } from "react";
import A from '../../assets/image/A.webp'
const QuestionLayout = ({ question, src, type, answers, handleAnswerSelect }) => {
    const [indexSelected, setIndexSelected] = useState();

    const handleChoose = (index) => {
        setIndexSelected(index);
    };

    const answerOptions = ({ answer, index }) => {
        const color1 =
            indexSelected !== index
                ? "rgb(0, 152, 253)"
                : answer.check
                    ? "green"
                    : "red";
        return (
            <div key={index} onClick={() => handleChoose(index)} className="answer-container" style={{ backgroundColor: color1 }}>
                <button disabled={indexSelected == undefined ? false : true} onClick={() => handleChoose(index)} style={styles.answerLabel}>
                    {answer.value}
                </button>
            </div>
        );
    };

    return (
        <Fragment>
            <span style={{ fontWeight: '500', fontSize: '32px', padding: "0 0 10px 20px", position: 'absolute' }}>Câu 1:</span>
            <div style={styles.questionContainer}>
                <span style={{ fontWeight: '600', fontSize: '28px' }}>{question}</span>
                {type === 1 ? (
                    <img src={src} alt="Lỗi" style={styles.media} />
                ) : (
                    <video controls width="100%" height="auto" style={styles.media}>
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                <div className="answer-box" style={{ width: '100%' }}>
                    {answers.map((answer, index) => answerOptions({ answer, index, key: index }))}

                </div>
            </div>
        </Fragment>
    );
};

const styles = {
    questionContainer: {
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    media: {
        height: '50vh',
        maxWidth: 'max-content',
        align: 'middle',
        marginBottom: '20px',
    },
    answerContainer: {},
    answerLabel: {
        marginLeft: '8px',
        width: '100%',
        height: '100%'
    },
};

export default QuestionLayout;
