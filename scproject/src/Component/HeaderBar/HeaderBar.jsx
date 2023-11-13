import React from "react";
import "./HeaderBar.scss";
import { Search } from "react-feather";
import { useSelector } from "react-redux";

export default function HeaderBar() {
  const reduxUserData = useSelector((state) => state.userData);
  const { data } = reduxUserData;

  return (
    <div className="header-bar">
      <h4 className="header-bar__name">WeTalk - {data.name}</h4>
      <form className="header-bar__form">
        <input className="header-bar__input" placeholder="Search..." />
        <button className="header-bar__btn">
          <Search className="header-bar__icon" />
        </button>
      </form>
    </div>
  );
}
