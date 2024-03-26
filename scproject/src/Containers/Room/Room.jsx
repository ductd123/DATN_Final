import { SendOutlined } from "@ant-design/icons";
import { QueryCache, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ContentMessage, HeaderRoom } from "../../Component";
import apiChat from "../../Services/apiChat";
import { useSocket } from "../../hooks/useSocket";
import "./Room.scss";
import { useUser } from "../../hooks/useUser";
import apiUser from "../../Services/apiUser";
import { Spin } from "antd";

export default function Room() {
  const { userId, conversationId } = useParams();
  const [mes, setMes] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { user, loading } = useUser();
  const { socketResponse, sendData } = useSocket(conversationId, userId);
  const [isLoadingMess, setIsLoadingMess] = useState(false);

  // API lấy thông tin user
  const { data: userInfo, isFetching: isFetchingUser } = useQuery({
    queryKey: ["getUserInfo", Number(userId)],
    queryFn: async () => {
      const res = await apiUser.getUserById(Number(userId));
      return res.data;
    },
  });

  useEffect(() => {
    if (userInfo) {
      const fetchMessages = async () => {
        setIsLoadingMess(true);
        const res = await apiChat.getMessage(Number(conversationId));
        if (res.data) {
          setMessageList(res.data);
        } else {
          setMessageList([]);
        }
        setIsLoadingMess(false);
      };
      fetchMessages();
    }
  }, [userInfo]);

  useEffect(() => {
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const addMessageToList = (val) => {
    if (!val.content) return;
    setMessageList((oldMess) => [...oldMess, val]);
  };

  const sendMessage = (e) => {
    if (mes !== "") {
      sendData({
        contactId: user?.userId,
        content: mes,
        messageType: "TEXT",
        mediaLocation: null,
      });
      addMessageToList({
        contactId: user?.userId,
        content: mes,
        messageType: "TEXT",
        mediaLocation: null,
        createdAt: new Date(),
      });
      setMes("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Spin spinning={isFetchingUser || isLoadingMess}>
      <div className="room">
        <div className="room__header">
          <HeaderRoom userInfo={userInfo} conversationId={conversationId} />
        </div>
        <div className="room__content">
          <ContentMessage messages={messageList} user={user} />
        </div>
        <div className="room__form">
          <div className="form-room">
            <input
              type="text"
              placeholder="Nhập tin nhắn của bạn"
              className="form-room__input"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={sendMessage} className="form-room__btn">
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
}
