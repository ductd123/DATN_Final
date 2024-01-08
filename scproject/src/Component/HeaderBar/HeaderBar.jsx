import React, { useEffect, useState } from "react";
import "./HeaderBar.scss";
import { useSelector } from "react-redux";
import { Button, Empty, Input, Modal } from "antd";
import apiUser from "../../Services/apiUser";
import { SearchOutlined } from "@ant-design/icons";
import LoadingComponent from "../Loading/Loading";

export default function HeaderBar() {
  const userData = useSelector((state) => state.userData.userData)
  const [resultSearch, setResultSearch] = useState();
  const [value, setValue] = useState('');
  const [headerName, setHeaderName] = useState('');
  const [showInfo, setShowInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setHeaderName(userData?.name);
  }, []);
  const onSearch = async () => {
    setLoading(true);
    let data = {
      page: 1,
      size: 10,
      text: value || '',
      ascending: true,
    }
    let response = await apiUser.searchUser(data);
    setTimeout(() => {
      setLoading(false);
      const data = response.data.map((item) => ({
        email: item.email,
        name: item.name,
        id: 1,
      }));
      setResultSearch(data);
    }, 500);
  };
  const handleChangeValue = (newValue) => {
    setValue(newValue);
    setResultSearch();
  };

  const onSelectUser = async (id) => {
    setLoading(true);
    let response = await apiUser.getUserById(id);
    setShowInfo(true);
    setTimeout(() => {
      setLoading(false);
      setUserInfo(response)
    }, 500);
  };

  const requestAddFriend = async (id) => {

    setLoading(true);
    let response = await apiUser.requestAddFr(1);
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
      setLoading(false);
      setUserInfo(response)
    }, 500);
  }

  return (
    <div className="header-bar" >
      <LoadingComponent loading={loading} />
      {resultSearch?.length !== 0 && <div className="search" >
        {(resultSearch || []).map((d) => (
          <div onClick={() => onSelectUser(d.id)} className="search-result flex-center">
            <div className="search-result-header">{d.name}</div>
            <img className="search-result-img" src="https://picsum.photos/204"></img>
          </div>
        ))}
      </div>}
      {resultSearch?.length === 0 && <div className="search" >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />
      </div>}
      <h4 className="header-bar__name">WeTalk - {headerName}</h4>
      <form className="header-bar__form">
        {/* <input className="header-bar__input" placeholder="Search..." /> */}
        <Input placeholder='Tìm kiếm bạn bè...' onChange={(e) => handleChangeValue(e.target.value)} style={{ width: '90%' }} />
        <Button onClick={onSearch} type="primary" className="header-bar__btn" icon={<SearchOutlined style={{ fontSize: '1.25rem' }} />} />
      </form>
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
          <img style={{ width: '100%' }} src="https://picsum.photos/204"></img>
        </div>
        <div className="nav-userInfo-header">
          <img src="https://picsum.photos/200" className="nav-userInfo-header-avt"></img>
          <span className="nav-userInfo-header-name">{userInfo?.name || "Chưa có thông tin"}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#efefef', borderRadius: '4px' }}></div>
        <div className="nav-userInfo-detail">
          <span className="nav-userInfo-detail-header">Thông tin cá nhân</span>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Giới tính</span>
            <span className="nav-userInfo-detail-items-content">{userInfo?.gender || "Chưa có thông tin"}</span>
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
