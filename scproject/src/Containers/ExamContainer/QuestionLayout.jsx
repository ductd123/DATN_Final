import React, { Fragment, useEffect, useRef, useState } from "react";
import A from '../../assets/image/A.webp'
const QuestionLayout = ({ question, src, type, answers, indexx, setIndexx, point, setPoint, showPointResult, id }) => {
    const [indexSelected, setIndexSelected] = useState();
    const videoRef = useRef(null);

    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };
    const handleChoose = (index, check) => {
        stopVideo();
        setIndexSelected(index);
        if (check) {
            setPoint(point + 1)
    }
        setTimeout(() => {
            if (indexx < 9) {
                setIndexx(indexx + 1);
                setIndexSelected();
            }
            else {
                showPointResult();
            }
        }, 2000);
    };

    const answerOptions = ({ answer, index }) => {
        const color1 =
            indexSelected !== index
                ? "rgb(0, 152, 253)"
                : answer.check
                    ? "#53d100"
                    : "red";
        return (
            <div key={index} className="answer-container" style={{ backgroundColor: color1 }}>
                <button disabled={indexSelected == undefined ? false : true} onClick={() => handleChoose(index, answer.check)} style={styles.answerLabel}>
                    {answer.value}
                </button>
            </div>
        );
    };

    return (
        <Fragment>
            <span className="question-number">Câu {indexx + 1}/10 </span>
            <div style={styles.questionContainer}>
                <span className="question-title">{question}</span>
                {type === 1 ? (
                    <img src={src} alt="Lỗi" style={styles.media} />
                ) : (
                    <video key={id} ref={videoRef} loop playsinline controls width="100%" height="auto" style={styles.media}>
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                <div className="answer-box" style={{ width: '100%', }}>
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
        justifyContent: 'space-between'
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
