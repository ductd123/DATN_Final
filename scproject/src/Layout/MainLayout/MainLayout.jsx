import React, { useState } from "react";
import {
  Nav,
  HeaderBar,
  ListConversation,
  ListContact,
} from "../../Component/index";
import "./MainLayout.scss";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();
  const pathName = location.pathname;
  const [isRefetchSending, setIsRefetchSending] = useState(false);

  return (
    <div className="main-layout">
      <Nav />
      <div className="main-layout__container">
        <div className="main-layout__side-bar">
          <div className="main-layout__header-bar">
            <HeaderBar setIsRefetchSending={setIsRefetchSending} />
          </div>
          <div className="main-layout__content">
            {pathName === "/contact" ||
            pathName === "/friend" ||
            pathName === "/group" ||
            pathName === "/add-request" ? (
              <ListContact isRefetchSending={isRefetchSending} />
            ) : (
              <ListConversation />
            )}
          </div>
        </div>
        <div className="main-layout__children ">{children}</div>
      </div>
    </div>
  );
}
