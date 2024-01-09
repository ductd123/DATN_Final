import React, { useEffect, useState } from "react";
import "./MenuProfile.scss";
import { Edit, LogOut } from "react-feather";
import HelperLogOut from "../../../helpers/Logout";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Drawer, Form, Input, Modal, Select, Space, Upload, message } from "antd";
import Button from "../../Common/Button/Button";
import { Option } from "antd/es/mentions";
import { useSelector } from "react-redux";
import apiUser from "../../../Services/apiUser";
import dayjs from "dayjs";
import UserInfo from "../../Common/userInfo";
import { apiUploadFile } from "../../../Services/apiLearning";
import ImgCrop from "antd-img-crop";
import Item from "antd/es/list/Item";



export default function MenuProfile() {
  const userData = useSelector((state) => state.userData.userData)
  const [showInfo, setShowInfo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [userInfoUpdate, setUserInfoUpdate] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState()
  const [fileAvt, setFileAvt] = useState();
  useEffect(() => {
    setUserInfoUpdate(userData);
  }, [userData])

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
      birthDay: userInfoUpdate.birthDay || '01/01/2000',
    }
    try {
      const formData = new FormData();
      formData.append("file", fileAvt);
      let response1 = await apiUser.uploadAvt(formData);
      let response2 = await apiUser.updateUser(data);
      setLoading(false)
      setTimeout(() => {
        message.success('Cập nhật thông tin thành công.');
        setUserInfoUpdate(userData);
        setShowUpdateInfo(false);
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error('Đã xảy ra lỗi, vui lòng thử lại');
    }
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      message.error('Image must smaller than 8MB!');
    }

    if (isJpgOrPng && isLt2M) {
      setFileAvt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        console.log("Base64 Image:", base64Image);
        if (base64Image) {
          setImageUrl(base64Image);
        } else {
          console.error("Base64 Image is undefined");
        }
      };
      reader.readAsDataURL(file);
    }

    return false;
  };
  const handleChangeUpload = async (info) => {
    if (info.file.status === "done") {
      setFileAvt(info.file.originFileObj);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        console.log("Base64 Image:", base64Image);
        if (base64Image) {
          setImageUrl(base64Image);
        } else {
          console.error("Base64 Image is undefined");
        }
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
    else if (info.file.status === "error") {
      console.error("File upload failed:", info.file.error);
    }
  };

  const handleValueChange = (property, value) => {
    setUserInfoUpdate({
      ...userInfoUpdate,
      [property]: value,
    })
  }

  const Title = ({ text }) => {
    return (
      <div style={{ fontSize: '15px', fontWeight: 500, margin: '12px 0 4px 0' }}>{text}</div>
    )
  }

  return (
    <div className="menu-profile">
      <ul className="menu-profile__menu">
        <li onClick={() => { setShowInfo(true) }} className="menu-profile__list">
          <Edit className="menu-profile__icon" />Thông tin cá nhân
        </li>
        <Button className="menu-profile__list">
          <LogOut className="menu-profile__icon" onClick={() => HelperLogOut()} /> Đăng xuất
        </Button>
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
        <UserInfo userData={userData} />
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
          <Title text="Ảnh đại diện" />
          <ImgCrop rotationSlider>
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
                    width: '100%', height: '100%', borderRadius: '50px'
                  }}
                />
              ) : (
                <button
                  style={{ border: 0, background: 'none', }}
                  type="button"
                >
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8, }}>Upload</div>
                </button>
              )}
            </Upload>
          </ImgCrop>
          <Title text="Họ và tên" />
          <Input value={userInfoUpdate?.name} placeholder="Nhập tên của bạn" onChange={(e) => handleValueChange('name', e.target.value)} />
          <Title text="Số điện thoại" />
          <Input value={userInfoUpdate?.phoneNumber} placeholder="Nhập SĐT của bạn" onChange={(e) => handleValueChange('phoneNumber', e.target.value)} />

          <Title text="Ngày sinh" />
          <DatePicker
            style={{
              width: '100%',
            }}
            format="DD/MM/YYYY"
            defaultValue={dayjs(userInfoUpdate?.birthDay || '01/01/2000', "DD/MM/YYYY")}
            placeholder={userData?.birthDay || "Chọn ngày sinh của bạn"}
            // onChange={(e) => handleValueChange('birthDay', `${e.$D}/${e.$M + 1}/${e.$y}`)}
            onChange={(e) => handleValueChange('birthDay', e.$d)}
          />

          <Title text="Giới tính" />
          <Select placeholder="Chọn giới tính của bạn" defaultValue={userInfoUpdate?.gender} style={{ width: '100%' }} onChange={(e) => handleValueChange('gender', e)}>
            <Select.Option value="MALE">Nam</Select.Option>
            <Select.Option value="FEMALE">Nữ</Select.Option>
          </Select>
          <Title text="Địa chỉ" />
          <Input placeholder="Nhập địa chỉ của bạn" value={userInfoUpdate?.address} onChange={(e) => handleValueChange('address', e.target.value)} />
        </Form>
      </Drawer>
    </div>
  );
}
