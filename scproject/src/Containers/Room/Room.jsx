import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Popover, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ContentMessage, HeaderRoom } from "../../Component";
import apiChat from "../../Services/apiChat";
import apiUser from "../../Services/apiUser";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import "./Room.scss";
import { EmojiIcon, ImageIcon } from "../../assets/icon";
import EmojiPicker from "emoji-picker-react";
import { apiUploadFile } from "../../Services/apiLearning";
import { isImage } from "../../Layout/AdminLayout/AdminLayout";

export default function Room() {
  const { userId, conversationId } = useParams();
  const [mes, setMes] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiUploadFile.uploadFile(formData);
    setSelectedFile([...selectedFile, res]);
  };

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
        mediaLocation: selectedFile?.length ? selectedFile[0] : null,
      });

      setMes("");
      setSelectedFile([]);
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
        <div
          className="room__content "
          style={{ paddingBottom: selectedFile?.length && "80px" }}
        >
          <ContentMessage
            messages={messageList}
            user={user}
            isTyping={isTyping}
            userInfo={userInfo}
          />
        </div>
        <div className="fixed bottom-0  bg-white right-0 left-[356px] pt-2 pb-3">
          <div className="flex items-center px-4 ">
            <div className="flex items-center gap-3 mr-3">
              <label htmlFor="file-input" className=" cursor-pointer">
                <ImageIcon size={28} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="form-room__file-input"
                style={{ display: "none" }}
              />
            </div>
            <div className="w-full bg-neutral-100 rounded-lg ">
              {selectedFile?.length ? (
                <div className="p-4 flex items-center gap-3">
                  {selectedFile?.map((e) => (
                    <>
                      {!isImage(e) ? (
                        <div className="relative">
                          <video
                            className="w-20 h-20 "
                            style={{ borderRadius: "12px" }}
                          >
                            <source src={e} type="video/mp4" />
                          </video>
                          <div
                            className="absolute top-1 -right-1 bg-white cursor-pointer"
                            onClick={() =>
                              setSelectedFile(
                                selectedFile?.filter((item) => item !== e)
                              )
                            }
                          >
                            <CloseOutlined />
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            className="w-20 h-auto  "
                            style={{ borderRadius: "12px" }}
                            src={e}
                            alt="Preview"
                          />
                          <div
                            className="absolute -top-1 right-0 bg-white cursor-pointer"
                            onClick={() =>
                              setSelectedFile(
                                selectedFile?.filter((item) => item !== e)
                              )
                            }
                          >
                            <CloseOutlined size={16} />
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              ) : null}

              <input
                type="text"
                placeholder="Nhập tin nhắn của bạn"
                className="form-room__input w-full "
                value={mes}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onBlur={() => {
                  sendStopTypingEvent();
                }}
              />
            </div>

            <Popover
              content={
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setMes([...mes, e.emoji]);
                  }}
                />
              }
              title="Emoji"
              trigger="click"
              placement="topRight"
            >
              <div
                className="cursor-pointer ml-3 relative"
                onClick={() => setShowEmoji(true)}
              >
                <EmojiIcon size={28} />
              </div>
            </Popover>

            <Button onClick={sendMessage} className="form-room__btn">
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
}
