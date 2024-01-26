import React, { useEffect, useState } from "react";
import "./HeaderBar.scss";
import { useSelector } from "react-redux";
import { Button, Empty, Input, Modal, message } from "antd";
import apiUser from "../../Services/apiUser";
import { SearchOutlined } from "@ant-design/icons";
import LoadingComponent from "../Common/Loading/Loading";
import logoHeader from "../../assets/image/logo.png";
import blank from '../../assets/image/AvtBlank.jpg';

export default function HeaderBar({ disableSearch }) {
  const userData = useSelector((state) => state.userData.userData)
  const [resultSearch, setResultSearch] = useState();
  const [value, setValue] = useState('');
  const [headerName, setHeaderName] = useState('');
  const [showInfo, setShowInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [showResultSearch, setshowResultSearch] = useState(false);
  useEffect(() => {
    setHeaderName(userData?.name);
  }, [userData]);
  const onSearch = async () => {
    let data = {
      page: 1,
      size: 10,
      text: value,
      ascending: true,
    }
    if (value) {
      setLoading(true);
      try {
        let response = await apiUser.searchUser(data);
        setTimeout(() => {
          setLoading(false);
          const data = response.data.map((item) => ({
            email: item.email,
            name: item.name,
            id: item.id,
          }));
          setResultSearch(data);
        }, 500);
      }
      catch (error) {
        console.log(error);
        message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
        setLoading(false);
      }
    }
  };
  const handleChangeValue = (newValue) => {
    setValue(newValue);
    setResultSearch();
  };

  const onSelectUser = async (d) => {
    console.log(d);
    setLoading(true);
    try {
      let response = await apiUser.getUserById(d.id);
      setShowInfo(true);
      setTimeout(() => {
        setLoading(false);
        setUserInfo(response)
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
      setLoading(false);
    }
  };

  const requestAddFriend = async (id) => {

    setLoading(true);
    try {
      let response = await apiUser.requestAddFr(id);
      setShowInfo(true);
      setTimeout(() => {
        setShowInfo(false);
        setLoading(false);
        message.success("Gửi lời mời kết bạn thành công.")
        setUserInfo(response)
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
      setLoading(false);
    }
  }

  return (
    <div className="header-bar" >
      <LoadingComponent loading={loading} />
      {resultSearch?.length !== 0 && <div className="search" >
        {(resultSearch || []).map((d) => (
          <div onClick={() => onSelectUser(d)} className="search-result flex-center">
            <div className="search-result-header">{d.name}</div>
            <img className="search-result-img" src={d.avatarLocation || blank}></img>
          </div>
        ))}
      </div>}
      {resultSearch?.length === 0 && <div className="search" >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />
      </div>}
      <h4 className="header-bar__name flex-center">
        <img style={{ width: '24px', marginRight: '4px' }} src={logoHeader} />
        - {headerName}
      </h4>
      {!disableSearch && <form onSubmit={(e) => e.preventDefault()} className="header-bar__form">
        {/* <input className="header-bar__input" placeholder="Search..." /> */}
        <Input
          placeholder='Tìm kiếm bạn bè...'
          onChange={(e) => { handleChangeValue(e.target.value); }}
          style={{ width: '90%' }} />
        <Button onClick={onSearch} type="primary" className="header-bar__btn" icon={<SearchOutlined style={{ fontSize: '1.25rem' }} />} />
      </form>}
      <Modal
        open={showInfo}
        onOk={() => requestAddFriend(userInfo.id)}
        onCancel={() => setShowInfo(false)}
        okText="Gửi lời mời kết bạn"
        cancelText="Đóng"
        title="Thông tin"
        style={{ top: 20 }}
      >
        <div className="nav-userInfo-background">
          <img style={{ width: '100%' }} src={"https://picsum.photos/204"}></img>
        </div>
        <div className="nav-userInfo-header">
          <img src={userInfo?.avatarLocation || "https://picsum.photos/204"} className="nav-userInfo-header-avt"></img>
          <span className="nav-userInfo-header-name">{userInfo?.name || "Chưa có thông tin"}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#efefef', borderRadius: '4px' }}></div>
        <div className="nav-userInfo-detail">
          <span className="nav-userInfo-detail-header">Thông tin cá nhân</span>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Giới tính</span>
            <span className="nav-userInfo-detail-items-content">{userInfo?.gender === "MALE" ? "Nam" : "Nữ" || "Chưa có thông tin"}</span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Điện thoại</span>
            <span className="nav-userInfo-detail-items-content">{userInfo?.phoneNumber || "Chưa có thông tin"}</span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Email</span>
            <span className="nav-userInfo-detail-items-content">{userInfo?.email || "Chưa có thông tin"}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
