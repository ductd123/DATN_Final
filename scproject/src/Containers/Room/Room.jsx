import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderRoom, FormRoom, ContentMessage } from "../../Component";
import "./Room.scss";
import io from "socket.io-client";
import { useSelector } from "react-redux";
// import { apiConversation } from "../../Services";

let socket;
export default function Room() {
  const params = useParams();
  const ENDPOINT = "http://202.191.56.11:8050/";
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Khởi tạo kết nối WebSocket khi component được render
    const socket = new WebSocket('ws://202.191.56.11:8050/'); // Thay đổi URL của máy chủ WebSocket tại đây

    // Xử lý sự kiện khi kết nối được thiết lập thành công
    socket.onopen = () => {
      console.log('Kết nối WebSocket đã được thiết lập.');
    };

    // Xử lý sự kiện khi nhận được tin nhắn mới từ máy chủ
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Xử lý sự kiện khi có lỗi xảy ra trong quá trình kết nối
    socket.onerror = (error) => {
      console.error('Lỗi kết nối WebSocket:', error);
    };

    // Đóng kết nối WebSocket khi component bị unmount
    return () => {
      socket.close();
    };
  }, []); // Kết nối chỉ được thiết lập một lần khi component được render

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("join", { ...params });
  //   apiConversation
  //     .getAllMessOfConversation(params.id)
  //     .then((res) => setMessages(res));
  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [ENDPOINT, params]);

  // useEffect(() => {
  //   socket.on("mess", (mess) => {
  //     console.log(mess);
  //     setMessages([...messages, mess]);
  //   });
  // }, [messages]);

  // const handleSendMess = (values, resetForm) => {
  //   socket.emit("sendMess", {
  //     userId: reduxUserData.data.id,
  //     content: values.mes,
  //     theaterId: params,
  //   });
  //   resetForm();
  // };

  return (
    <div className="room">
      <div className="room__header">
        <HeaderRoom />
      </div>
      <div className="room__content">
        <ContentMessage
        // messages={messages}
        // userId={reduxUserData.data.id}
        />
      </div>
      <div className="room__form">
        <FormRoom
        // handleSendMess={handleSendMess}
        />
      </div>
    </div>
  );
}
