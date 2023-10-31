import React, { useEffect } from "react";
import "./ListConversation.scss";
import HeaderList from "../Common/HeaderList/HeaderList";
import { useDispatch, useSelector } from "react-redux";
// import { doGetConversationOfUser } from "../../Redux/actions";
import { Link } from "react-router-dom";

export default function ListConversation() {
  // const reduxConversation = useSelector((state) => state.reduxConversation);
  // const reduxUserData = useSelector((state) => state.reduxUserData);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(doGetConversationOfUser(reduxUserData.data.id));
  // }, [reduxUserData.data.id, dispatch]);

  return (
    <div className="conversation">
      <HeaderList title="Conversation" />
      {Array.from({ length: 10 }).map((item, i) => {
        return (
          <Link to={`/room/${i}`} className="conversation__link" key={i}>
            <div className="conversation__container" key={i}>
              <div className="conversation__content">
                <img
                  src="https://picsum.photos/200"
                  alt=""
                  className="conversation__img"
                />
                <div className="conversation__main">
                  <h4 className="conversation__name">Conversation {i + 1}</h4>
                  <span className="conversation__mess">Last Message</span>
                </div>
              </div>
              <span className="conversation__time">Yesterday</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
