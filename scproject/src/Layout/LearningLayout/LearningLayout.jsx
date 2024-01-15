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
import { apiLearning } from "../../Services/apiLearning";
import LoadingComponent from "../../Component/Common/Loading/Loading";
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
    const [idTopic, setIdTopic] = useState();
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
        if (idTopic) {
            handleGetListFile();
            setShowSlider(false);
            setshowSearchWord(true);
        }
    }, [idTopic]);
    const fetchData = async () => {
        setLoading(true)
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
        }
    }
    const handleClickMenu = () => {
        setConfirmStudy(true);
    }

    const openPanelHistory = () => {
        setshowHistoryPanel(true);
    }
    const onUploadVideo = () => {
        setshowPopupUploadVideo(true);
    }
    const handleGetListFile = async () => {
        setLoading(true);
        try {
            setLoading(false);
            let response = await apiLearning.getTuDien(idTopic);
            setLoading(false);
            let listResponse = response.data.map(item => {
                return {
                    content: item.content,
                    type: item.videoLocation === "" ? 1 : 2,
                    preview: item.videoLocation === "" ? item.imageLocation : item.videoLocation,
                }
            });
            setShowFile(listResponse);

        } catch (error) {
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
    const [files, setShowFile] = useState([]);
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

    const handleSearch = async (e) => {
        setSearchText(e);
        openSearchWord();
        setLoading(true);
        let data = {
            page: 1,
            size: 10,
            text: e,
            ascending: true,
            orderBy: "",
        }
        try {
            let response = await apiLearning.searchVocab(data);
            setTimeout(() => {
                setLoading(false);
                const data1 = response.data.map((item) => ({
                    content: item.content,
                    preview: item.imageLocation !== "" ? item.imageLocation : item.videoLocation,
                    type: item.imageLocation !== "" ? 1 : 2,
                    id: item.id,
                }));
                setShowFile(data1)
            }, 500);
        }
        catch (error) {
            console.log(error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
            setLoading(false);
        }
    }

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
                        setSearchText={setSearchText}
                    />
                </div>
                <div className="main-layout__children flex-center">
                    {showSlider && <VolunteerSlider />}
                    {showSearchWord && <SearchWord searchText={searchText} files={files} />}

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
                                <Button className="button-option" key={index} style={{ minWidth: '45px' }} onClick={() => handleSearch(item)}>{item}</Button>
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