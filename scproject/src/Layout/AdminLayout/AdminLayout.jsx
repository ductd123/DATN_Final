import React, { useState, useEffect } from "react";
import { HeaderBar, MenuTakingExam, Nav } from "../../Component";
import { Button, Empty, message } from "antd";
import './AdminLayout.scss';
import LoadingComponent from "../../Component/Common/Loading/Loading";
import MenuAdmin from "../../Component/MenuAdmin/MenuAdmin";
import { ArrowLeftOutlined, ArrowRightOutlined, AuditOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import VideoCall from "../../Component/VideoCall/VideoCall";
import { apiUploadFile } from "../../Services/apiLearning";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import apiUser from "../../Services/apiUser";

const AdminLayout = () => {
    const [listAccept, setListAccept] = useState({});
    const [videoTNV, setVideoTNV] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingTimerId, setRecordingTimerId] = useState(null);
    const [simpleMenu, setSimpleMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [binaryData, setBinaryData] = useState(null);
    const [videoBlob, setVideoBlob] = useState(null);
    const { status, startRecording, stopRecording, mediaBlobUrl, duration } = useReactMediaRecorder({
        video: true,
    });
    const webcamRef = React.useRef(null);

    useEffect(() => {
        initPendingData();
    }, [])
    useEffect(() => {
        console.log("Duration:", duration);
    }, [duration]);
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
            // setBinaryData(response);
        } catch (error) {
            console.error("Error fetching video binary:", error);
        }
    };

    const handleDownload = async () => {
        // const a = document.createElement('a');
        // a.href = mediaBlobUrl;
        // a.download = 'recorded-video.mp4';
        // a.click();
        // Create a Blob URL for the videoBlob
        const formData = new FormData();
        formData.append("file", binaryData);
        if (binaryData) {
            await apiUploadFile.uploadFile(formData);
        }
    };

    const initPendingData = async () => {
        let response = await apiUploadFile.getPendingData();
        console.log(response);
    }

    const handleViewRecordedVideo = async () => {
        // Display the recorded video
        setRecordedVideo(mediaBlobUrl);
        console.log(mediaBlobUrl);
        const response = await fetch(mediaBlobUrl);
        console.log(response);
        try {
            const response = await fetch(mediaBlobUrl);
            console.log(response);
    
            const blob = await response.blob();
    
            // Get the Blob's metadata (e.g., type, lastModified) from the original Blob
            const metadata = { type: blob.type, lastModified: blob.lastModified };
    
            // Create a new File object from the Blob and metadata
            const file = new File([blob], 'videoFile.mp4', metadata);
            console.log(file);
    
            // Create a FormData object and append the file to it
            const formData = new FormData();
            formData.append("file", file);
    
            // Now you can log or use formData
            console.log(formData);
    
            // Assuming apiUploadFile.uploadFile is an asynchronous function
            await apiUploadFile.uploadFile(formData);
        } catch (error) {
            console.error('Error fetching and converting to file:', error);
        }
    };

    const handleStartRecording = () => {
        startRecording();
        setRecordedVideo(null);

        // Bắt đầu bộ đếm thời gian
        const timerId = setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);

        // Lưu ID của bộ đếm trong state (để có thể dừng nó sau khi ghi kết thúc)
        setRecordingTimerId(timerId);
    };

    return (
        <div className="main-layout">
            <LoadingComponent loading={loading} />
            <Nav />
            <div className="main-layout__container">
                <div className="main-layout__side-bar" style={simpleMenu ? { width: '50px' } : {}}>
                    <div className="main-layout__header-bar">
                        <HeaderBar disableSearch={true} />
                    </div>
                    <div className="main-layout__content" >
                        <Button
                            className="setupMenu-button"
                            icon={simpleMenu ? <ArrowRightOutlined style={{ color: 'blue' }} /> : <ArrowLeftOutlined style={{ color: 'blue' }} />}
                            onClick={() => setSimpleMenu(!simpleMenu)}
                            style={simpleMenu ? { left: '80px' } : { left: '320px' }}
                        />
                        <MenuAdmin setVideoTNV={setVideoTNV} />
                    </div>
                </div>
                <div className="main-layout__children flex-center">
                    {videoTNV ?
                        <div className="contact">
                            <div className="contact-panel__header">
                                <div className="list-contact__selection">
                                    <VideoCameraAddOutlined />
                                    <div className="list-contact__content">Quay video dành cho tình nguyện viên</div>
                                </div>
                            </div>
                            <div className="contact-panel__details">
                                <div>
                                    <Webcam audio={false} ref={webcamRef} />
                                    <div>
                                        <Button onClick={handleStartRecording} disabled={status === 'recording'}>
                                            Bắt đầu quay {recordingTime !== 0 && <p style={{ color: 'red' }}>{formatTime(recordingTime)}</p>}
                                        </Button>
                                        <Button onClick={handleStopRecording} disabled={status !== 'recording'}>
                                            Dừng quay
                                        </Button>
                                        <Button onClick={handleDownload} disabled={!mediaBlobUrl}>
                                            Tải về
                                        </Button>
                                        <Button onClick={handleViewRecordedVideo} disabled={!mediaBlobUrl}>
                                            Xem lại video
                                        </Button>
                                        {duration && <p>Thời gian quay: {duration.toFixed(2)} giây</p>}
                                    </div>
                                    {recordedVideo && (
                                        <div>
                                            <p>Xem lại video:</p>
                                            <video controls width="400">
                                                <source src={recordedVideo} type="video/webm" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="contact">
                            <div className="contact-panel__header">
                                <div className="list-contact__selection">
                                    <AuditOutlined />
                                    <div className="list-contact__content">Danh sách cần phê duyệt</div>
                                </div>
                            </div>
                            <div className="contact-panel__details">
                                <div className="list-contact__length">
                                    Số lượng yêu cầu: {listAccept?.length || 0}
                                </div>
                                <div className="list-contact__all">
                                    {listAccept?.length ?
                                        listAccept.map((item, index) => (<>
                                            <div className="card-wrapper" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                                                <div className="conversation__content">
                                                    <img
                                                        src="https://picsum.photos/230"
                                                        alt=""
                                                        className="conversation__img"
                                                    />
                                                    <div className="conversation__main">
                                                        <h4 className="conversation__name">{item.name}</h4>
                                                    </div>
                                                    <div className="contact_button">
                                                        <button className="contact_button-deny" onClick={() => { }}>Từ chối</button>
                                                        <button className="contact_button-accept" onClick={() => { }}>Đồng ý</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>
                                        ))
                                        :
                                        <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', paddingLeft: '15px' }}>
                                            <Empty description="Không có yêu cầu phê duyệt nào." />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;