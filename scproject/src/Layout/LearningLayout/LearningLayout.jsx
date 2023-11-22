import React, { useState } from "react";
import {
    Nav,
    LayoutMenuStudyAI,
} from "../../Component/index";
import "./LearningLayout.scss";
import { useLocation } from "react-router-dom";
import { VolunteerSlider } from "../../Containers";
import StudyContainer from "../../Containers/StudyContainer/StudyContainer";
import { Button, Drawer, Modal, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";

export default function LearningLayout() {
    const location = useLocation();
    const pathName = location.pathname;
    const [showSlider, setShowSlider] = useState(true);
    const [showLearningComponent, setshowLearningComponent] = useState(false);
    const [showHistoryPanel, setshowHistoryPanel] = useState(false);
    const [showPopupUploadVideo, setshowPopupUploadVideo] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickMenu = () => {
        setShowSlider(false);
        setshowLearningComponent(true);
    }
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

    const props = {
        name: 'file',
        multiple: true,
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
    return (
        <div className="main-layout">
            <Nav />
            <div className="main-layout__container">
                <div className="main-layout__side-bar">
                    <LayoutMenuStudyAI handleClickMenu={handleClickMenu} openPanelHistory={openPanelHistory} onUploadVideo={onUploadVideo} />
                </div>
                <div className="main-layout__children flex-center">
                    {showSlider && <VolunteerSlider />}
                    {showLearningComponent && <StudyContainer />}

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
                        <TextArea placeholder="Lưu ý viết đúng chính tả và viết thường" autoSize onChange={(e)=>console.log(e.target.value)}/>
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
                    <Drawer title="Lịch sử đóng góp" placement="right" onClose={onCloseHistoryPanel} open={showHistoryPanel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>

                </div>
            </div>
        </div>
    );
}
