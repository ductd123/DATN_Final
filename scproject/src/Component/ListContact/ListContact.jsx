import React, { useState } from "react";
import "./ListContact.scss";
import HeaderList from "../Common/HeaderList/HeaderList";
// import { doGetAllUser } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { apiConversation } from "../../Services";
import { Link, NavLink, redirect } from "react-router-dom";
import { Users } from "react-feather";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import { MailOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
function getItem(label) {
  return {
    label,
  };
}

const itemabc = [
  getItem(
    <NavLink to="/friend" className="list-contact__menu">
      <UserOutlined style={{fontSize:'1.25rem'}}/>
      <div className="list-contact__content">Danh sách bạn bè</div>
    </NavLink>
  ),
  // getItem(
  //   <NavLink to="/group" className="list-contact__menu">
  //     <Users style={{fontSize:'1.25rem'}}/>
  //     <div className="list-contact__content">Danh sách nhóm</div>
  //   </NavLink>
  // ),
  getItem(
    <NavLink to="/add-request" className="list-contact__menu">
      <MailOutlined style={{fontSize:'1.25rem'}}/>
      <div className="list-contact__content"> Lời mời kết bạn</div>
    </NavLink>
  ),
];
const ListContact = () => {
  const [search, setSearch] = useState(false);
  const [items, setItems] = useState(itemabc);
  const handleOpenSearch = () => {
    setSearch(true);
  }

  const handleCloseSearch = () => {
    setSearch(false);
  }
  const onClick = (e) => {
    console.log('click', e);
    redirect(`/${e.key}`)
  };

  return (
    <div className="list-contact">
      <Menu
        onClick={onClick}
        style={{
          width: '100%',
          fontSize: '16px',
        }}
        mode="inline"
        items={items}
      />
    </div>
  );
}
export default ListContact;