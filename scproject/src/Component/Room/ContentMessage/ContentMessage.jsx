import React, { useEffect, useRef, useState } from "react";
import blank from "../../../assets/image/AvtBlank.jpg";
import "./ContentMessage.scss";
import { Modal, Skeleton } from "antd";
import { isImage } from "../../../Layout/AdminLayout/AdminLayout";

export default function ContentMessage({
  messages,
  user,
  isFetching,
  isTyping,
  userInfo,
}) {
  const messagesEndRef = useRef(null);
  const [latestMessageTime, setLatestMessageTime] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [itemPreview, setItemPreview] = useState();
  const videoRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);

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
  // messages.sort((a, b) => new Date(a.created) - new Date(b.created));

  const renderMess = messages.map((mes, index) => (
    <div
      className={`flex gap-3 ${
        mes.contactId === user?.userId ? "justify-end" : ""
      }`}
      key={index}
    >
      {mes.contactId === user?.userId ? (
        <div className="flex flex-col items-end">
          <div className="py-2 px-3 bg-[#F0F0F0] rounded-xl text-sm flex-grow  w-fit">
            {mes.content}
          </div>
          <div className="">
            {mes.mediaLocation ? (
              <div className="">
                {isImage(mes.mediaLocation) ? (
                  <img
                    className="w-36  h-auto hover:cursor-pointer "
                    style={{ borderRadius: "12px" }}
                    src={mes.mediaLocation}
                    alt="Preview"
                    onClick={() => {
                      setOpenPreview(true);
                      setItemPreview(mes.mediaLocation);
                    }}
                  />
                ) : (
                  <video
                    className="w-36 hover:cursor-pointer "
                    onClick={() => {
                      setOpenPreview(true);
                      setItemPreview(mes.mediaLocation);
                    }}
                    style={{ borderRadius: "12px" }}
                  >
                    <source src={mes.mediaLocation} type="video/mp4" />
                  </video>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <img
            src={userInfo?.avatarLocation || blank}
            alt=""
            className="mt-1 w-7 h-7 rounded-full "
          />
          <div className="">
            <div className="py-2 px-3 bg-[#F0F0F0] rounded-xl text-sm w-fit">
              {mes.content}
            </div>
            <div className="flex flex-1">
              {mes.mediaLocation ? (
                <div className="">
                  {isImage(mes.mediaLocation) ? (
                    <img
                      className="w-36  h-auto hover:cursor-pointer "
                      style={{ borderRadius: "12px" }}
                      src={mes.mediaLocation}
                      alt="Preview"
                      onClick={() => {
                        setOpenPreview(true);
                        setItemPreview(mes.mediaLocation);
                      }}
                    />
                  ) : (
                    <video
                      className="w-36 hover:cursor-pointer "
                      style={{ borderRadius: "12px" }}
                      onClick={() => {
                        setOpenPreview(true);
                        setItemPreview(mes.mediaLocation);
                      }}
                    >
                      <source src={mes.mediaLocation} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  ));

  return (
    <div className="content-message-container" ref={messagesEndRef}>
      <div className="">
        <div className="flex gap-4 flex-col">
          {messages ? renderMess : <> </>}
        </div>
        {/* Typing */}
        {isTyping && (
          <div className="flex gap-3 items-center mt-4">
            <img src={blank} alt="" className="mt-1 w-7 h-7 rounded-full " />
            <span className="typing-dots ">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          </div>
        )}
        {latestMessageTime && messages.length > 0 && (
          <div className="text-xs text-gray-500">{`Last message: ${latestMessageTime}`}</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {itemPreview && openPreview && (
        <Modal
          open={openPreview}
          onCancel={() => {
            setOpenPreview(false);
            setItemPreview(null);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
          centered
          footer={null}
        >
          <div className="flex justify-center items-center mt-4 py-4">
            {isImage(itemPreview) ? (
              <img src={itemPreview} alt="Preview" />
            ) : (
              <video ref={videoRef} autoPlay controls muted>
                <source src={itemPreview} type="video/mp4" />
              </video>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
