import React, { useEffect, useState } from "react";
import "./ListConversation.scss";
import HeaderList from "../Common/HeaderList/HeaderList";
import { useDispatch, useSelector } from "react-redux";
// import { doGetConversationOfUser } from "../../Redux/actions";
import { Link, useNavigate } from "react-router-dom";
import apiChat from "../../Services/apiChat";
import { message } from "antd";

export default function ListConversation() {
  const userData = useSelector((state) => state.userData.userData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listConver, setListConver] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    try {
      const response = await apiChat.getListChat();
      setListConver(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const handleRouterChat = async (item) => {
    try {
      setTimeout(() => {
        navigate(`/room/userId=${item.contactResList[0].id === userData.id ? item.contactResList[1].id : item.contactResList[0].id}&&conversationId=${item.conversationId}`);
      }, 500);
    } catch (error) {
      message.error("Có lỗi xảy ra.")
    }
  }
  return (
    <div className="conversation">
      <HeaderList title="Các cuộc trò chuyện" />
      {listConver.map((item, i) => {
        return (
          <button onClick={() => handleRouterChat(item)} className="conversation__link" key={i}>
            <div className="conversation__container" key={i}>
              <div className="conversation__content">
                <img
                  src={item?.contactResList[0]?.id === userData?.id ? item?.contactResList[1].avatarLocation : item?.contactResList[0].avatarLocation}
                  alt=""
                  className="conversation__img"
                />
                <div className="conversation__main">
                  <h4 className="conversation__name">{item?.contactResList[0]?.id === userData?.id ? item?.contactResList[1]?.name : item?.contactResList[0]?.name}</h4>
                  <span className="conversation__mess">{item?.contactResList[0]?.id === userData?.id ? item?.contactResList[1]?.lastMessage : item?.contactResList[0]?.lastMessage}</span>
                </div>
              </div>
              <span className="conversation__time">{item?.contactResList[0]?.id === userData?.id ? item?.contactResList[1]?.lastActivity : item?.contactResList[0]?.lastActivity}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
