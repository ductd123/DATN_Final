import { useState, useEffect } from "react";
import { Button, HeaderBar, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Space } from "antd";
import { FrownOutlined, FrownTwoTone, LoadingOutlined, MehOutlined, MehTwoTone, SmileOutlined, SmileTwoTone } from "@ant-design/icons";
import './ExamLayout.scss';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';



const Examlayout = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [takingExam, setTakingExam] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [confirmExamStarted, setConfirmExamStarted] = useState(false);
    const [point, setPoint] = useState(0);
    const [indexx, setIndexx] = useState(0);
    const [showPoint, setshowPoint] = useState(false);
    const [confirmExam, setConfirmExam] = useState(false);
    useEffect(() => {
        if (confirmExamStarted && countdown < 1) {
            onConfirmExam();
        }

        if (confirmExamStarted && countdown > 0) {
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
            }, countdown * 1000);

            return () => clearInterval(intervalId);
        }

    }, [countdown, confirmExamStarted]);

    const startCountdown = () => {
        if (countdown > 0) {
            setConfirmExamStarted(true);
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
            }, countdown * 1000);
        }
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
        setPoint(0);

    }
    const showPointResult = () => {
        setshowPoint(true);
    }
    const confirmPoint = () => {
        setshowPoint(false);
        setTakingExam(false);
        setIndexx(0);
        setConfirmExamStarted(false);
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
                    takingExam={takingExam}
                    point={point}
                    setPoint={setPoint}
                    indexx={indexx}
                    setIndexx={setIndexx}
                    showPointResult={showPointResult}
                />
                <Modal
                    open={confirmExam}
                    footer={[]}
                    onCancel={cancleStudy}
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
                <Modal
                    open={showPoint}
                    footer={[<Button onClick={confirmPoint}>
                        Đóng
                    </Button>,]}
                    // onCancel={cancleStudy}
                    closeIcon={false}
                    style={{top:'10vh'}}
                >
                    <div className="modal-content">
                        <p className="ant-upload-text flex-center" style={{ fontSize: '32px', fontWeight: 500, color: '#1677ff' }}>
                            Kết quả
                        </p>
                        <div className="ant-upload-text" style={{ margin: '40px 0', fontSize: '60px', fontWeight: 600 }}>

                            {point > 3 ? point > 7 ?
                                <SmileOutlined style={{ fontSize: '140px', color:"#53d100" }} />
                                :
                                <MehOutlined style={{ fontSize: '140px', color:"orange" }} />
                                :
                                <FrownOutlined style={{ fontSize: '140px', color:"red" }} />
                            }
                            <div style={{ width: '100%' }} >
                                <p className="flex-center" style={{ justifyContent: 'center', color: '#1677ff' }}>{point}/10</p>
                            </div>
                            <div style={{ width: '100%' }} >
                                <p className="flex-center" style={{ justifyContent: 'center', fontSize: '32px', color: '#1677ff' }}>
                                    {point > 3 ? point > 7 ?
                                        "Cố gắng phát huy."
                                        :
                                        "Lần tới sẽ tốt hơn thôi!!!"
                                        :
                                        "Cần cố gắng hơn."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;