import { useState, useEffect } from "react";
import { Button, HeaderBar, Input, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Space, message } from "antd";
import { FrownOutlined, FrownTwoTone, InboxOutlined, LoadingOutlined, MehOutlined, MehTwoTone, SmileOutlined } from "@ant-design/icons";
import './ExamLayout.scss';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";



const Examlayout = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [takingExam, setTakingExam] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [confirmExamStarted, setConfirmExamStarted] = useState(false);
    const [point, setPoint] = useState(0);
    const [indexx, setIndexx] = useState(0);
    const [showPoint, setshowPoint] = useState(false);
    const [confirmExam, setConfirmExam] = useState(false);
    const [valueText, setValueText] = useState(["", "", "", ""]);
    const [valueChecked, setValueChecked] = useState(1);
    const [bodyQuestion, setBodyQuestion] = useState();
    const onChange = (e) => {
        setValueChecked(e.target.value);
    };
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
    const handleCreateQuestion = () => {
        console.log([
            { value: valueText[0], checked: valueChecked == 0 },
            { value: valueText[1], checked: valueChecked == 1 },
            { value: valueText[2], checked: valueChecked == 2 },
            { value: valueText[3], checked: valueChecked == 3 },
        ]);
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
    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
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
                    open={true}
                    title="Bổ sung thư viện ngôn ngữ ký hiệu"
                    onOk={handleCreateQuestion}
                    onCancel={''}
                    okText="Tải lên"
                    cancelText="Hủy bỏ"
                    style={{ top: 20 }}
                >
                    <p className="ant-upload-text" style={{ margin: '10px 0 10px 0', fontWeight: "500" }}>Câu hỏi</p>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click hoặc thả file của bạn vào đây</p>
                        <p className="ant-upload-hint" style={{ color: 'red' }}>
                            Lưu ý: chỉ hỗ trợ các file ảnh và video.
                        </p>
                        <p className="ant-upload-hint">
                            Bổ sung thư viện ngôn ngữ ký hiệu cùng WeTalk!!!
                        </p>
                    </Dragger>
                    <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>Đáp án: </p>
                    <p className="ant-upload-text" style={{ margin: '10px 0', color: 'red' }}>Lưu ý: tích vào đáp án đúng.</p>
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
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;