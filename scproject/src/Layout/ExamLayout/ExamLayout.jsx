import { useState, useEffect } from "react";
import { Button, HeaderBar, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import './ExamLayout.scss';
const Examlayout = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [takingExam, setTakingExam] = useState(false);
    const [countdown, setCountdown] = useState(3);
    useEffect(() => {
        if (countdown === 0) {
            onConfirmExam();
        }

        if (countdown > 0) {
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
            }, countdown * 1000);

            return () => clearInterval(intervalId);
        }
    }, [countdown]);
    const startCountdown = () => {
        if (countdown > 0) {
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
            }, countdown * 1000);
        }
    };

    const [confirmExam, setConfirmExam] = useState(false);
    const handleAnswerSelected = (index, isCorrect) => {
        console.log(`Answer ${index + 1} selected. Correct: ${isCorrect}`);
        setSelectedAnswers([...selectedAnswers, { index, isCorrect }]);
    };

    const openConfirmExam = () => {
        setConfirmExam(true);
        setCountdown(3);
        setTakingExam(false);
        startCountdown();
    }
    const onConfirmExam = () => {
        setConfirmExam(false);
        setTakingExam(true);
    }
    const cancleStudy = () => {
        setConfirmExam(false)
        setCountdown(3);
    }
    return (<div className="main-layout">
        <Nav />
        <div className="main-layout__container">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar />
                </div>
                <div className="main-layout__content">
                    <MenuTakingExam takingExam={takingExam} openConfirmExam={openConfirmExam} />
                </div>
            </div>
            <div className="main-layout__children flex-center" >
                <ExamContainer
                    onAnswerSelected={(isCorrect) => handleAnswerSelected(1, isCorrect)}
                    takingExam={takingExam}
                />
                <Modal
                    open={confirmExam}
                    footer={[]}
                    onCancel={cancleStudy}
                    onOk={onConfirmExam}
                    closeIcon={false}

                >
                    <div className="modal-content">
                        <p className="ant-upload-text flex-center" style={{ fontSize: '24px', fontWeight: 500, color: '#1677ff' }}>
                            Bài thi sẽ bắt đầu sau:
                        </p>
                        <div className="ant-upload-text flex-center" style={{ margin: '40px 0', fontSize: '60px', fontWeight: 600 }}>
                            <LoadingOutlined style={{ fontSize: '140px', color: '#1677ff' }} />
                            <div style={{ position: 'absolute', width: '140px' }} >
                                <p className="flex-center" style={{ justifyContent: 'center', color: '#1677ff' }}>{countdown}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;