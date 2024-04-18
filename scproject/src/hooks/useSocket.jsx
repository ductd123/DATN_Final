import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (conversationId, contactId) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    contactId: "",
    content: "",
    messageType: "",
    mediaLocation: "",
    createdAt: "",
  });
  const [isConnected, setConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendData = useCallback(
    (payload) => {
      socket.emit("stop typing", conversationId);
      socket.emit("send_message", {
        contactId: payload.contactId,
        content: payload.content,
        messageType: payload.messageType,
        mediaLocation: payload.mediaLocation,
      });
    },
    [socket]
  );

  // Hàm gửi sự kiện "typing" tới server
  const sendTypingEvent = useCallback(
    (payload) => {
      socket.emit("typing", {
        contactId: payload.contactId,
        avatarLocation: payload.avatarLocation,
      });
    },
    [socket, conversationId]
  );

  // Hàm gửi sự kiện "stop_typing" tới server
  const sendStopTypingEvent = useCallback(() => {
    socket.emit("stop_typing", conversationId);
  }, [socket, conversationId]);

  useEffect(() => {
    const socketBaseUrl = "https://chat-call-app.onrender.com";
    // const socketBaseUrl = "http://localhost:8017";

    const s = io(socketBaseUrl, {
      query: `conversationId=${conversationId}&contactId=${contactId}`,
    });
    setSocket(s);
    s.on("connect", () => {
      setConnected(true);
    });
    s.on("connect_error", (error) => {
      console.error("SOCKET CONNECTION ERROR", error);
    });
    s.on("get_message", (res) => {
      setSocketResponse({ ...res, createdAt: new Date() });
    });
    s.on("typing", (data) => {
      if (data.contactId !== contactId) {
        setIsTyping(true);
      }
    });
    s.on("stop_typing", () => {
      setIsTyping(false);
    });

    return () => {
      s.disconnect();
    };
  }, [conversationId, contactId]);

  return {
    isConnected,
    socketResponse,
    sendData,
    sendTypingEvent,
    sendStopTypingEvent,
    isTyping,
    setIsTyping,
  };
};
