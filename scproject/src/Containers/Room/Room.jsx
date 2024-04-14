import { SendOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ContentMessage, HeaderRoom } from "../../Component";
import apiChat from "../../Services/apiChat";
import apiUser from "../../Services/apiUser";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import "./Room.scss";

export default function Room() {
  const { userId, conversationId } = useParams();
  const [mes, setMes] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { user, loading } = useUser();
  const {
    socketResponse,
    sendData,
    sendTypingEvent,
    sendStopTypingEvent,
    isTyping,
    setIsTyping,
  } = useSocket(conversationId, userId);
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
          const sortedMessages = res.data?.sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return dateA - dateB;
          });
          setMessageList(sortedMessages);
        } else {
          setMessageList([]);
        }
        setIsLoadingMess(false);
      };
      fetchMessages();
    }
  }, [userInfo]);

  useEffect(() => {
    if (socketResponse) {
      if (isTyping) {
        setIsTyping(false);
      }
      addMessageToList(socketResponse);
    }
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
        mediaLocation: user?.avatarLocation,
      });

      setMes("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    // Xử lý khi giá trị của input thay đổi
    const value = e.target.value;
    setMes(value); // Cập nhật giá trị của input
    if (value.trim() !== "") {
      // setIsTyping(true);
      // Nếu có giá trị nhập liệu thì gửi sự kiện "typing" tới server
      sendTypingEvent({
        contactId: userId,
        avatarLocation: user?.avatarLocation,
      });
    } else {
      setIsTyping(false);
      sendStopTypingEvent();
    }
  };

  return (
    <Spin spinning={isFetchingUser || isLoadingMess}>
      <div className="room">
        <div className="room__header">
          <HeaderRoom userInfo={userInfo} conversationId={conversationId} />
        </div>
        <div className="room__content">
          <ContentMessage
            messages={messageList}
            user={user}
            isTyping={isTyping}
          />
        </div>
        <div className="room__form">
          <div className="form-room">
            <input
              type="text"
              placeholder="Nhập tin nhắn của bạn"
              className="form-room__input"
              value={mes}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                sendStopTypingEvent();
              }}
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
