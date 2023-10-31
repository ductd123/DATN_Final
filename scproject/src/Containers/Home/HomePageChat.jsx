import React, { useEffect } from "react";
import io from "socket.io-client";
import { ChatBox } from "../../Component";
let socket;

export default function HomePageChat() {
    return (
        <ChatBox />
    );
}
