import { useState, useEffect } from "react";
import { HeaderBar, MenuTakingExam, Nav } from "../../Component";
import { Empty, message } from "antd";
import './AdminLayout.scss';
import LoadingComponent from "../../Component/Common/Loading/Loading";
import MenuAdmin from "../../Component/MenuAdmin/MenuAdmin";
import { AuditOutlined } from "@ant-design/icons";



const AdminLayout = () => {
    const [listAccept, setListAccept] = useState({})
    const [loading, setLoading] = useState(false)
    return (
        <div className="main-layout">
            <LoadingComponent loading={loading} />
            <Nav />
            <div className="main-layout__container">
                <div className="main-layout__side-bar">
                    <div className="main-layout__header-bar">
                        <HeaderBar disableSearch={true} />
                    </div>
                    <div className="main-layout__content">
                        <MenuAdmin />
                    </div>
                </div>
                <div className="main-layout__children flex-center">
                    <div className="contact">
                        <div className="contact-panel__header">
                            <div className="list-contact__selection">
                                <AuditOutlined/>
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
                </div>
            </div>
        </div>);
}

export default AdminLayout;