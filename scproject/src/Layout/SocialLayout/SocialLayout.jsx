import React from "react";
import {
    Nav,
    HeaderBar,
    ListConversation,
    ListContact,
    HomepageMid,
} from "../../Component/index";
import "./SocialLayout.scss";
import { useLocation } from "react-router-dom";

export default function SocialLayout({ children }) {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div className="main-layout">
            <Nav />
            <div className="main-layout__container">
                {pathName === "/volunteers" ?
                    <div className="main-layout__side-bar">
                        <HomepageMid />
                    </div> :
                    <div className="main-layout__side-bar">
                        <div className="main-layout__header-bar">
                            <HeaderBar />
                        </div>
                        <div className="main-layout__content">
                            {pathName === "/contact"||pathName === "/friend"||pathName === "/group"||pathName === "/add-request" ? <ListContact /> : <ListConversation />}
                        </div>
                    </div>
                }
                <div className="main-layout__children flex-center">{children}</div>
            </div>
        </div>
    );
}
