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
// export default function ListContact() {
//   // const reduxListUser = useSelector((state) => state.reduxListUser);
//   // const reduxUserData = useSelector((state) => state.reduxUserData);
//   // const reduxConversation = useSelector((state) => state.reduxConversation);
//   const dispatch = useDispatch();

//   // const history = useHistory();
//   const location = useLocation();
//   const pathName = location.pathname;
//   const handleCreateConversation = (id) => {
//     // const dataUser = {};
//     // apiConversation.postCreateConversation(dataUser).then((res) => {
//     // });
//   };

//   // useEffect(() => {
//   //   dispatch(doGetAllUser());
//   // }, [dispatch]);

//   return (

//     <div className="list-contact">
//       {/* <HeaderList title="Your friends" />
//       {Array.from({ length: 10 }).map((item, i) => {
//         return (
//           <div
//             className="list-contact__content"
//             key={i}
//           // onClick={() => handleCreateConversation(item.id)}
//           >
//             <img src="https://picsum.photos/200" alt="" className="list-contact__img" />
//             <div className="list-contact__main">
//               <h4 className="list-contact__name">Oliver người yêu {i + 1}</h4>
//               <span className="list-contact__email">fboy@gmail.com</span>
//             </div>
//           </div>
//         );
//       })} */}
//       <NavLink to="/friend" className="list-contact__selection">
//         <i className="fa-regular fa-user fa-lg"></i>
//         <div className="list-contact__content">Danh sách bạn bè</div>
//       </NavLink>
// <NavLink to="/group" className="list-contact__selection">
//   <Users/>
//   <div className="list-contact__content">Danh sách nhóm</div>
// </NavLink>
// <NavLink to="/add-request" className="list-contact__selection">
//   <i className="fa-regular fa-envelope-open"></i>
//   <div className="list-contact__content">Lời mời kết bạn</div>
// </NavLink>
//     </div>
//   );
// }
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
  getItem(
    <NavLink to="/group" className="list-contact__menu">
      <Users style={{fontSize:'1.25rem'}}/>
      <div className="list-contact__content">Danh sách nhóm</div>
    </NavLink>
  ),
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