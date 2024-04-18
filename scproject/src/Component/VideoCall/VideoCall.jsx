import { useCallback, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useParams } from "react-router";
import blank from "../../assets/image/AvtBlank.jpg";
import logo from "../../assets/image/logo.png";

import { useUser } from "../../hooks/useUser";
import apiUser from "../../Services/apiUser";
import ButtonSystem from "../button/ButtonSystem";
import { Modal } from "antd";
import styled from "styled-components";
import {
  AudioMutedOutlined,
  AudioOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { CallIcon, EndCallIcon } from "../../assets/icon";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }
`;
const CustomVideo = styled.video`
  width: 100%;
  height: 600px;
`;

function VideoCall() {
  const { userId } = useParams();
  const { user } = useUser();
  const [peerId, setPeerId] = useState("");
  const [remoteUser, setRemoveUser] = useState();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openWaitCall, setOpenWaitCall] = useState(false);
  const [cancelCall, setCancelCall] = useState(false);

  const [openVoice, setOpenVoice] = useState(false);
  const dataConnection = useRef(null);

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

    const peer = new Peer(id, peerConfig);
    // const peer = new Peer();
    peer.on("open", (id) => {
      peerInstance.current = peer;
      setPeerId(id);
    });

    // Bên nhận lấy thông tin bên gửi ( xác nhận xem có call không)
    peer.on("call", (call) => {
      setOpenModal(true);
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        setIsShowConfirm(true);
        currentUserVideoRef.current.srcObject = mediaStream;
        // currentUserVideoRef.current.play();
        callRef.current = call;
        setLocalStream(mediaStream);
      });
    });

    peerInstance.current = peer;
  };

  // Stop video
  const stopVideo = (videoRef) => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiUser.getUserById(userId);

        setRemoveUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    initializePeer(user?.email.split("@")[0]);

    return () => {
      if (peerInstance) {
        peerInstance.current.destroy();
      }
      stopVideo(currentUserVideoRef);
      stopVideo(remoteVideoRef);
    };
  }, [userId, user]);

  // Thực hiện call
  const call = (remotePeerId) => {
    // Luôn phải mở video
    setOpenModal(true);
    setOpenWaitCall(true);
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      // Bên gửi

      currentUserVideoRef.current.srcObject = mediaStream;
      //   currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);
      // Bên gửi lấy thông tin bên nhận
      call.on("stream", (remoteStream) => {
        setOpenWaitCall(false);
        remoteVideoRef.current.srcObject = remoteStream;
        // remoteVideoRef.current.play();
      });
      peerInstance.current.on("data", (data) => {
        // Xử lý thông điệp từ bên B
        if (data.type === "cancelCall") {
          // Xử lý việc huỷ cuộc gọi ở đây
          endCall(); // Gọi hàm kết thúc cuộc gọi của bên A
        }
      });
    });
  };

  // Handle Chấp nhận call phía người nhận
  const handleAcceptCall = () => {
    setIsShowConfirm(false);
    setOpenModal(true);
    setOpenWaitCall(false);
    const call = callRef.current;
    if (call && localStream) {
      call.answer(localStream);
      call.on("stream", function (remoteStream) {
        // Bên nhận
        remoteVideoRef.current.srcObject = remoteStream;
      });
    }
  };

  // Thêm hàm để dừng và giải phóng media stream
  const releaseMediaStream = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
    }
  };

  // Thêm hàm để dừng cuộc gọi và đóng kết nối PeerJS
  const endCall = () => {
    stopVideo(currentUserVideoRef);
    stopVideo(remoteVideoRef);
    releaseMediaStream(); // Giải phóng media stream
    setOpenModal(false);

    // Đóng kết nối PeerJS
    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
  };

  // Thực hiện huỷ phí người nhận
  const handleRejectCall = () => {
    setIsShowConfirm(false);
    setCancelCall(true);
    callRef.current.close(); // Đóng cuộc gọi
    peerInstance.current.disconnect(); // Ngắt kết nối PeerJS
    endCall();
    console.log("User rejected the call.");
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>

      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>

      {/* Xác nhân cuộc gọi đến */}
      <CustomModal
        open={isShowConfirm}
        width={600}
        title={<div className="w-full text-center pt-3">Cuộc gọi đến</div>}
        className=""
        onCancel={() => setIsShowConfirm(false)}
        footer={null}
        maskClosable={false}
        mask={false}
        centered
        destroyOnClose
        zIndex={10002}
      >
        <div className="mt-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <img
                alt=""
                src={remoteUser?.avatarLocation || blank}
                style={{ borderRadius: "100%", width: 120, height: 120 }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xl">{remoteUser?.name} đang gọi cho bạn</div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4 gap-3">
            <ButtonSystem
              type="primary"
              onClick={handleAcceptCall}
              className=""
            >
              Chấp nhận
            </ButtonSystem>
            <ButtonSystem
              type="secondary"
              className=""
              onClick={handleRejectCall}
            >
              Từ chối
            </ButtonSystem>
          </div>
        </div>
      </CustomModal>

      {/* Chờ xác nhận */}
      <CustomModal
        open={openModal}
        width={1300}
        className=""
        onCancel={() => setOpenModal(false)}
        footer={null}
        maskClosable={false}
        mask={false}
        closeIcon={null}
        centered
        destroyOnClose
        zIndex={10000}
      >
        <div
          className="bg-green-200 px-3 py-1 shadow-lg flex justify-between items-center"
          style={{ border: "1px solid #8C8C8C" }}
        >
          <div className="flex items-center gap-3">
            <img alt="" src={logo} style={{ width: 20, height: 20 }} />
            Cuộc gọi qua WeTalk
          </div>

          <div className="cursor-pointer" onClick={() => endCall()}>
            <CloseOutlined />
          </div>
        </div>

        {/* Luôn phải bật */}
        <div className="gap-6 relative">
          {openWaitCall && (
            <div className=" py-2 bg-black w-full absolute top-1/2 -translate-y-1/2 ">
              <div className="text-white text-center flex flex-col justify-center  h-full gap-3  ">
                <div className="flex justify-center items-center">
                  <img
                    alt=""
                    src={remoteUser?.avatarLocation || blank}
                    style={{ borderRadius: "100%", width: 120, height: 120 }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xl">{remoteUser?.name}</div>
                  <div className="text-neutral-400 text-sm">Đang gọi ...</div>
                </div>
              </div>
            </div>
          )}
          <video
            className=" absolute bottom-4 right-0"
            width="300px"
            autoPlay
            style={{ height: "200px" }}
            playsInline
            muted
            ref={currentUserVideoRef}
          />
          <CustomVideo
            className=" bg-black"
            autoPlay
            playsInline
            muted
            ref={remoteVideoRef}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-neutral-500 rounded-full py-2.5 px-3.5 cursor-pointer">
              {openVoice ? (
                <AudioOutlined style={{ size: 40, color: "white" }} />
              ) : (
                <AudioMutedOutlined style={{ size: 40, color: "white" }} />
              )}
            </div>
            <div
              className="bg-red-700 p-1 rounded-full flex justify-center cursor-pointer"
              onClick={() => {
                endCall();
              }}
            >
              <EndCallIcon size={30} color="white" />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default VideoCall;
