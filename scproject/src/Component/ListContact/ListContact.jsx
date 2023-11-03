import React, { useEffect } from "react";
import "./ListContact.scss";
import HeaderList from "../Common/HeaderList/HeaderList";
// import { doGetAllUser } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { apiConversation } from "../../Services";
import { NavLink } from "react-router-dom";
import { User, UserPlus, Users } from "react-feather";
import { useLocation } from "react-router-dom";
export default function ListContact() {
  // const reduxListUser = useSelector((state) => state.reduxListUser);
  // const reduxUserData = useSelector((state) => state.reduxUserData);
  // const reduxConversation = useSelector((state) => state.reduxConversation);
  const dispatch = useDispatch();

  // const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const handleCreateConversation = (id) => {
    // const dataUser = {};
    // apiConversation.postCreateConversation(dataUser).then((res) => {
    // });
  };

  // useEffect(() => {
  //   dispatch(doGetAllUser());
  // }, [dispatch]);

  return (

    <div className="list-contact">
      {/* <HeaderList title="Your friends" />
      {Array.from({ length: 10 }).map((item, i) => {
        return (
          <div
            className="list-contact__content"
            key={i}
          // onClick={() => handleCreateConversation(item.id)}
          >
            <img src="https://picsum.photos/200" alt="" className="list-contact__img" />
            <div className="list-contact__main">
              <h4 className="list-contact__name">Oliver người yêu {i + 1}</h4>
              <span className="list-contact__email">fboy@gmail.com</span>
            </div>
          </div>
        );
      })} */}
      <NavLink to="/friend" className="list-contact__selection">
        <i className="fa-regular fa-user fa-lg"></i>
        <div className="list-contact__content">Danh sách bạn bè</div>
      </NavLink>
      <NavLink to="/group" className="list-contact__selection">
        <Users/>
        <div className="list-contact__content">Danh sách nhóm</div>
      </NavLink>
      <NavLink to="/add-request" className="list-contact__selection">
        <i className="fa-regular fa-envelope-open"></i>
        <div className="list-contact__content">Lời mời kết bạn</div>
      </NavLink>
    </div>
  );
}
