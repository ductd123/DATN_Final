import React, { useState, useEffect, useRef } from "react";
import { Nav } from "../../Component";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import { VideoCameraAddOutlined, WarningFilled } from "@ant-design/icons";
import Webcam from "react-webcam";
import { Button, Modal, Select, Tooltip, message } from "antd";
import { useReactMediaRecorder } from "react-media-recorder";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import './VolunteerLayout.scss'

const VolunterLayout = () => {
    const [loading, setLoading] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingTimerId, setRecordingTimerId] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [binaryData, setBinaryData] = useState(null);
    const [topicInit, setTopicInit] = useState();
    const [vocabInit, setVocabInit] = useState();
    const [vocabOption, setVocabOption] = useState();
    const [showDetail, setShowDetail] = useState();
    const [showPreviewRecord, setShowPreviewRecord] = useState(false);
    const { status, startRecording, stopRecording, mediaBlobUrl, duration } = useReactMediaRecorder({
        video: true,
        audio: false
    });
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const previewRef = useRef(null);
    useEffect(() => {
        getTopic();
    }, [])

    useEffect(() => {
        previewRef.current = recordedVideo;
    }, [recordedVideo]);

    useEffect(() => {
        if (recordingTime > 5) {
            stopRecording();
            clearInterval(recordingTimerId);
            setRecordingTime(0);
        }
    }, [recordingTime]);
    const getTopic = async () => {
        setLoading(true);
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

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const handleStopRecording = async () => {
        stopRecording();
        clearInterval(recordingTimerId);
        setRecordingTime(0);
        try {
            const response = await fetch(recordedVideo);
            console.log(response);
        } catch (error) {
            console.error("Error fetching video binary:", error);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            const metadata = { type: blob.type, lastModified: blob.lastModified };
            const file = new File([blob], `volunteer_${showDetail.name}.mp4`, metadata);
            const formData = new FormData();
            formData.append("file", file);

            const link = await apiUploadFile.uploadFile(formData);
            if (link) {
                setLoading(true);
                try {
                    const data = {
                        dataLocation: link,
                        content: showDetail.name,
                        dataType: "Vocab"
                    }
                    await apiUploadFile.sendData(data);
                    setLoading(false);
                    message.success(` Thêm dữ liệu cho ${showDetail.name} thành công.`)
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error('Error fetching and converting to file:', error);
        }
    };

    const handleViewRecordedVideo = async () => {
        setShowPreviewRecord(true);
        setRecordedVideo(mediaBlobUrl);
    };

    const onChooseTopic = async (e) => {
        setLoading(true);
        try {
            setLoading(false);
            let response = await apiLearning.getTuDien(e);
            const items = [];
            response.data.forEach((element, index) => {
                items.push({
                    id: element.id,
                    value: element.id,
                    label: element.content,
                })
            });
            setVocabOption(items);
            setVocabInit(response.data)
        } catch (error) {
            setLoading(false);
        }
    };

    const onChooseVocab = (e) => {
        const x = vocabInit.find(i => i.id == e);
        setShowDetail({
            id: x.id,
            type: x.imageLocation !== "" ? 1 : 2,
            preview: x.imageLocation !== "" ? x.imageLocation : x.videoLocation,
            name: x.content
        })
    }

    const handleStartRecording = () => {
        startRecording();
        setRecordedVideo(null);
        const timerId = setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);
        setRecordingTimerId(timerId);
    };
    return (
        <div className="main-layout">
            <LoadingComponent loading={loading} />
            <Nav />
            <div className="contact" style={{ height: '100%' }}>
                <div className="contact-panel__header">
                    <div className="list-contact__selection">
                        <VideoCameraAddOutlined />
                        <div className="list-contact__content">Quay video dành cho tình nguyện viên</div>
                    </div>
                </div>
                <div className="record-container">
                    <div className="record-container-child">
                        <div className="record-container-child-header">Dữ liệu mẫu</div>
                        <div>
                            {/* {showDetail?.type === 2 ? */}
                            {showDetail?.type === 1 && <img src={showDetail?.preview} alt="Uploaded" className="record-container-child-video" />}

                            {showDetail?.type === 2 && <video ref={videoRef} controls className="record-container-child-video">
                                <source src={showDetail?.preview} type="video/mp4" />
                            </video>}
                            {/* } */}
                        </div>
                        <div className="record-container-button">
                            <Select options={topicInit} placeholder="Chọn chủ đề" style={{ width: '50%' }} onChange={(e) => onChooseTopic(e)} />
                            <Select options={vocabOption} placeholder="Chọn từ ngữ muốn tìm" style={{ width: '50%' }} onChange={(e) => onChooseVocab(e)} />
                        </div>
                    </div>
                    <div className="record-container-child">
                        <div className="record-container-child-header">Dữ liệu của người dùng.</div>
                        <div className="record-container-child-video">
                            <Webcam mirrored={true} style={{ width: '100%' }} audio={false} ref={webcamRef} />
                        </div>
                        <div className="record-container-button">
                            <Button
                                onClick={handleStartRecording}
                                disabled={status === 'recording' || !showDetail}
                                icon={<Tooltip title="Thời gian tối đa cho mỗi video là 5s." placement="top" trigger="hover" color="#4096ff" >
                                    <WarningFilled style={{ color: '#4096ff' }} />
                                </Tooltip>}
                            >
                                Bắt đầu quay {recordingTime !== 0 && <p style={{ color: 'red' }}>{formatTime(recordingTime)}</p>}
                            </Button>
                            <Button onClick={handleStopRecording} disabled={status !== 'recording'}>
                                Dừng quay
                            </Button>
                            <Button onClick={handleDownload} disabled={!mediaBlobUrl}>
                                Tải lên
                            </Button>
                            <Button onClick={handleViewRecordedVideo} disabled={!mediaBlobUrl}>
                                Xem lại video
                            </Button>
                            {duration && <p>Thời gian quay: {duration.toFixed(2)} giây</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={showPreviewRecord}
                onClose={() => setShowPreviewRecord(false)}
                onCancel={() => setShowPreviewRecord(false)}
                footer={[]}
                key={recordedVideo}            >
                <div>
                    <p>Xem lại video:</p>
                    <video ref={previewRef} controls width="100%">
                        <source src={recordedVideo} type="video/webm" />
                        video không hỗ trợ cho trình duyệt này.
                    </video>
                </div>
            </Modal>
        </div>
    );
}

export default VolunterLayout;
