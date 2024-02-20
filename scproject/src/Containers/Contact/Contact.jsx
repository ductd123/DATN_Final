import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users } from "react-feather";
import { render } from "react-dom";
import apiUser from "../../Services/apiUser";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import { Empty, message } from "antd";
import apiChat from "../../Services/apiChat";
export default function Contact() {
  const location = useLocation();
  const pathName = location.pathname;
  const [loading, setLoading] = useState();
  const [listRequest, setListRequest] = useState();
  const [listFriends, setListFriends] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchListAddFri();
    fetchListFri();
  }, []);
  const fetchListAddFri = async () => {
    setLoading(true);
    try {
      let response = await apiUser.listRequestAddFr();
      setTimeout(() => {
        setListRequest(response.data)
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const fetchListFri = async () => {
    setLoading(true);
    try {
      let response = await apiUser.getListFriends();
      setTimeout(() => {
        setListFriends(response.data)
        setLoading(false);
      }, 500);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const onCancleFriends = async (id) => {
    setLoading(true);
    try {
      let response = await apiUser.cancelRequestAddFr(id);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      fetchListAddFri();
      fetchListFri();
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const onAcceptFriends = async (id) => {
    setLoading(true);
    try {
      let response = await apiUser.acceptRequestAddFr(id);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      fetchListAddFri();
      fetchListFri();
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const handleRouterChat = async (item) => {
    try {
      console.log(item.id);
      const response = await apiChat.getConversationIdByUserId(item.id);
      if (response) {
        setTimeout(() => {
          navigate(`/room/userId=${item.id}&&conversationId=${response.conversationId}`);
        }, 500);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra.")
    }
  }

  const fakeData = [
    { name: "Eva", avt: "https://picsum.photos/201" },
    { name: "Mia", avt: "https://picsum.photos/202" },
    { name: "Bob", avt: "https://picsum.photos/203" },
    { name: "Katie", avt: "https://picsum.photos/204" },
    { name: "Liam", avt: "https://picsum.photos/205" },
    { name: "David", avt: "https://picsum.photos/206" },
    { name: "Quinn", avt: "https://picsum.photos/207" },
    { name: "Parker", avt: "https://picsum.photos/208" },
    { name: "Ivy", avt: "https://picsum.photos/209" },
    { name: "Jack", avt: "https://picsum.photos/210" },
    { name: "Ryan", avt: "https://picsum.photos/211" },
    { name: "Sophia", avt: "https://picsum.photos/220" },
    { name: "Thomas", avt: "https://picsum.photos/230" },
    { name: "Noah", avt: "https://picsum.photos/240" },
    { name: "Alice", avt: "https://picsum.photos/250" },
    { name: "Henry", avt: "https://picsum.photos/260" },
    { name: "Charlie", avt: "https://picsum.photos/270" },
    { name: "Olivia", avt: "https://picsum.photos/280" },
    { name: "Grace", avt: "https://picsum.photos/290" },
    { name: "Frank", avt: "https://picsum.photos/300" },
  ];
  const sortedData = fakeData.slice().sort((a, b) => a.name.localeCompare(b.name));



  return (<>
    <LoadingComponent loading={loading} />
    {pathName === "/friend" || pathName === "/contact" ?
      <div className="contact">
        <div className="contact-panel__header">
          <div className="list-contact__selection">
            <i className="fa-regular fa-user fa-lg"></i>
            <div className="list-contact__content">Danh sách bạn bè</div>
          </div>
        </div>
        <div className="contact-panel__details">
          <div className="list-contact__length">
            Bạn bè ({listFriends?.length || 0})
          </div>
          <div className="list-contact__all">
            {listFriends?.length ?
              listFriends.map((item, index) => (<>
                <button onClick={() => handleRouterChat(item)} className="conversation__container" key={index} style={{ flexDirection: 'column', paddingLeft: '15px', width:'100%' }}>
                  <div className="conversation__content">
                    <img
                      src={item.avatarLocation}
                      alt=""
                      className="conversation__img"
                    />
                    <div className="conversation__main">
                      <h4 className="conversation__name">{item.name}</h4>
                    </div>
                  </div>
                </button>
                <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr>
              </>

              ))
              :
              <Empty />
            }
          </div>
        </div>
      </div> :
      pathName === "/group" ?
        <div className="contact">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <Users />
              <div className="list-contact__content">Danh sách nhóm

              </div>
            </div>
          </div>
          <div className="contact-panel__details">
            <div className="list-contact__length">
              Nhóm ({sortedData.length})
            </div>
            <div className="list-contact__all">
              {
                sortedData.map((item, index) => (<><div className="conversation__container" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                  <Link to={`/room/${item.id}`} className="conversation__content">
                    <img
                      src={item.avt}
                      alt=""
                      className="conversation__img"
                    />
                    <div className="conversation__main">
                      <h4 className="conversation__name">{item.name}</h4>
                      <h4 className="conversation__member" style={{ fontSize: '13px', color: '#8b8b8b' }}>{sortedData.length} thành viên</h4>
                    </div>
                  </Link>

                </div>
                  <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>

                ))
              }
            </div>
          </div>
        </div> :
        <div className="contact">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <i className="fa-regular fa-envelope-open"></i>
              <div className="list-contact__content">Lời mời kết bạn</div>
            </div>
          </div>
          <div className="contact-panel__details">
            <div className="list-contact__length">
              Lời mời đã nhận ({listRequest?.length || 0})
            </div>
            <div className="list-contact__all">
              {listRequest?.length ?
                listRequest?.slice(0, 5).map((item, index) => (<><div className="card-wrapper" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                  <div className="conversation__content">
                    <img
                      src="https://picsum.photos/230"
                      alt=""
                      className="conversation__img"
                    />
                    <div className="conversation__main">
                      <h4 className="conversation__name">{item.name}</h4>
                    </div>
                    <div className="contact_button">
                      <button className="contact_button-deny" onClick={() => { onCancleFriends(item.id) }}>Từ chối</button>
                      <button className="contact_button-accept" onClick={() => { onAcceptFriends(item.id) }}>Đồng ý</button>
                    </div>
                  </div>

                </div>
                  <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>
                ))
                :
                <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', paddingLeft: '15px' }}>
                  <Empty description="Không có lời mời kết bạn nào." />
                </div>
              }
            </div>
          </div>
        </div>
    }
  </>
  );
}
