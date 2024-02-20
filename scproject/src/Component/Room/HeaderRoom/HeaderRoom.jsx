import React from "react";
import "./HeaderRoom.scss";

export default function HeaderRoom({ userInfo }) {
    return (
        <div className="header-room">
            <img
                src={userInfo?.avatarLocation}
                alt=""
                className="header-room__img"
            />
            <div>
                <h3 className="header-room__name">{userInfo?.name}</h3>
                <span className="header-room__time">{userInfo?.email}</span>
            </div>
        </div>
    );
}
