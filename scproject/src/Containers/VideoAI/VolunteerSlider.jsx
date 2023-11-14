import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VolunteerSlider.scss";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import so from "../../assets/image/sotunhien.png";
import BangChuCai from "../../assets/image/bangchucai.png";
import { Carousel } from "antd";
let socket;
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
export default function VolunteerSlider() {
    const [messages, setMessages] = useState([]);
    // const reduxUserData = useSelector((state) => state.reduxUserData);
    const params = useParams();
    const ENDPOINT = "http://localhost:3000/";

    // useEffect(() => {
    //   socket = io(ENDPOINT);
    //   socket.emit("join", { ...params });
    //   apiConversation
    //     .getAllMessOfConversation(params.id)
    //     .then((res) => setMessages(res));
    //   return () => {
    //     socket.emit("disconnect");
    //     socket.off();
    //   };
    // ; [ENDPOINT, params]);

    // useEffect(() => {
    //   socket.on("mess", (mess) => {
    //     console.log(mess);
    //     setMessages([...messages, mess]);
    //   });
    // }, [messages]);

    // const handleSendMess = (values, resetForm) => {
    //   socket.emit("sendMess", {
    //     userId: reduxUserData.data.id,
    //     content: values.mes,
    //     theaterId: params,
    //   });
    //   resetForm();
    // };

    return (
        <div className="volunteer-room" style={{ width: "calc(100vw - 325px)", height: "calc(100vh - 44px)"}}>
            <div className="volunteer__header">
                <div className="volunteer__content">Một số bảng chữ cái thông dụng</div>
            </div>
            <Slider autoplay {...settings}>
                <div className="volunteerAlphabet">
                    <img style={{width: "calc(100vw - 325px)", height: "calc(100vh - 44px)", objectFit: "contain" }} src={BangChuCai} key="bangchucai"></img>
                </div>
                <div>
                    <img style={settings} src={so} key="sotunhien"></img>
                </div>
            </Slider>
        </div>
    );
}
