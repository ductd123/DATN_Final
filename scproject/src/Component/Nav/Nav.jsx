import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { MessageCircle, Book, LogOut, Video, BookOpen, Edit } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import MenuProfile from "./MenuProfile/MenuProfile";
import { BookOutlined, CommentOutlined, LaptopOutlined, LoadingOutlined, PlusOutlined, ReadOutlined, TeamOutlined, UnderlineOutlined, UnorderedListOutlined, UploadOutlined } from "@ant-design/icons";

import LoadingComponent from "../Common/Loading/Loading";
import apiUser from "../../Services/apiUser";
import { setDataUser } from "../../Redux/slice/userDataSlice";
import { message } from "antd";
import HelperLogOut from "../../helpers/Logout";
// import moment from "moment";



export default function Nav() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user)
  // const time = moment(new Date(data.exp * 1000)).format(
  //   "MMMM Do YYYY, h:mm:ss a"
  // );
  // console.log(time);

  const [isShowMenuProfile, setIsShowMenuProfile] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
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
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
      setLoading(false);
    }
  }
  const handleShowMenuProfile = () => {
    setIsShowMenuProfile(!isShowMenuProfile);
  };

  const testRequest = async () => {
    let data = {
      page: 1,
      size: 10,
      text: "Duc",
      ascending: true,
    }
    try {
      let response = await apiUser.requestAddFr(1);
      const items = [];
      setLoading(false)
      setTimeout(() => {
        console.log(response);
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
      setLoading(false);
    }
  }

  const testGet = async () => {
    let data = {
      page: 1,
      size: 10,
      text: "Duc",
      ascending: true,
    }
    try {
      let response = await apiUser.listRequestAddFr();
      const items = [];
      setLoading(false)
      setTimeout(() => {
        console.log(response);
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
      setLoading(false);
    }
  }
  return (
    <nav className="nav">
      <LoadingComponent loading={loading} />
      <div className="nav__profile">
        <img
          src="https://picsum.photos/200"
          alt=""
          className="nav__img"
          onClick={handleShowMenuProfile}
        />
        {isShowMenuProfile && <MenuProfile fetchData={fetchData} />}
      </div>
      <ul className="nav__ul">
        <NavLink to="/home" className="nav__link">
          <li className={pathName === "/" || pathName === "/home" ? "nav__li nav__li--choose" : "nav__li"} >
            <CommentOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
        <NavLink to="/contact" className="nav__link">
          <li className={pathName === "/contact" ? "nav__li nav__li--choose" : "nav__li"}>
            <TeamOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
        <NavLink to="/volunteers" className="nav__link">
          <li className={pathName === "/volunteers" ? "nav__li nav__li--choose" : "nav__li"} >
            <ReadOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
        <NavLink to="/exam" className="nav__link">
          <li className={pathName === "/exam" ? "nav__li nav__li--choose" : "nav__li"} >
            <LaptopOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>

        <NavLink to="/admin" className="nav__link">
          <li className={pathName === "/admin" ? "nav__li nav__li--choose" : "nav__li"}>
            <UploadOutlined style={{ fontSize: '1.5rem' }} />
          </li>
        </NavLink>
      </ul>
      <LogOut className="nav__logout" onClick={() => HelperLogOut()} />
    </nav>
  );
}
