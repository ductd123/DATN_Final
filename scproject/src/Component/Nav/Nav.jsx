import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { MessageCircle, Book, LogOut, Video, BookOpen } from "react-feather";
import { useSelector } from "react-redux";
import MenuProfile from "./MenuProfile/MenuProfile";
import HelperLogOut from "../../helpers/Logout";
import { BookOutlined, CommentOutlined, LaptopOutlined, UnderlineOutlined, UnorderedListOutlined } from "@ant-design/icons";
// import moment from "moment";

export default function Nav() {
  const location = useLocation();
  const pathName = location.pathname;
  const reduxUserData = useSelector((state) => state.userData);
  const { data } = reduxUserData.data;
  // const time = moment(new Date(data.exp * 1000)).format(
  //   "MMMM Do YYYY, h:mm:ss a"
  // );
  // console.log(time);

  const [isShowMenuProfile, setIsShowMenuProfile] = useState(false);
  const handleShowMenuProfile = () => {
    setIsShowMenuProfile(!isShowMenuProfile);
  };

  return (
    <nav className="nav">
      <div className="nav__profile">
        <img
          src="https://picsum.photos/200"
          alt=""
          className="nav__img"
          onClick={handleShowMenuProfile}
        />
        {isShowMenuProfile && <MenuProfile />}
      </div>
      <ul className="nav__ul">
        <NavLink to="/home" className="nav__link">
          <li className={pathName === "/" || pathName === "/home" ? "nav__li nav__li--choose" : "nav__li"} >
            <CommentOutlined  style={{fontSize:'1.5rem'}} />
          </li>
        </NavLink>
        <NavLink to="/contact" className="nav__link">
          <li className={pathName === "/contact" ? "nav__li nav__li--choose" : "nav__li"}>
            <UnorderedListOutlined  style={{fontSize:'1.5rem'}} />
          </li>
        </NavLink>
        <NavLink to="/volunteers" className="nav__link">
          <li className={pathName === "/volunteers" ? "nav__li nav__li--choose" : "nav__li"} >
            <Video  />
          </li>
        </NavLink>
        <NavLink to="/exam" className="nav__link">
          <li className={pathName === "/exam" ? "nav__li nav__li--choose" : "nav__li"} >
            <LaptopOutlined style={{fontSize:'1.5rem'}} />
          </li>
        </NavLink>
      </ul>
      <LogOut className="nav__logout" onClick={() => HelperLogOut()} />
    </nav>
  );
}
