import React, { useEffect, useRef, useState } from "react";
import { Nav, LearningSideBar, } from "../../Component/index";
import "./LearningLayout.scss";
import { useLocation } from "react-router-dom";
import { VolunteerSlider } from "../../Containers";
import StudyContainer from "../../Component/StudyContainer/StudyContainer";
import { Button, Drawer, Dropdown, Modal, Radio, Select, Space, message } from "antd";
import { EyeTwoTone, InboxOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";
import SearchWord from "./SearchWord";
import videoSrc from "../../assets/video/doncoi.mp4";
import noiay from "../../assets/video/noiaymemong.mp4";
import { axiosLearningClient } from "../../Services/axiosClient";
import { apiLearning } from "../../Services/apiLearning";
import LoadingComponent from "../../Component/Loading/Loading";
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
const fileType = [
    {
        label: 'Ảnh',
        value: 0
    },
    {
        label: 'Video',
        value: 1
    }
]


export default function LearningLayout() {
    const videoRef = useRef(null);
    const [linkFile, setLinkFile] = useState('');
    const [content, setContent] = useState('');
    const [idTopic, setIdTopic] = useState(0);
    const [isImage, setIsImage] = useState(true);
    const [topicInit, setTopicInit] = useState([]);
    const [topicChose, setTopicChose] = useState();
    const [showSlider, setShowSlider] = useState(true);
    const [showHistoryPanel, setshowHistoryPanel] = useState(false);
    const [showPopupUploadVideo, setshowPopupUploadVideo] = useState(false);
    const [showSearchWord, setshowSearchWord] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmStudy, setConfirmStudy] = useState(false);
    const [valueOptions, setValueOptions] = useState([]);
    const [showDetail, setShowDetail] = useState({});
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        handleGetListFile();
    }, [idTopic]);
    const fetchData = async () => {
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
    const handleClickMenu = () => {
        setConfirmStudy(true)
    }
    const handleChoseTopic = (e) => {
        setTopicChose(e)
    }
    const openPanelHistory = () => {
        setshowHistoryPanel(true);
    }
    const onUploadVideo = () => {
        setshowPopupUploadVideo(true);
    }
    const handleOk = async () => {
        setLoading(true);
        let data = {}
        if (isImage) {
            data = {
                content: content,
                imageLocation: linkFile,
                videoLocation: '',
                topic_id: topicChose,
            }
        }
        else {
            data = {
                content: content,
                imageLocation: '',
                videoLocation: linkFile,
                topic_id: topicChose,
            }
        }
        let response = await apiLearning.themTuDien(data);
        if (response.code === 200) {
            setTimeout(() => {
                setLoading(false);
                setshowPopupUploadVideo(false);
                message.success(`Thêm ${data.content} lên thành công.`);
            }, 3000);
        }
        else {
            setTimeout(() => {
                setLoading(false);
                setshowPopupUploadVideo(false);
                message.error(`Thêm ${data.content} thất bại. Vui lòng thử lại!!!`);
            }, 3000);
        }
    };
    const handleGetListFile = async () => {
        setLoading(true);
        let response = await apiLearning.getTuDien(idTopic);
        if (response.code === 200) {
            setTimeout(() => {
                setLoading(false);
                let listResponse = response.data.map(item => {
                    return {
                        content: item.content,
                        type: item.videoLocation === "" ? 1 : 2,
                        preview: item.videoLocation === "" ? item.imageLocation : item.videoLocation,
                    }
                });
                setShowFile(listResponse);
            }, 3000);
        }
        else {
            setTimeout(() => {
                setLoading(false);
                message.error(`Tìm chủ đề thất bại. Vui lòng thử lại!!!`);
            }, 3000);
        }
    }
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
                {file.type === 1 ?

                    <div className='flex-center' style={{ width: '76px', justifyContent: "center" }}>
                        <img src={file.preview} alt="Uploaded" style={styles.image} />
                    </div>
                    :
                    <div className='flex-center' style={{ width: '76px', justifyContent: "center" }}>
                        <PlayCircleTwoTone style={{ fontSize: '50px' }} />
                    </div>
                }
                <div style={styles.cardInfo}>
                    <p style={{ fontWeight: '500' }}>{file.content}</p>
                </div>
                <button onClick={() => handleOpenDetailFile(file)} style={styles.button}>
                    <EyeTwoTone style={{ fontSize: '1.25rem' }} />
                </button>
            </div>
        );
    };
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
    return (
        <div className="main-layout">
            <LoadingComponent loading={loading} />
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
                        listTopic={topicInit}
                        setIdTopic={setIdTopic}
                        fetchData={fetchData}
                    />
                </div>
                <div className="main-layout__children flex-center">
                    {showSlider && <VolunteerSlider />}
                    {showSearchWord && <SearchWord files={files} searchText={searchText} />}
                    <Modal
                        open={showPopupUploadVideo}
                        title="Bổ sung thư viện ngôn ngữ ký hiệu"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        style={{ top: 20 }}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy bỏ
                            </Button>,
                            <Button
                                key="link"
                                type="primary"
                                loading={loading}
                                onClick={handleOk}
                            >
                                Tải lên
                            </Button>,
                        ]}
                    >
                        <p className="ant-upload-text" style={{ margin: '25px 0 10px 0' }}>Ngôn ngữ văn bản:</p>
                        <TextArea placeholder="Lưu ý viết đúng chính tả và viết thường" autoSize onChange={(e) => setContent(e.target.value)} />
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
                        <p className="ant-upload-text" style={{ margin: '10px 0 10px 0' }}>Chủ đề liên quan:</p>
                        <Select
                            mode=""
                            style={{ width: '100%' }}
                            options={topicInit}
                            onChange={(e) => { handleChoseTopic(e) }}
                        ></Select>
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
                        {showDetail.type === 1 ?
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