import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { LogOut, } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import MenuProfile from "./MenuProfile/MenuProfile";
import { CommentOutlined, LaptopOutlined, ReadOutlined, SafetyCertificateOutlined, SettingOutlined, TeamOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import blank from '../../assets/image/AvtBlank.jpg';
import LoadingComponent from "../Common/Loading/Loading";
import apiUser from "../../Services/apiUser";
import { setDataUser } from "../../Redux/slice/userDataSlice";
import { Tooltip, message } from "antd";
import HelperLogOut from "../../helpers/Logout";



export default function Nav() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.userData.userData)
  const [isShowMenuProfile, setIsShowMenuProfile] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        let response = await apiUser.getUserInfo();
        const items = [];
        setLoading(false)
        setTimeout(() => {
          dispatch(setDataUser(response))
          setLoading(false);
        }, 500);
      }
      catch (error) {
        console.log(error);
        setLoading(false);
        message.warning("Xác thực tài khoản lỗi, vui lòng thử lại.")
        setLoading(false);
      }
    }
  }
  const handleShowMenuProfile = () => {
    if (userData) {
      setIsShowMenuProfile(!isShowMenuProfile);
    };
  }

  return (
    <nav className="nav">
      <LoadingComponent loading={loading} />
      <div className="nav__profile">
        <img
          src={userData?.avatarLocation || blank}
          alt=""
          className="nav__img"
          onClick={handleShowMenuProfile}
        />
        {isShowMenuProfile && <MenuProfile fetchData={fetchData} />}
      </div>
      <ul className="nav__ul">
        {userData && <NavLink to="/" className="nav__link">
          <Tooltip title="Trò chuyện" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/" || pathName === "/" ? "nav__li nav__li--choose" : "nav__li"} >
              <CommentOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>}
        {userData && <NavLink to="/contact" className="nav__link">
          <Tooltip title="Bạn bè" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/contact" ? "nav__li nav__li--choose" : "nav__li"}>
              <TeamOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>}
        <NavLink to="/learn" className="nav__link">
          <Tooltip title="Học tập" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/learn" ? "nav__li nav__li--choose" : "nav__li"} >
              <ReadOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>
        <NavLink to="/exam" className="nav__link">
          <Tooltip title="Kiểm tra" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/exam" ? "nav__li nav__li--choose" : "nav__li"} >
              <LaptopOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>
        <NavLink to="/volunteer" className="nav__link">
          <Tooltip title="Thu thập dữ liệu người dùng" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/volunteer" ? "nav__li nav__li--choose" : "nav__li"}>
              <VideoCameraAddOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>
        {userData?.role && <NavLink to="/admin" className="nav__link">
          <Tooltip title="Admin" placement="right" trigger="hover" color="#108ee9" >
            <li className={pathName === "/admin" ? "nav__li nav__li--choose" : "nav__li"}>
              <SafetyCertificateOutlined style={{ fontSize: '1.5rem' }} />
            </li>
          </Tooltip>
        </NavLink>}
      </ul>
      <Tooltip title={userData !== null ? "Đăng xuất" : "Đăng nhập"} placement="right" trigger="hover" color="#108ee9" >
        <LogOut className="nav__logout" onClick={() => HelperLogOut()} />
      </Tooltip>
    </nav>
  );
}
