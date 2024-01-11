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

                    // Khởi tạo kết nối WebRTC
                    peerRef.current = new SimplePeer({ initiator: false, stream });

                    // Lắng nghe sự kiện khi có một kết nối được thiết lập
                    peerRef.current.on('signal', (data) => {
                        console.log('Sử dụng dữ liệu này để thiết lập kết nối với đối tác của bạn:', data);

                        // Gửi dữ liệu tới đối tác
                        sendDataToPeer(data);
                    });

                    // Lắng nghe sự kiện khi nhận được dữ liệu từ đối tác
                    peerRef.current.on('data', (data) => {
                        console.log('Dữ liệu nhận được từ đối tác:', data);

                        // Kiểm tra xem dữ liệu có phải từ người dùng đúng không
                        if (isDataFromCorrectUser(data)) {
                            handleIncomingCall();
                        } else {
                            console.warn('Dữ liệu không đúng người dùng.');
                        }
                    });

                    // Lắng nghe sự kiện khi stream remote được nhận
                    peerRef.current.on('stream', (stream) => {
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = stream;
                        }
                    });
                })
                .catch((error) => console.error('Không thể truy cập camera và microphone:', error));
        };

        // Gọi hàm khởi tạo peer khi bạn muốn bắt đầu cuộc gọi
        initializePeer();

    }, []); // Chỉ chạy một lần sau khi component mount

    // Hàm để gửi yêu cầu kết nối đến đối tác
    // Hàm để gửi yêu cầu kết nối đến đối tác
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

    // Hàm để gửi dữ liệu tới đối tác
    const sendDataToPeer = (data) => {
        peerRef.current.send(data);
    };

    // Hàm để kiểm tra xem dữ liệu có phải từ người dùng đúng không
    const isDataFromCorrectUser = (data) => {
        // Parse dữ liệu và kiểm tra userId
        try {
            const parsedData = JSON.parse(data);
            return parsedData.userId === userId;
        } catch (error) {
            console.error('Lỗi khi parse dữ liệu:', error);
            return false;
        }
    };

    // Hàm để xử lý cuộc gọi đến
    const handleIncomingCall = () => {
        // Hiển thị thông báo yêu cầu cuộc gọi
        const confirmResponse = window.confirm('Bạn có một cuộc gọi đến từ đối tác. Bạn có muốn nhận cuộc gọi không?');

        if (confirmResponse) {
            // Xử lý khi người dùng chấp nhận cuộc gọi
            console.log('Người dùng đã chấp nhận cuộc gọi.');
        } else {
            // Xử lý khi người dùng từ chối cuộc gọi
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
