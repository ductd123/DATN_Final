import React, { useState } from "react";
import "./MenuProfile.scss";
import { Edit, LogOut } from "react-feather";
import HelperLogOut from "../../../helpers/Logout";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Drawer, Form, Input, Modal, Select, Space, Upload, message } from "antd";
import Button from "../../Common/Button/Button";
import { Option } from "antd/es/mentions";
import bg from '../../../assets/image/wallhaven-o5762l_2560x1440.png';
import { useSelector } from "react-redux";
import apiUser from "../../../Services/apiUser";
import dayjs from "dayjs";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 8;
  if (!isLt2M) {
    message.error('Image must smaller than 8MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function MenuProfile() {
  const userData = useSelector((state) => state.userData.userData)
  const [showInfo, setShowInfo] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [userInfoUpdate, setUserInfoUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState()

  const onCloseInfo = () => {
    setShowInfo(false);
  }

  const onCloseUpdateInfo = () => {
    setShowUpdateInfo(false)
  }
  const openUpdateInfo = () => {
    setShowInfo(false);
    setShowUpdateInfo(true);
  }
  const onUpdateInfo = async () => {
    setLoading(true);
    let data = {
      name: userInfoUpdate.name,
      address: userInfoUpdate.address,
      phoneNumber: userInfoUpdate.phoneNumber,
      gender: userInfoUpdate.gender,
      birthDay: userInfoUpdate.birthDay,
    }
    try {
      let response = await apiUser.updateUser(data);
      setLoading(false)
      setTimeout(() => {
        console.log(response);
        message.success('Cập nhật thông tin thành công.');
        setUserInfoUpdate({});
        setShowUpdateInfo(false);
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error('Đã xảy ra lỗi, vui lòng thử lại');
    }
  }

  const handleChangeUpload = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleValueChange = (property, value) => {
    setUserInfoUpdate({
      ...userInfoUpdate,
      [property]: value,
    })
  }
  return (
    <div className="menu-profile">
      <ul className="menu-profile__menu">
        <li onClick={() => { setShowInfo(true) }} className="menu-profile__list">
          <Edit className="menu-profile__icon" />Thông tin cá nhân
        </li>
        <li className="menu-profile__list">
          <LogOut className="menu-profile__icon" onClick={() => HelperLogOut()} /> Đăng xuất
        </li>
      </ul>
      <Modal
        open={showInfo}
        onOk={openUpdateInfo}
        onCancel={onCloseInfo}
        okText="Cập nhật thông tin"
        cancelText="Đóng"
        title="Thông tin cá nhân"
        style={{ top: 20 }}
      >
        <div className="nav-userInfo-background">
          <img style={{ width: '100%' }} src={bg}></img>
        </div>
        <div className="nav-userInfo-header">
          <img src="https://picsum.photos/200" className="nav-userInfo-header-avt"></img>
          <span className="nav-userInfo-header-name">{userData.name}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#efefef', borderRadius: '4px' }}></div>
        <div className="nav-userInfo-detail">
          <span className="nav-userInfo-detail-header">Thông tin cá nhân</span>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Giới tính</span>
            <span className="nav-userInfo-detail-items-content">{userData?.gender || "Chưa có thông tin"}</span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Ngày sinh</span>
            <span className="nav-userInfo-detail-items-content">{userData?.birthDay || "Chưa có thông tin"}</span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Điện thoại</span>
            <span className="nav-userInfo-detail-items-content">{userData?.phoneNumber || "Chưa có thông tin"}</span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Email</span>
            <span className="nav-userInfo-detail-items-content">{userData?.email || "Chưa có thông tin"}</span>
          </div>
        </div>
      </Modal>
      <Drawer
        title="Cập nhật thông tin"
        onClose={onCloseUpdateInfo}
        open={showUpdateInfo}
        // styles={{
        //   body: {
        //     paddingBottom: 80,
        //   },
        // }}
        extra={
          <Space>
            <Button onClick={onCloseUpdateInfo} className='ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-default'>Hủy</Button>
            <Button onClick={onUpdateInfo} className='ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-primary'>Cập nhật</Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>

          <Form.Item
            name="Ảnh đại diện"
            label="Ảnh đại diện"
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChangeUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
                message: 'Please enter user name',
              },
            ]}
          >
            <Input value={userData.name} placeholder="Nhập tên của bạn" onChange={(e) => handleValueChange('name', e.target.value)} />
          </Form.Item>
          <Form.Item
            name="numberPhone"
            label="Số điện thoại"
          >
            <Input placeholder="Nhập SĐT của bạn" onChange={(e) => handleValueChange('phoneNumber', e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Ngày sinh"
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              format="DD/MM/YYYY"
              defaultValue={dayjs(userData.birthDay || '01/01/2000', "DD/MM/YYYY")}
              placeholder={userData?.birthDay || "Chọn ngày sinh của bạn"}
              // onChange={(e) => handleValueChange('birthDay', `${e.$D}/${e.$M + 1}/${e.$y}`)}
              onChange={(e) => handleValueChange('birthDay', e.$d)}
            />
          </Form.Item>

          <Form.Item
            name="Giới tính"
            label="Giới tính"
            rules={[
              {
                required: true,
                message: 'Chọn giới tính của bạn',
              },
            ]}
          >
            <Select placeholder="Chọn giới tính của bạn" onChange={(e) => handleValueChange('gender', e)}>
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="FEMALE">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input placeholder="Nhập địa chỉ của bạn" onChange={(e) => handleValueChange('address', e.target.value)} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
