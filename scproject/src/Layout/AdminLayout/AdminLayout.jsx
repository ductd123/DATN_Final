import React, { useState, useEffect, useRef } from "react";
import { HeaderBar, MenuTakingExam, Nav } from "../../Component";
import { Button, Empty, Modal, message } from "antd";
import './AdminLayout.scss';
import LoadingComponent from "../../Component/Common/Loading/Loading";
import MenuAdmin from "../../Component/MenuAdmin/MenuAdmin";
import { ArrowLeftOutlined, ArrowRightOutlined, AuditOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import VideoCall from "../../Component/VideoCall/VideoCall";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";

const AdminLayout = () => {
    const [listAccept, setListAccept] = useState({});
    const [simpleMenu, setSimpleMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoTNV, setVideoTNV] = useState(false);
    const [preview, setPreview] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [history, setHistory] = useState([]);
    const videoRef = useRef(null);
    useEffect(() => {
        initPendingData();
    }, [])
    const initPendingData = async () => {
        let response = await apiUploadFile.getPendingData();
        setListAccept(response.data)
    }
    const getHistory = async () => {
        setLoading(true);
        try {
            let response = await apiUploadFile.getApprovedData();
            setHistory(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const approvedData = async (id) => {
        try {
            setLoading(false);
            await apiUploadFile.approvedData(id);
            message.success("Đã chấp nhận dữ liệu thành công");
            initPendingData();
            getHistory();
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Kết nối không ổn định, vui lòng thử lại.")
        }
    }

    const rejectData = async (id) => {
        setLoading(true);
        try {
            setLoading(false);
            let data = {
                dataCollectionId: id,
                feedBack: ""
            }
            await apiUploadFile.rejectData(data);
            message.success("Đãtừ chối dữ liệu thành công");
            initPendingData();
        } catch (error) {
            setLoading(false);
            message.error("Kết nối không ổn định, vui lòng thử lại.")
        }
    }

    const onPreviewHistory = (item) => {
        setShowPreview(true);
        setPreview(item)
    }

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
                        <MenuAdmin getHistory={getHistory} history={history} setVideoTNV={setVideoTNV} />
                    </div>
                </div>
                <div className="main-layout__children flex-center">
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
                                                <div className="conversation__main" style={{ width: '400px' }}>
                                                    <h4 className="conversation__name" style={{ fontWeight: 600 }}>Nội dung: {item.content}</h4>
                                                    <h4 className="conversation__name">Nội dung: {item.volunteerEmail}</h4>
                                                </div>
                                                <div className="contact_button">
                                                    <Button className="contact_button-deny" key={`tuchoi ${item.id}`} onClick={() => onPreviewHistory(item)}>Xem lại</Button>
                                                    <Button className="contact_button-deny" key={`tuchoi ${item.id}`} onClick={() => rejectData(item.id)}>Từ chối</Button>
                                                    <Button className="contact_button-accept" key={`chapnhan ${item.id}`} onClick={() => approvedData(item.id)}>Đồng ý</Button>
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
                </div>
            </div>
            <Modal
                open={showPreview}
                footer={[]}
                onCancel={() => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                    setShowPreview(false)
                }}
                style={{ top: 20 }}
                title={preview?.content}
                key={preview?.id}
            >
                <video ref={videoRef} controls style={{
                    width: '100%',
                    height: 'auto',
                    marginTop: '30px',
                }}>
                    <source src={preview?.dataLocation} type="video/mp4" />
                </video>
            </Modal>
        </div>
    );
}

export default AdminLayout;
