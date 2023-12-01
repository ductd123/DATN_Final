import React, { useState } from "react";
import "./ExamCOntainer.scss";
import { useLocation } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";
import ExamBlankPage from "./ExamBlankPage";
import { Button, Modal, Radio, Space } from "antd";
const questions = [{
    id: '004',
    question: 'Đây là gì?',
    image: `https://picsum.photos/204`,
    answers: [
        { value: 'a', check: true },
        { value: 'b', check: false },
        { value: 'c', check: false },
        { value: 'd', check: false },
    ],
    type: 0,
    correctAnswerIndex: 1,
},
{
    id: '005',
    question: 'Đây là gì?',
    image: `https://picsum.photos/205`,
    answers: [
        { value: 'a', check: true },
        { value: 'b', check: false },
        { value: 'c', check: false },
        { value: 'd', check: false },
    ],
    type: 0,
    correctAnswerIndex: 1,
},
{
    id: '006',
    question: 'Đây là gì?',
    image: `https://picsum.photos/206`,
    answers: [
        { value: 'a', check: true },
        { value: 'b', check: false },
        { value: 'c', check: false },
        { value: 'd', check: false },
    ],
    type: 0,
    correctAnswerIndex: 1,
}];
const BangChuCai = ['A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'];
const BangChuSo = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const dau = ['Dấu sắc', 'Dấu huyền', 'Dấu hỏi', 'Dấu Ngã', 'Dấu nặng'];

export default function ExamContainer({ confirmExam1, confirmExam2, cancleExam, onChangeRadio, onConfirmExam1, onConfirmExam2, value, listQuestion, takingExam, valueOption }) {
    const location = useLocation();
    const pathName = location.pathname;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [contentExam, setContentExam] = useState();
    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
        //   onAnswerSelected(index === correctAnswerIndex);
    };

    const handleClickOptions = (item) => {
        setContentExam(item);
        onConfirmExam1();
    }
    const chooseOptions = () => {

    }
    return (

        <>
            {takingExam ? (
                <>
                    {questions.map((question, index) => (
                        <div key={index} style={styles.questionContainer}>
                            <h3>{question.question}</h3>
                            {!question.type && (
                                <img src={question.image} alt="Question" style={styles.media} />
                            )}
                            {question.type && (
                                <video
                                    controls
                                    width="100%"
                                    height="auto"
                                    style={styles.media}
                                >
                                    <source src={question.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <div>
                                {question.answers.map((answer, ansIndex) => (
                                    <div key={ansIndex} style={styles.answerContainer}>
                                        <input
                                            type="radio"
                                            id={`answer${ansIndex}`}
                                            name="answers"
                                            checked={selectedAnswer === ansIndex}
                                            onChange={() => handleAnswerSelect(ansIndex)}
                                        />
                                        <label htmlFor={`answer${ansIndex}`} style={styles.answerLabel}>
                                            {answer.value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <ExamBlankPage />
            )}
            <Modal
                open={confirmExam1}
                footer={[]}
                onCancel={cancleExam}
            >
                {valueOption.map((item, index) => {
                    return (
                        <Button key={index} style={{ minWidth: '45px' }} onClick={() => handleClickOptions(item)}>{item}</Button>
                    )
                })}
            </Modal>
            <Modal
                open={confirmExam2}
                footer={[
                    <Button key="back" onClick={cancleExam}>
                        Hủy bỏ
                    </Button>,
                    <Button
                        type="primary"
                        onClick={onConfirmExam2}
                    >
                        Bắt đầu thi
                    </Button>,
                ]}
                onCancel={cancleExam}
                onOk={onConfirmExam2}
                title="Lựa chọn mức độ câu hỏi"
            >
                <p className="ant-upload-text" style={{ margin: '25px 0 10px 0', fontSize: '16px', fontWeight: 500 }}>Bạn sẽ trả lời liên tục 10 câu hỏi liên quan đến chủ đề đã chọn với mức độ :</p>
                <Radio.Group onChange={onChangeRadio} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>Dễ</Radio>
                        <Radio value={2}>Trung bình</Radio>
                        <Radio value={3}>Khó</Radio>
                        <Radio value={4}>Từ dễ đến khó</Radio>
                    </Space>
                </Radio.Group>
            </Modal>

        </>

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
