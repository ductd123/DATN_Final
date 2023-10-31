// import React from "react";
// import HomePageLeft from "../../Component/NavPanel/HomepageLeft";

// export default function MainLayout({ children }) {
//     return (
//         <>
//             <HomePageLeft />
//             {children}
//         </>
//     );
// }

import React from "react";
import {
    Nav,
    HeaderBar,
    ListConversation,
    ListContact,
    HomepageMid,
} from "../../Component/index";
import "./MainLayout.scss";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div className="main-layout">
            <Nav />
            <div className="main-layout__container">
                <div className="main-layout__side-bar">
                    <div className="main-layout__header-bar">
                        <HeaderBar />
                    </div>
                    <div className="main-layout__content">
                        {pathName === "/contact" ? <ListContact /> : pathName === "/volunteers" ? <HomepageMid /> : <ListConversation />}
                    </div>
                </div>
                <div className="main-layout__children">{children}</div>
            </div>
        </div>
    );
}
