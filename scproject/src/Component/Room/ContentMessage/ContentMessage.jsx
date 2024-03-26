import React, { useEffect, useRef, useState } from "react";
import blank from "../../../assets/image/AvtBlank.jpg";
import "./ContentMessage.scss";

export default function ContentMessage({ messages, user, isFetching }) {
  const messagesEndRef = useRef(null);
  const [latestMessageTime, setLatestMessageTime] = useState("");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      const createdTime = new Date(latestMessage.created);
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - createdTime.getTime();

      if (!isNaN(timeDiff)) {
        // Kiểm tra nếu timeDiff không phải là NaN
        if (timeDiff >= 86400000) {
          // 86400000 milliseconds trong một ngày
          // Nếu quá 1 ngày, hiển thị dạng "day hh:mm"
          const daysDiff = Math.floor(timeDiff / 86400000);
          const hours = createdTime.getHours().toString().padStart(2, "0");
          const minutes = createdTime.getMinutes().toString().padStart(2, "0");
          setLatestMessageTime(`${daysDiff} day ${hours}:${minutes}`);
        } else {
          // Hiển thị dạng "hh:mm"
          const hours = createdTime.getHours().toString().padStart(2, "0");
          const minutes = createdTime.getMinutes().toString().padStart(2, "0");
          setLatestMessageTime(`${hours}:${minutes}`);
        }
      } else {
        // Nếu timeDiff là NaN, không hiển thị thời gian
        setLatestMessageTime("");
      }
    }
  }, [messages]);

  // Sắp xếp theo thời gian
  messages.sort((a, b) => new Date(a.created) - new Date(b.created));

  const renderMess = messages.map((mes, index) => (
    <div
      className={`flex gap-3 ${
        mes.contactId === user?.userId ? "justify-end" : ""
      }`}
      key={index}
    >
      {mes.contactId === user?.userId ? (
        <div className="py-2 px-3 bg-[#F0F0F0] rounded-xl text-sm ">
          {mes.content}
        </div>
      ) : (
        <>
          <img
            src={mes.mediaLocation || blank}
            alt=""
            className="mt-1 w-7 h-7 rounded-full "
          />

          <div className="py-2 px-3 bg-[#F0F0F0] rounded-xl text-sm">
            {mes.content}
          </div>
        </>
      )}
    </div>
  ));

  return (
    <div className="content-message-container">
      <div className="">
        <div className="flex gap-4 flex-col">
          {messages ? renderMess : <></>}
        </div>
        {latestMessageTime && messages.length > 0 && (
          <div className="text-xs text-gray-500">{`Last message: ${latestMessageTime}`}</div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
