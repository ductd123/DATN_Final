import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { LogOut, } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import MenuProfile from "./MenuProfile/MenuProfile";
import { CommentOutlined, LaptopOutlined, ReadOutlined, SettingOutlined, TeamOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import blank from '../../assets/image/AvtBlank.jpg';
import LoadingComponent from "../Common/Loading/Loading";
import apiUser from "../../Services/apiUser";
import { setDataUser } from "../../Redux/slice/userDataSlice";
import { message } from "antd";
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
        message.warning("Bạn đang sử dụng WeTalk mà không đăng nhập")
        setLoading(false);
      }
    }
  }
  const handleShowMenuProfile = () => {
    setIsShowMenuProfile(!isShowMenuProfile);
  };

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
          <li className={pathName === "/" || pathName === "/" ? "nav__li nav__li--choose" : "nav__li"} >
            <CommentOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>}
        {userData && <NavLink to="/contact" className="nav__link">
          <li className={pathName === "/contact" ? "nav__li nav__li--choose" : "nav__li"}>
            <TeamOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>}
        <NavLink to="/learn" className="nav__link">
          <li className={pathName === "/learn" ? "nav__li nav__li--choose" : "nav__li"} >
            <ReadOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
        <NavLink to="/exam" className="nav__link">
          <li className={pathName === "/exam" ? "nav__li nav__li--choose" : "nav__li"} >
            <LaptopOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
        {/* <NavLink to="/volunteer" className="nav__link">
          <li className={pathName === "/volunteer" ? "nav__li nav__li--choose" : "nav__li"}>
            <VideoCameraAddOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink> */}
        {userData?.role && <NavLink to="/admin" className="nav__link">
          <li className={pathName === "/admin" ? "nav__li nav__li--choose" : "nav__li"}>
            <SettingOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>}
      </ul>
      <LogOut className="nav__logout" onClick={() => HelperLogOut()} />
    </nav>
  );
}
