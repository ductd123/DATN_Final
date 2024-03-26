import React, { useCallback, useEffect, useRef, useState } from "react";
import blank from "../../../assets/image/AvtBlank.jpg";

import "./HeaderRoom.scss";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import logo from "../../../assets/image/logo.png";
import audioVideo from "../../../assets/audio/audioCall.mp3";
import { Modal } from "antd";
import { useUser } from "../../../hooks/useUser";
import ButtonSystem from "../../button/ButtonSystem";
import {
  AudioMutedOutlined,
  AudioOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { EndCallIcon } from "../../../assets/icon";
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }
`;
const CustomVideo = styled.video`
  width: 100%;
  height: 600px;
`;
const CallIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 26 26"
    >
      <path
        fill="currentColor"
        d="M22.386 18.026c-1.548-1.324-3.119-2.126-4.648-.804l-.913.799c-.668.58-1.91 3.29-6.712-2.234c-4.801-5.517-1.944-6.376-1.275-6.951l.918-.8c1.521-1.325.947-2.993-.15-4.71l-.662-1.04C7.842.573 6.642-.552 5.117.771l-.824.72c-.674.491-2.558 2.087-3.015 5.119c-.55 3.638 1.185 7.804 5.16 12.375c3.97 4.573 7.857 6.87 11.539 6.83c3.06-.033 4.908-1.675 5.486-2.272l.827-.721c1.521-1.322.576-2.668-.973-3.995z"
      />
    </svg>
  );
};

export default function HeaderRoom({ userInfo, conversationId }) {
  const navigate = useNavigate();
  const { user } = useUser();
  // Call
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openWaitCall, setOpenWaitCall] = useState(false);
  const [openVoice, setOpenVoice] = useState(true);
  // ref
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callRef = useRef(null);
  const audioRef = useRef(null);
  //audio
  // Thêm state cho cuộc gọi và thời gian cuộc gọi
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleCallUser1 = () => {
    navigate(`/room/call-video/${conversationId}/${userInfo.userId}`);
  };

  // Khởi tạo peer
  useEffect(() => {
    initializePeer(user?.email.split("@")[0]);

    return () => {
      releaseMediaStream(); // Release media streams on cleanup
    };
  }, [user, conversationId]);

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
      console.log("peer open");
      peerInstance.current = peer;
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

  // Play
  const playAudio = () => {
    setIsCallActive(true);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.play();
    }
  };
  // Stop
  const stopAudio = () => {
    setIsCallActive(false);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
    }
  };

  // Sử dụng useEffect để theo dõi thời gian cuộc gọi
  useEffect(() => {
    let intervalId;

    // Kiểm tra nếu cuộc gọi đang hoạt động và audio đã chạy hết
    if (isCallActive && callDuration >= audioRef.current.duration) {
      // Ngắt cuộc gọi tự động
      endCall();
    }

    // Cập nhật thời gian cuộc gọi mỗi giây
    if (isCallActive) {
      intervalId = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount or state change
    };
  }, [isCallActive, callDuration]);

  // Thực hiện call
  const call = (remotePeerId) => {
    playAudio();
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
      if (!call) {
        console.error("Peer not initialized yet!");
        return;
      }
      // Bên gửi lấy thông tin bên nhận
      call.on("stream", (remoteStream) => {
        setOpenWaitCall(false);
        stopAudio();
        remoteVideoRef.current.srcObject = remoteStream;
        // remoteVideoRef.current.play();
      });
    });
  };

  // Handle Chấp nhận call phía người nhận
  const handleAcceptCall = () => {
    stopAudio();
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

  // Thêm hàm để dừng cuộc gọi và đóng kết nối PeerJS
  const endCall = () => {
    stopAudio();
    stopVideo(currentUserVideoRef);
    stopVideo(remoteVideoRef);
    releaseMediaStream(); // Giải phóng media stream
    setOpenModal(false);
  };

  // Thực hiện huỷ phí người nhận
  const handleRejectCall = () => {
    setIsShowConfirm(false);
    callRef.current.close(); // Đóng cuộc gọi
    peerInstance.current.disconnect(); // Ngắt kết nối PeerJS
    endCall();
    console.log("User rejected the call.");
  };

  return (
    <div className="header-room px-4 py-3 flex justify-between items-center">
      <div className="flex gap-3">
        <img
          src={userInfo?.avatarLocation || blank}
          alt=""
          className=" w-10 h-10 rounded-full "
        />

        <div className="ml-2">
          <h3 className="header-room__name">{userInfo?.name}</h3>
          <span className="header-room__time">{userInfo?.email}</span>
        </div>
      </div>

      <div
        className="cursor-pointer"
        onClick={() => call(userInfo?.email.split("@")[0])}
      >
        <CallIcon style={{ cursor: "pointer" }} />
      </div>

      {/* <div className="cursor-pointer" onClick={handleCallUser1}>
        <CallIcon />
      </div> */}
      {/* audio */}
      <audio ref={audioRef}>
        <source src={audioVideo} type="audio/mpeg" />
      </audio>

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
                src={userInfo?.avatarLocation || blank}
                style={{ borderRadius: "100%", width: 120, height: 120 }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xl">{userInfo?.name} đang gọi cho bạn</div>
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
                    src={userInfo?.avatarLocation || blank}
                    style={{ borderRadius: "100%", width: 120, height: 120 }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xl">{userInfo?.name}</div>
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
            muted={openVoice}
            ref={currentUserVideoRef}
          />
          <CustomVideo
            className=" bg-black"
            autoPlay
            playsInline
            muted={openVoice}
            ref={remoteVideoRef}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-neutral-500 rounded-full py-2.5 px-3.5 cursor-pointer">
              {openVoice ? (
                <AudioMutedOutlined
                  style={{ size: 40, color: "white" }}
                  onClick={() => setOpenVoice(false)}
                />
              ) : (
                <AudioOutlined
                  style={{ size: 40, color: "white" }}
                  onClick={() => setOpenVoice(true)}
                />
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
