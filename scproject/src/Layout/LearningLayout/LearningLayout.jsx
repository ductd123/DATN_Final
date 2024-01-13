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
        try {
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

        }
    }

    const handleClickMenu = () => {
        setConfirmStudy(true);
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
            }, 500);
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
        try {
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
                }, 500);
            }
            else {
                setTimeout(() => {
                    setLoading(false);
                    message.error(`Tìm chủ đề thất bại. Vui lòng thử lại!!!`);
                }, 3000);
            }
        } catch (error) {

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