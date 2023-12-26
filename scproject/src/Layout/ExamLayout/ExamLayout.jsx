import { useState, useEffect } from "react";
import { Button, HeaderBar, Input, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Select, Space, Upload, message } from "antd";
import { FrownOutlined, FrownTwoTone, InboxOutlined, LoadingOutlined, MehOutlined, MehTwoTone, SmileOutlined } from "@ant-design/icons";
import './ExamLayout.scss';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";
import { apiLearning } from "../../Services/apiLearning";



const Examlayout = () => {
    const [contentQuestion, setContentQuestion] = useState([]);
    const [takingExam, setTakingExam] = useState(false);
    const [linkFile, setLinkFile] = useState('');
    const [isImage, setIsImage] = useState(true);
    const [countdown, setCountdown] = useState(3);
    const [confirmExamStarted, setConfirmExamStarted] = useState(false);
    const [point, setPoint] = useState(0);
    const [topicChose, setTopicChose] = useState();
    const [topicInit, setTopicInit] = useState([]);
    const [indexx, setIndexx] = useState(0);
    const [showPoint, setshowPoint] = useState(false);
    const [showCreateQuestions, setshowCreateQuestions] = useState(false);
    const [confirmExam, setConfirmExam] = useState(false);
    const [valueText, setValueText] = useState(["", "", "", ""]);
    const [valueChecked, setValueChecked] = useState(0);
    const [loading, setLoading] = useState(false);
    const onChange = (e) => {
        setValueChecked(e.target.value);
    };
    useEffect(() => {
        async function fetchData() {
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
        }
        fetchData()
    }, []);
    useEffect(() => {
        setContentQuestion('');
        setValueChecked(0);
        setTopicChose({});

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
    const handleCreateQuestion = async () => {
        console.log([
            { value: valueText[0], checked: valueChecked == 0 },
            { value: valueText[1], checked: valueChecked == 1 },
            { value: valueText[2], checked: valueChecked == 2 },
            { value: valueText[3], checked: valueChecked == 3 },
        ]);
        let data = {
        }
        if (isImage) {
            data = {
                content: "",
                explanation: "",
                imageLocation: linkFile,
                videoLocation: "",
                topic_id: topicChose,
                answerDTOS: [
                    {
                        content: valueText[0],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 0,
                    },

                    {
                        content: valueText[1],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 1,
                    },
                    {
                        content: valueText[2],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 2,
                    },
                    {
                        content: valueText[3],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 3,
                    },
                ]
            }
        }
        else {
            data = {
                content: "",
                explanation: "",
                imageLocation: '',
                videoLocation: linkFile,
                topic_id: topicChose,
                answerDTOS: [
                    {
                        content: valueText[0],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 0,
                    },

                    {
                        content: valueText[1],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 1,
                    },
                    {
                        content: valueText[2],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 2,
                    },
                    {
                        content: valueText[3],
                        imageLocation: "",
                        videoLocation: "",
                        correct: valueChecked == 3,
                    },
                ]
            }
        }
        let response = await apiLearning.addQuestion(data);
        if (response.code === 200) {
            setTimeout(() => {
                setLoading(false);
                setshowCreateQuestions(false);
                message.success(`Tạo câu hỏi thành công.`);
            }, 3000);
        }
        else {
            setTimeout(() => {
                setLoading(false);
                setshowCreateQuestions(false);
                message.error(`Tạo câu hỏi thất bại. Vui lòng thử lại!!!`);
            }, 3000);
        }
    }
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
        setIndexx(0);
    }

    const onConfirmExam = () => {
        setConfirmExam(false);
        setTakingExam(true);
        setPoint(0);

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
    const onShowCreateQuestion = () => {
        setshowCreateQuestions(true)
    }
    const props = {
        multiple: false,
        name: 'file',
        action: 'http://202.191.56.11:8090/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file);
            }
            if (status === 'done') {
                message.success(`File ${info.file.name} sẵn sàng.`);
                setLinkFile(info.file.response);
                let fileType = info.file.type.toString();
                setIsImage(fileType.includes('image'))
            } else if (status === 'error') {
                message.error(`FIle ${info.file.name} lỗi, vui lòng xóa ${info.file.name} và thử lại.`);
                setLinkFile('');
            }
        },
        onDrop(e) {
            console.log('Dropped files', e);
        },
    };
    return (<div className="main-layout">
        <Nav />
        <div className="main-layout__container">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar />
                </div>
                <div className="main-layout__content">
                    <MenuTakingExam takingExam={takingExam} openConfirmExam={openConfirmExam} onShowCreateQuestion={onShowCreateQuestion} />
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
                    footer={[<Button onClick={confirmPoint}>
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
                    open={showCreateQuestions}
                    title="Tạo câu hỏi kiểm tra"
                    onOk={handleCreateQuestion}
                    onCancel={() => setshowCreateQuestions(false)}
                    okText="Tải lên"
                    cancelText="Hủy bỏ"
                    style={{ top: 20 }}
                    className="radio-create-question"
                >
                    <p className="ant-upload-text" style={{ margin: '10px 0 10px 0', fontWeight: "500" }}>Câu hỏi</p>
                    <TextArea
                        style={{
                            width: "100%",
                        }}
                        value={contentQuestion}
                        onChange={(e) => {
                            setContentQuestion(e.target.value);
                        }}
                    />
                    <Dragger {...props}>
                        <p className="ant-upload-text">Click hoặc thả file của bạn vào đây</p>
                        <p className="ant-upload-hint" style={{ color: 'red' }}>
                            Lưu ý: chỉ hỗ trợ các file ảnh và video.
                        </p>
                    </Dragger>
                    <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>Đáp án: </p>
                    <p className="ant-upload-text" style={{ margin: '10px 0', color: '#a3a3a3' }}>Lưu ý: tích vào đáp án đúng.</p>
                    <Radio.Group onChange={onChange} value={valueChecked}>
                        <Space direction="vertical">
                            <Radio value={0}>
                                <Input
                                    style={{
                                        width: "100%",
                                        marginLeft: 10,
                                    }}
                                    value={valueText[0]}
                                    onChange={(e) => {
                                        const updatedValueText = [...valueText];
                                        updatedValueText[0] = e.target.value;
                                        setValueText(updatedValueText);
                                    }}
                                />
                            </Radio>
                            <Radio value={1}>
                                <Input
                                    style={{
                                        width: "100%",
                                        marginLeft: 10,
                                    }}
                                    value={valueText[1]}
                                    onChange={(e) => {
                                        const updatedValueText = [...valueText];
                                        updatedValueText[1] = e.target.value;
                                        setValueText(updatedValueText);
                                    }}
                                />
                            </Radio>

                        </Space>
                        <Space direction="vertical">
                            <Radio value={2}>
                                <Input
                                    style={{
                                        width: "100%",
                                        marginLeft: 10,
                                    }}
                                    value={valueText[2]}
                                    onChange={(e) => {
                                        const updatedValueText = [...valueText];
                                        updatedValueText[2] = e.target.value;
                                        setValueText(updatedValueText);
                                    }}
                                />
                            </Radio>
                            <Radio value={3}>
                                <Input
                                    style={{
                                        width: "100%",
                                        marginLeft: 10,
                                    }}
                                    value={valueText[3]}
                                    onChange={(e) => {
                                        const updatedValueText = [...valueText];
                                        updatedValueText[3] = e.target.value;
                                        setValueText(updatedValueText);
                                    }}
                                />
                            </Radio>
                        </Space>
                    </Radio.Group>
                    <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>Chủ đề liên quan:</p>
                    <Select
                        style={{ width: '100%' }}
                        options={topicInit}
                        onChange={(e) => { handleChoseTopic(e) }}
                    />
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;