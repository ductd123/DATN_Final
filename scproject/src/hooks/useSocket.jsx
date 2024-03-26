import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (conversationId, contactId) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    contactId: "",
    content: "",
    messageType: "",
    mediaLocation: "",
  });
  const [isConnected, setConnected] = useState(false);

  const sendData = useCallback(
    (payload) => {
      socket.emit("send_message", {
        contactId: payload.contactId,
        content: payload.content,
        messageType: payload.messageType,
        mediaLocation: payload.mediaLocation,
      });
    },
    [socket]
  );

  useEffect(() => {
    const socketBaseUrl = "http://202.191.56.11:8055";
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
      setSocketResponse(res);
    });

    return () => {
      s.disconnect();
    };
  }, [conversationId, contactId]);

  return { isConnected, socketResponse, sendData };
};
