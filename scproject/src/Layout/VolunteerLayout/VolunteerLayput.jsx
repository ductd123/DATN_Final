import React, { useState, useEffect, useRef } from "react";
import { Nav } from "../../Component";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import { HistoryOutlined, VideoCameraAddOutlined, WarningFilled } from "@ant-design/icons";
import Webcam from "react-webcam";
import { Button, DatePicker, FloatButton, Modal, Select, Tooltip, message } from "antd";
import { useReactMediaRecorder } from "react-media-recorder";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import './VolunteerLayout.scss'
import TableData from "./TableData";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
function normalizeString(inputString) {
    let lowercasedString = inputString.toLowerCase();
    let strippedString = lowercasedString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let alphanumericString = strippedString.replace(/[^a-z0-9]/g, "");
    return alphanumericString;
}

const VolunterLayout = () => {
    const [loading, setLoading] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingTimerId, setRecordingTimerId] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [recordPage, setRecordedPage] = useState(true);
    const [topicInit, setTopicInit] = useState();
    const [vocabInit, setVocabInit] = useState();
    const [vocabOption, setVocabOption] = useState();
    const [model, setModel] = useState(null);
    const [showDetail, setShowDetail] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [showFilter, setShowFilter] = useState(false);
    const [showPreviewRecord, setShowPreviewRecord] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [viewImg, setViewImg] = useState(true);
    const { status, startRecording, stopRecording, mediaBlobUrl, duration } = useReactMediaRecorder({
        video: true,
        audio: false
    });
    const [content, setContent] = useState();
    const [filter, setFilter] = useState({
        page: 1,
        size: 999999,
        volunteerEmail: "caominhducpx@gmail.com",
        // topic: "",
        // vocab: "",
        ascending: true,
        // orderBy: "",
        // createdFrom: "",
        // createdTo: ''
    });
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const previewRef = useRef(null);
    useEffect(() => {
        getTopic();
        getTableData();
        // async function loadModel() {
        //     const loadedModel = await tf.loadLayersModel("../../assets/moduleAI/mymodel.h5");
        //     setModel(loadedModel);
        // }
        // loadModel();
        runcoco();
        // async function loadModel() {
        //     const loadedModel = await tf.loadGraphModel("/src/assets/moduleAI/mymodel.h5");
        //     setModel(loadedModel);
        // }
        // loadModel();
    }, [])

    useEffect(() => {
        previewRef.current = recordedVideo;
    }, [recordedVideo]);
    useEffect(() => {
        detect();
    }, [model]);
    useEffect(() => {
        if (recordingTime > 5) {
            stopRecording();
            clearInterval(recordingTimerId);
            setRecordingTime(0);
        }
    }, [recordingTime]);
    const runcoco = async () => {
        const net = await cocossd.load();
        setInterval(() => {
            detect(net);
        }, 10)
    }
    const detect = async (net) => {
        if (typeof webcamRef.current != "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            const obj = await net.detect(video);
            // console.log(obj);
            const ctx = canvasRef.current.getContext('2d');
            drawReact(obj, ctx);
        }
    }
    const getTableData = async () => {
        setLoading(true);
        try {
            setLoading(false);
            let response = await apiLearning.getTableDataVolunteer(filter);
            setDataTable(response.data);
        } catch (error) {
            setLoading(false);
        }
    }
    const drawReact = (detections, ctx) => {
        detections.forEach(prediction => {
            const [x, y, width, height] = prediction['bbox'];
            const text = prediction['class'];

            const color = 'green';
            ctx.strokeStyle = color;
            ctx.font = '18px Arial';
            ctx.fillStyle = color;

            ctx.beginPath();
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height)
            ctx.stroke()
        })
    }
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
                    text: element.content,
                })
            });
            setTopicInit(items);

        } catch (error) {
            setLoading(false);
        }
    }
    const detectObjects = async () => {
        if (webcamRef.current && model) {
            // Capture a frame from the webcam
            const image = webcamRef.current.getScreenshot();

            // Preprocess the image (optional)

            // Perform prediction using the model
            const prediction = await model.predict(image);

            // Update state with the predictions
            setPredictions(prediction);
        }
    };
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
        setViewImg(false);
        clearInterval(recordingTimerId);
        setRecordingTime(0);
        try {
            await fetch(recordedVideo);
        } catch (error) {
            console.error("Error fetching video binary:", error);
        }
    };

    const handleCapture = async () => {
        setViewImg(true);
        setImageSrc(webcamRef.current.getScreenshot());
    };

    const convertToBlob = async (base64Data) => {
        const response = await fetch(base64Data);
        const blob = await response.blob();
        const metadata = { type: blob.type, lastModified: blob.lastModified };
        const file = new File([blob], `captured_image_${Date.now()}.jpg`, metadata);
        return file;
    };

    const handleDownload = async () => {
        try {
            let link = ''
            const formData = new FormData();
            if (viewImg) {
                // const blobUrl = `data:image/jpeg;base64,${imageSrc}`;
                const file = await convertToBlob(imageSrc);
                formData.append("file", file);
                // console.log(file);
                link = await apiUploadFile.uploadFile(formData);
            }
            else {
                const response = await fetch(mediaBlobUrl);
                const blob = await response.blob();
                const metadata = { type: blob.type, lastModified: blob.lastModified };
                const file = new File([blob], `volunteer_${showDetail.name}.mp4`, metadata);
                formData.append("file", file);
                link = await apiUploadFile.uploadFile(formData);
            }
            if (link) {
                setLoading(true);
                try {
                    const data = {
                        videoUrl: link,
                    }
                    let response = await apiUploadFile.checkAI(data);
                    setLoading(false);
                    if (normalizeString(response.content) === normalizeString(content)) {
                        let body = {
                            dataLocation: link,
                            vocab_id: showDetail.id,
                        }
                        await apiUploadFile.sendData(body);
                        message.success(`Thêm dữ liệu cho ${showDetail.name} thành công.`)
                    }
                    else {
                        message.error(`AI nhận diện dữ diệu không hợp lệ (là ${response.content}), vui lòng thử lại`)
                    }
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
        if (x.videoLocation === "") {
            videoRef.current = null;
        }
        setShowDetail({
            id: x.id,
            type: x.imageLocation !== "" ? 1 : 2,
            preview: x.imageLocation !== "" ? x.imageLocation : x.videoLocation,
            name: x.content
        })
        try {
            if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play();
            }

        } catch (error) {

        }
        setContent(x.content);
    }

    const handleStartRecording = () => {
        startRecording();
        setViewImg(false)
        setRecordedVideo(null);
        const timerId = setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);
        setRecordingTimerId(timerId);
    };

    const onChangeFilter = (property, value) => {
        setFilter({
            ...filter,
            [property]: value
        })
    }

    const xemLaiData = (link) => {
        setRecordedVideo(link);
        setShowPreviewRecord(true);
    }
    return (
        <div className="main-layout">
            <LoadingComponent loading={loading} />
            <Nav />
            {recordPage ? <Tooltip title="Nội dung đã đăng tải" placement="left" trigger="hover" color="#4096ff" >
                <FloatButton
                    style={{
                        right: 34,
                    }}
                    type="primary"
                    icon={<HistoryOutlined />}
                    onClick={() => setRecordedPage(false)}
                />
            </Tooltip>
                : <Tooltip title="Quay video ngôn ngữ ký tự" placement="left" trigger="hover" color="#4096ff" >
                    <FloatButton
                        style={{
                            right: 34,
                        }}
                        type="primary"
                        icon={<VideoCameraAddOutlined />}
                        onClick={() => setRecordedPage(true)}
                    />
                </Tooltip>
            }
            {recordPage ? <div className="contact" style={{ height: '100%' }}>
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

                            {showDetail?.type === 2 && <video ref={videoRef} key={videoRef} controls className="record-container-child-video">
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
                            <canvas
                                ref={canvasRef}
                                style={{
                                    position: 'fixed',
                                    top: 0
                                }}
                            />
                            {/* <button onClick={detectObjects}>Detect Objects</button>
                            <div>
                                {predictions.map((prediction, index) => (
                                    <div key={index}>{prediction}</div>
                                ))}
                            </div> */}
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
                            <Button onClick={handleCapture} disabled={!showDetail}>
                                Chụp ảnh
                            </Button>
                            <Button onClick={handleDownload} disabled={!mediaBlobUrl && !imageSrc}>
                                Tải lên
                            </Button>
                            <Button onClick={handleViewRecordedVideo} disabled={!mediaBlobUrl && !imageSrc}>
                                Xem lại file
                            </Button>
                            {duration && <p>Thời gian quay: {duration.toFixed(2)} giây</p>}
                        </div>
                    </div>
                </div>
            </div>
                : <div className="contact" style={{ height: '100%' }}>
                    <div className="contact-panel__header">
                        <div className="list-contact__selection">
                            <VideoCameraAddOutlined />
                            <div className="list-contact__content">Nội dung tình nguyện viên đã đăng tải</div>
                        </div>
                        <div style={{ padding: 20, overflow: 'auto', height: 'calc(100vh - 44px)' }}>
                            <Button
                                type="primary"
                                style={{ fontWeight: 500, marginBottom: 10 }}
                                onClick={() => {
                                    getTableData();
                                    setShowFilter(false);
                                }} >
                                Tìm kiếm
                            </Button>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                                <Select style={{ width: 200 }} placeholder="Chọn chủ đề" options={topicInit} onChange={onChooseTopic} />
                                <Select style={{ width: 200 }} placeholder="Chọn từ vựng" options={vocabOption} onChange={(e) => onChangeFilter('vocab', e)} />
                                <DatePicker
                                    style={{
                                        width: '100%',
                                    }}
                                    format="DD/MM/YYYY"
                                    placeholder="Thời gian đăng từ"
                                    onChange={(e) => {
                                        const year = e?.$y;
                                        const month = (e?.$M + 1).toString().padStart(2, '0');
                                        const day = (e?.$D).toString().padStart(2, '0');

                                        onChangeFilter('createTo', `${year}-${month}-${day}`);
                                    }}
                                />
                                <DatePicker
                                    style={{
                                        width: '100%',
                                    }}
                                    format="DD/MM/YYYY"
                                    placeholder="Thời gian đăng đến"
                                    onChange={(e) => {
                                        const year = e?.$y || 2000;
                                        const month = (e?.$M + 1).toString().padStart(2, '0');
                                        const day = (e?.$D || '01').toString().padStart(2, '0');

                                        onChangeFilter('createFrom', `${year}-${month}-${day}`);
                                    }}
                                />
                            </div>
                            <TableData xemLaiData={xemLaiData} data={dataTable} />
                        </div>
                    </div>
                </div>
            }
            <Modal
                open={showPreviewRecord}
                onClose={() => setShowPreviewRecord(false)}
                onCancel={() => setShowPreviewRecord(false)}
                footer={[]}
                title={viewImg ? "Xem lại ảnh: " : "Xem lại video"}
                key={recordedVideo}
            >
                {!viewImg ? <div>
                    <video ref={previewRef} controls width="100%">
                        <source src={recordedVideo} type="video/webm" />
                        video không hỗ trợ cho trình duyệt này.
                    </video>
                </div>
                    :
                    <div>
                        <img src={imageSrc} alt="Captured" />
                    </div>}
            </Modal>
        </div>
    );
}

export default VolunterLayout;
