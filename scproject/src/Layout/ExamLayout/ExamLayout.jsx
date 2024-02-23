import { useState, useEffect } from "react";
import { Button, HeaderBar, Input, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Select, Space, message } from "antd";
import { FrownOutlined, LoadingOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import './ExamLayout.scss';
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";
import { apiLearning } from "../../Services/apiLearning";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import { listQuestion } from "../../Containers/ExamContainer/listQuestion";

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

const Examlayout = () => {
    const [takingExam, setTakingExam] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [listQuestions, setListQuestions]= useState(listQuestion)
    const [confirmExamStarted, setConfirmExamStarted] = useState(false);
    const [point, setPoint] = useState(0);
    const [topicChose, setTopicChose] = useState();
    const [random, setRandom] = useState(generateUniqueArray(10, 0, listQuestions.length - 1));
    const [topicInit, setTopicInit] = useState([]);
    const [indexx, setIndexx] = useState(0);
    const [showPoint, setshowPoint] = useState(false);
    const [showSelectTopic, setShowSelectTopic] = useState(false);
    const [confirmExam, setConfirmExam] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        console.log(random);
        async function fetchData() {
            try {
                setLoading(false);
                let response = await apiLearning.getTopic();
                const items = [];
                response.data.forEach((element, index) => {
                    items.push({
                        id: element.id,
                        value: element.id,
                        label: element.content,
                    })
                });
                setTopicInit(items);
            } catch (error) {
                setLoading(false);
                message.error("Kết nối không ổn định, vui lòng thử lại.")
            }
        }
        fetchData()
    }, []);

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
    const resetRandom = () => {
        setRandom(generateUniqueArray(10, 0, listQuestions.length - 1))
    }
    const openConfirmExam = () => {
        setConfirmExam(true);
        setCountdown(3);
        setTakingExam(false);
        startCountdown();
        setIndexx(0);
    }

    const onConfirmExam = () => {
        setConfirmExam(false);
        setTakingExam(true);
        setPoint(0);
        resetRandom();
    }

    const showPointResult = () => {
        setshowPoint(true);
    }

    const handleChoseTopic = (e) => {
        setTopicChose(e)
    }

    const confirmPoint = () => {
        setshowPoint(false);
        setTakingExam(false);
        setIndexx(0);
        setConfirmExamStarted(false);
        setCountdown(3);
    }

    const cancleStudy = () => {
        setConfirmExam(false)
        setCountdown(3);
        setConfirmExamStarted(false);
    }

    const handleStartTopicExam = async () => {
        setShowSelectTopic(false);
        try {
            setLoading(false);
            let response = await apiLearning.getTopic();
            const items = [];
            response.data.forEach((element, index) => {
                items.push({
                    id: element.id,
                    value: element.id,
                    label: element.content,
                })
            });
            setTopicInit(items);
        } catch (error) {
            setLoading(false);
            message.error("Kết nối không ổn định, vui lòng thử lại.")
        }
        openConfirmExam();
    }

    return (<div className="main-layout">
        <LoadingComponent loading={loading} />
        <Nav />
        <div className="main-layout__container">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar disableSearch={true} />
                </div>
                <div className="main-layout__content">
                    <MenuTakingExam takingExam={takingExam} openConfirmExam={openConfirmExam} setShowSelectTopic={setShowSelectTopic} />
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
                    random={random}
                />
                <Modal
                    open={confirmExam}
                    footer={[]}
                    onCancel={cancleStudy}
                    closeIcon={false}
                >
                    <div className="modal-content">
                        <p className="ant-upload-text flex-center" style={{ fontSize: '24px', fontWeight: 500, color: '#1677ff' }}>
                            Bài kiểm tra sẽ bắt đầu sau:
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
                    footer={[<Button type="primary" onClick={confirmPoint}>
                        Đóng
                    </Button>,]}
                    // onCancel={cancleStudy}
                    closeIcon={false}
                    style={{ top: '10vh' }}
                >
                    <div className="modal-content">
                        <p className="ant-upload-text flex-center" style={{ fontSize: '32px', fontWeight: 500, color: '#1677ff' }}>
                            Kết quả
                        </p>
                        <div className="ant-upload-text" style={{ margin: '40px 0', fontSize: '60px', fontWeight: 600 }}>

                            {point > 3 ? point > 7 ?
                                <SmileOutlined style={{ fontSize: '140px', color: "#53d100" }} />
                                :
                                <MehOutlined style={{ fontSize: '140px', color: "orange" }} />
                                :
                                <FrownOutlined style={{ fontSize: '140px', color: "red" }} />
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
                <Modal
                    open={showSelectTopic}
                    title="Chọn chủ đề kiểm tra"
                    onOk={handleStartTopicExam}
                    onCancel={() => setShowSelectTopic(false)}
                    okText="Đồng ý"
                    cancelText="Đóng"
                >
                    <Select
                        style={{ width: '100%', marginTop: '20px' }}
                        options={topicInit}
                        onChange={(e) => { handleChoseTopic(e) }}
                    />
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;