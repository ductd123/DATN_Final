import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VolunteerSlider.scss";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import so from "../../assets/image/sotunhien.png";
import BangChuCai from "../../assets/image/bangchucai.png";
import A from "../../assets/image/A.webp";
import B from "../../assets/image/B.webp";
import C from "../../assets/image/C.webp";
import D from "../../assets/image/D.webp";
import E from "../../assets/image/E.webp";
import F from "../../assets/image/F.webp";
import G from "../../assets/image/G.webp";
import H from "../../assets/image/H.webp";
import I from "../../assets/image/I.webp";
import J from "../../assets/image/J.webp";
import K from "../../assets/image/K.webp";
import L from "../../assets/image/L.webp";
import M from "../../assets/image/M.webp";
import N from "../../assets/image/N.webp";
import O from "../../assets/image/O.webp";
import P from "../../assets/image/P.webp";
import Q from "../../assets/image/Q.webp";
import R from "../../assets/image/R.webp";
import S from "../../assets/image/S.webp";
import T from "../../assets/image/T.webp";
import U from "../../assets/image/U.webp";
import V from "../../assets/image/V.webp";
import W from "../../assets/image/W.webp";
import X from "../../assets/image/X.webp";
import Y from "../../assets/image/Y.webp";
import Z from "../../assets/image/z.webp";
let socket;
const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
};
export default function VolunteerSlider() {
    const params = useParams();
    const ENDPOINT = "http://localhost:3000/";
    const src = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]

    return (
        <div className="flex-center">
            <div className="volunteer-room" style={{ width: "calc(100vw - 325px)" }}>
                <div className="volunteer__header">
                    <div className="volunteer__content">Bảng chữ cái ngôn ngữ ký hiệu tiếng anh</div>
                </div>
                <Slider autoplay {...settings}>
                    {src.map((item, index) => {
                        return (
                            <div>
                                <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                                    <img src={item} key={index}></img>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
}
