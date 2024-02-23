import React, { useRef, useEffect } from "react";
import "./ContentMessage.scss";
import { useSelector } from "react-redux";

export default function ContentMessage({ messages, userInfo }) {
  const userData = useSelector((state) => state.userData.userData);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="content-message-container">
      {messages.map((mes, i) => {
        return (
          <div
            className={
              userData?.id === mes?.id ?
                "content-massenage content-massenage--user"
                : "content-massenage"
            }
            key={i}
          >
            <img
              src={userData?.id === mes?.id ? userData.avatarLocation : userInfo.avatarLocation}
              alt=""
              className={
                userData?.id === mes?.id ?
                  "content-massenage__img content-massenage__img--user"
                  : "content-massenage__img"
              }
            />
            <div
              className={
                userData?.id === mes?.id ?
                  "content-massenage__main content-massenage__main--user"
                  : "content-massenage__main"
              }
            >
              <p className="content-massenage__content">{mes?.content}</p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
