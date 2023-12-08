import React, { useRef, useState } from "react";
import { Nav, LearningSideBar, } from "../../Component/index";
import "./LearningLayout.scss";
import { useLocation } from "react-router-dom";
import { VolunteerSlider } from "../../Containers";
import StudyContainer from "../../Component/StudyContainer/StudyContainer";
import { Button, Drawer, Modal, Radio, Space, message } from "antd";
import { EyeTwoTone, InboxOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";
import SearchWord from "./SearchWord";
import videoSrc from "../../assets/video/doncoi.mp4";
import noiay from "../../assets/video/noiaymemong.mp4";
const q = {
    id: '204',
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
const fileType = {
    img: 1,
    video: 2,
}


export default function LearningLayout() {
    const videoRef = useRef(null);
    const location = useLocation();
    const pathName = location.pathname;
    const [showSlider, setShowSlider] = useState(true);
    const [showLearningComponent, setshowLearningComponent] = useState(false);
    const [showHistoryPanel, setshowHistoryPanel] = useState(false);
    const [showPopupUploadVideo, setshowPopupUploadVideo] = useState(false);
    const [showSearchWord, setshowSearchWord] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmStudy, setConfirmStudy] = useState(false);
    const [valueOptions, setValueOptions] = useState([]);
    const [showDetail, setShowDetail] = useState({});
    const [searchText, setSearchText] = useState("");

    const handleClickMenu = () => {
        setConfirmStudy(true)
    }
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const handleAnswerSelected = (index, isCorrect) => {
        console.log(`Answer ${index + 1} selected. Correct: ${isCorrect}`);
        setSelectedAnswers([...selectedAnswers, { index, isCorrect }]);
    };
    const openPanelHistory = () => {
        setshowHistoryPanel(true);
    }
    const onUploadVideo = () => {
        setshowPopupUploadVideo(true);
    }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setshowPopupUploadVideo(false);
        }, 3000);
    };
    const handleCancel = () => {
        setshowPopupUploadVideo(false);
    };
    const onCloseHistoryPanel = () => {
        setshowHistoryPanel(false);
    };
    const [showImage, setShowImage] = useState(false);
    const [files, setShowFile] = useState([
        { name: "asss", size: "12122", preview: "https://picsum.photos/200", type: 1 },
        { name: "video", size: "12122", preview: videoSrc, type: 2 },
        { name: "video1", size: "12122", preview: noiay, type: 2 },
        { name: "anh 2", size: "12122", preview: "https://picsum.photos/204", type: 1 },
        { name: "Anh 4", size: "12122", preview: "https://picsum.photos/203", type: 1 },
        { name: "Anh 6", size: "12122", preview: "https://picsum.photos/207", type: 1 },
        { name: "asss", size: "12122", preview: "https://picsum.photos/200", type: 1 },
        { name: "video", size: "12122", preview: videoSrc, type: 2 },
        { name: "video1", size: "12122", preview: noiay, type: 2 },
        { name: "anh 2", size: "12122", preview: "https://picsum.photos/204", type: 1 },
        { name: "Anh 4", size: "12122", preview: "https://picsum.photos/203", type: 1 },
        { name: "Anh 6", size: "12122", preview: "https://picsum.photos/207", type: 1 },
    ]);
    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        console.log(videoRef);
        setShowImage(!showImage);
    };
    const cancleStudy = () => {
        setConfirmStudy(false);
    };
    const openSearchWord = () => {
        cancleStudy();
        setshowSearchWord(true);
        setshowLearningComponent(false);
        setShowSlider(false);
    }

    const handleSearch = (e) => {
        setSearchText(e);
        openSearchWord()
        console.log('tìm', e);
    }

    const handleOpenDetailFile = (file) => {
        setShowDetail(file);
        setShowImage(!showImage);
    }
    const handleClickOptions = (item) => {
        setSearchText(item);
        openSearchWord();
    }
    const ImageCard = ({ file }) => {

        return (
            <div style={styles.card}>
                {file.type == 1 ?

                    <div className='flex-center' style={{ width: '76px', justifyContent: "center" }}>
                        <img src={file.preview} alt="Uploaded" style={styles.image} />
                    </div>
                    :
                    <div className='flex-center' style={{ width: '76px', justifyContent: "center" }}>
                        <PlayCircleTwoTone style={{ fontSize: '50px' }} />
                    </div>
                }
                <div style={styles.cardInfo}>
                    <p style={{ fontWeight: '500' }}>{file.name}</p>
                    <p style={{ fontSize: '12px' }}>Kích thước: {file.size} bytes</p>
                    <p style={{ fontSize: '12px' }}>Ngày đăng: {file.size}</p>
                </div>
                <button onClick={() => handleOpenDetailFile(file)} style={styles.button}>
                    <EyeTwoTone style={{ fontSize: '1.25rem' }} />
                </button>
            </div>
        );
    };
    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file.response);
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
    return (
        <div className="main-layout">
            <Nav />
            <div className="main-layout__container">
                <div className="main-layout__side-bar">
                    <LearningSideBar
                        handleClickMenu={handleClickMenu}
                        openSearchWord={openSearchWord}
                        openPanelHistory={openPanelHistory}
                        onUploadVideo={onUploadVideo}
                        handleSearch={handleSearch}
                        setValueOptions={setValueOptions}
                    />
                </div>
                <div className="main-layout__children flex-center">
                    {showSlider && <VolunteerSlider />}
                    {showLearningComponent && <StudyContainer
                        question={q.question}
                        image={`${q.image}${q.id}`}
                        video={q.video}
                        answers={q.answers}
                        correctAnswerIndex={q.correctAnswerIndex}
                        onAnswerSelected={(isCorrect) => handleAnswerSelected(1, isCorrect)}
                    />}
                    {showSearchWord && <SearchWord files={files} searchText={searchText} />}
                    <Modal
                        open={showPopupUploadVideo}
                        title="Bổ sung thư viện ngôn ngữ ký hiệu"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy bỏ
                            </Button>,
                            <Button
                                key="link"
                                href="/"
                                type="primary"
                                loading={loading}
                                onClick={handleOk}
                            >
                                Tải lên
                            </Button>,
                        ]}
                    >
                        <p className="ant-upload-text" style={{ margin: '25px 0 10px 0' }}>Ngôn ngữ văn bản:</p>
                        <TextArea placeholder="Lưu ý viết đúng chính tả và viết thường" autoSize onChange={(e) => console.log(e.target.value)} />
                        <p className="ant-upload-text" style={{ margin: '10px 0 10px 0' }}>Ngôn ngữ ký hiệu:</p>
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

                    </Modal>

                    <Drawer title="Lịch sử đăng tải" placement="right" onClose={onCloseHistoryPanel} open={showHistoryPanel}>
                        {files.map((item, i) => {
                            return (
                                <ImageCard file={item} key={i}></ImageCard>
                            );
                        })}
                    </Drawer>

                    <Modal
                        open={showImage}
                        footer={[]}
                        onCancel={stopVideo}
                        style={{ top: 20 }}
                        title={showDetail.name}
                        key={showDetail.preview}
                    >
                        {showDetail.type == 1 ?
                            <img src={showDetail.preview} alt="Uploaded" style={styles.largeImage} />
                            :
                            <video ref={videoRef} controls style={styles.largeImage}>
                                <source src={showDetail.preview} type="video/mp4" />
                            </video>}
                    </Modal>
                    <Modal
                        open={confirmStudy}
                        footer={[
                            // <Button key="back" onClick={cancleStudy}>
                            //     Hủy bỏ
                            // </Button>,
                            // <Button
                            //     type="primary"
                            //     onClick={onOpenExam}
                            // >
                            //     Tìm kiếm
                            // </Button>,
                        ]}
                        onCancel={cancleStudy}
                        closeIcon={false}
                    >
                        {valueOptions.map((item, index) => {
                            return (
                                <Button className="button-option" key={index} style={{ minWidth: '45px' }} onClick={() => handleClickOptions(item)}>{item}</Button>
                            )
                        })}
                    </Modal>
                </div>
            </div>
        </div>
    );
}
const styles = {
    card: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        border: "1px solid rgb(211 211 211)",
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        height: '70px',
    },
    image: {
        width: '70px',
        height: '70px',
        borderRadius: '5px',
    },
    cardInfo: {
        padding: '5px 16px',
        width: 'calc(100% - 100px)'
    },
    button: {
        cursor: 'pointer',
        width: '50px',
    },
    largeImage: {
        width: '100%',
        height: 'auto',
        marginTop: '30px',
    },
};