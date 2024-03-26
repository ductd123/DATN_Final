import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import apiUser from "../../Services/apiUser";
import ButtonSystem from "../button/ButtonSystem";
import { useUser } from "../../hooks/useUser";

const VideoCall = () => {
  const { userId } = useParams();
  const { user } = useUser();
  const [peer, setPeer] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteId, setRemoteId] = useState("");
  const [showCallConfirmation, setShowCallConfirmation] = useState(false);
  const [remoteUser, setRemoteUser] = useState();

  const remoteStreamRef = useRef(null);
  const localStreamRef = useRef(null);
  const callRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiUser.getUserById(userId);
        initializePeer(user.email.split("@")[0]);
        setRemoteUser(response.data);
        setRemoteId(response.data.email.split("@")[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [userId, user]);

  const initializePeer = (id) => {
    const customIceServers = [
      { urls: "stun:freeturn.net:5349" },
      { urls: "turns:freeturn.tel:5349", username: "free", credential: "free" },
      {
        urls: "relay1.expressturn.com:3478",
        username: "efK7QHXRMSZHVGR70O",
        credential: "zh6GHMeMDQNHLStt",
      },
      { urls: "stun:stun.relay.metered.ca:80" },
      {
        urls: "turn:asia-east.relay.metered.ca:80",
        username: "fff496ad71b17d3d38ca224e",
        credential: "NYcdbdYGytIGfL/u",
      },
      {
        urls: "turn:asia-east.relay.metered.ca:80?transport=tcp",
        username: "fff496ad71b17d3d38ca224e",
        credential: "NYcdbdYGytIGfL/u",
      },
      {
        urls: "turn:asia-east.relay.metered.ca:443",
        username: "fff496ad71b17d3d38ca224e",
        credential: "NYcdbdYGytIGfL/u",
      },
      {
        urls: "turns:asia-east.relay.metered.ca:443?transport=tcp",
        username: "fff496ad71b17d3d38ca224e",
        credential: "NYcdbdYGytIGfL/u",
      },
      {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credentials: "openrelayproject",
      },
    ];

    const peerConfig = {
      iceServers: customIceServers,
    };

    const newPeer = new Peer(id, peerConfig);

    newPeer.on("open", () => {
      console.log("Peer open");
    });

    newPeer.on("error", (err) => {
      console.error("Peer connection error:", err);
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          localStreamRef.current.srcObject = stream;
          setShowCallConfirmation(true);
          callRef.current = call;
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    });

    setPeer(newPeer);
  };

  const handleEndCall = () => {
    closeStream(localStream);
    setLocalStream(null);
    setRemoteStream(null);
  };

  const handleCall = async () => {
    let stream;
    if (!peer) {
      console.error("Peer is not initialized");
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current.srcObject = stream;
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
    if (!stream) {
      console.error("Local stream is not available");
      return;
    }

    const call = peer.call(remoteId, stream);

    call.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
      remoteStreamRef.current.srcObject = remoteStream;
    });

    call.on("error", (error) => {
      console.error("Call error:", error);
      closeStream(localStream);
    });
  };

  const closeStream = (stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleAcceptCall = () => {
    setShowCallConfirmation(false);
    const call = callRef.current;
    if (call && localStream) {
      call.answer(localStream);
      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        remoteStreamRef.current.srcObject = remoteStream;
      });
    }
  };

  const handleRejectCall = () => {
    setShowCallConfirmation(false);
    console.log("User rejected the call.");
  };

  return (
    <div className="container mt-4 px-4">
      <div id="div-chat">
        <div className="row">
          <div className="col-md-12">
            <h3>Your ID: {peer?.id}</h3>
          </div>
        </div>

        {showCallConfirmation && (
          <div id="callConfirmation" className="row">
            <p>Bạn có cuộc gọi từ {remoteUser.name}?</p>
            <ButtonSystem
              type="primary"
              onClick={handleAcceptCall}
              className=""
            >
              Đồng ý
            </ButtonSystem>
            <ButtonSystem
              type="secondary"
              onClick={handleRejectCall}
              className=""
            >
              Từ chối
            </ButtonSystem>
          </div>
        )}

        <div className="flex gap-4">
          <div className="w-1/2">
            <h3>Local Stream</h3>
            <video
              ref={localStreamRef}
              id="localStream"
              width="100%"
              height="auto"
              muted
              controls
              autoPlay
              playsInline
            ></video>
          </div>
          <div className="w-1/2">
            <h3>Remote Stream</h3>
            <video
              ref={remoteStreamRef}
              width="100%"
              height="auto"
              controls
              muted
              autoPlay
              playsInline
            ></video>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <input
              type="text"
              value={remoteId}
              onChange={(e) => setRemoteId(e.target.value)}
              className="form-control border border-solid border-black"
              placeholder="Remote ID"
            />
          </div>
          <div className="col-md-3">
            <button onClick={handleCall} className="btn btn-primary">
              Call
            </button>
          </div>
          <div className="col-md-3">
            <button onClick={handleEndCall} className="btn btn-danger">
              End Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
