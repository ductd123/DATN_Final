import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderRoom, FormRoom, ContentMessage } from "../../Component";
import "./Room.scss";
import io from "socket.io-client";
import { useSelector } from "react-redux";
// import { apiConversation } from "../../Services";

let socket;
export default function Room() {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const ENDPOINT = "http://localhost:3000/";

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
