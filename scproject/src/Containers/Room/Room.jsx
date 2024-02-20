import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderRoom, ContentMessage, Button } from '../../Component';
import './Room.scss';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import apiChat from '../../Services/apiChat';
import { message } from 'antd';

export default function Room() {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [mes, setMes] = useState('');
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [conversationID, setConversationID] = useState();
  const userData = useSelector((state) => state.userData.userData)
  // Effect để cập nhật conversationID khi URL thay đổi
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const newValueAfterHash = getValueAfterHash();
        setConversationID(newValueAfterHash);
        let response = '';
        if (newValueAfterHash) {
          response = await apiChat.getMessage(newValueAfterHash);
          setMessages(response);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        // message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.")
        setLoading(false);
      }
    };
  
    fetchMessages();
  }, [params]);

  useEffect(() => {
    if (conversationID) {
      const sock = new SockJS('http://202.191.56.11:8050/chat-message');
      const stomp = Stomp.over(sock);
      stomp.connect({}, () => {
        console.log('Kết nối STOMP đã được mở.');
        stomp.subscribe(`/conversation/${conversationID}`, (payload) => receivedMessage(payload));
      });
      setStompClient(stomp);

      return () => {
        if (stomp) {
          stomp.disconnect();
        }
      };
    }
  }, [conversationID]);
  const getValueAfterHash = () => {
    const url = window.location.href;
    const hashIndex = url.indexOf('=');
    if (hashIndex !== -1) {
      const value = url.substring(hashIndex + 1);
      return value;
    } else {
      return null;
    }
  };

  const sendMessage = () => {
    if (!mes) {
      return false
    }
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/chat/${conversationID}`, {}, JSON.stringify({
        content: mes,
        messageType: "TEXT",
        mediaLocation: null,
      }));
      setMes('');
    } else {
      console.error('Kết nối STOMP chưa được thiết lập hoặc đã bị đóng.');
    }
  };
  const receivedMessage = (message) => {
    if (message.body) {
      const receivedMessage = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      console.log(messages);
    }
  }
  return (
    <div className="room">
      <div className="room__header">
        <HeaderRoom />
      </div>
      <div className="room__content">
        <ContentMessage messages={messages} />
      </div>
      <div className="room__form">
        <div className="form-room">
          <input
            type="text"
            placeholder="Nhập tin nhắn của bạn"
            className="form-room__input"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          />
          <Button onClick={sendMessage} className="form-room__btn">
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}
