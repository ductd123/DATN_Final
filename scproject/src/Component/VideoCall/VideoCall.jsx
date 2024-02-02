import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

const VideoCall = ({ userId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);

    useEffect(() => {
        const initializePeer = () => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                    peerRef.current = new SimplePeer({ initiator: false, stream });
                    peerRef.current.on('signal', (data) => {
                        sendDataToPeer(data);
                    });
                    peerRef.current.on('data', (data) => {
                        if (isDataFromCorrectUser(data)) {
                            handleIncomingCall();
                        } else {
                            console.warn('Dữ liệu không đúng người dùng.');
                        }
                    });
                    peerRef.current.on('stream', (stream) => {
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = stream;
                        }
                    });
                })
                .catch((error) => console.error('Không thể truy cập camera và microphone:', error));
        };
        initializePeer();

    }, []); 
    const sendConnectRequest = () => {
        if (peerRef.current) {
            const requestData = {
                userId,
                connectRequest: true,
            };
            peerRef.current.signal(JSON.stringify(requestData));
        } else {
            console.error('peerRef.current không tồn tại hoặc là null.');
        }
    };

    const sendDataToPeer = (data) => {
        peerRef.current.send(data);
    };

    const isDataFromCorrectUser = (data) => {
        try {
            const parsedData = JSON.parse(data);
            return parsedData.userId === userId;
        } catch (error) {
            console.error('Lỗi khi parse dữ liệu:', error);
            return false;
        }
    };

    const handleIncomingCall = () => {
        const confirmResponse = window.confirm('Bạn có một cuộc gọi đến từ đối tác. Bạn có muốn nhận cuộc gọi không?');

        if (confirmResponse) {
            console.log('Người dùng đã chấp nhận cuộc gọi.');
        } else {
            console.log('Người dùng đã từ chối cuộc gọi.');
        }
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '200px' }} />
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '200px' }} />
            <button onClick={sendConnectRequest}>Gửi Yêu Cầu Kết Nối</button>
        </div>
    );
};

export default VideoCall;
