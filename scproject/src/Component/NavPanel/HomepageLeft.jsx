import { NavLink } from "react-router-dom"
import anh from "../../image/img-01.webp"
export default function HomepageLeft() {
    return <div className="menu-panel">
        <div className="mt-[25px]">
            <img src={anh} alt="" />
        </div>
        <div className="flex flex-col justify-between h-[85%]">
            <div className="nav-link flex flex-col ">
                <NavLink to='/home'>
                    <i className="icon-nav-panel fa-regular fa-comment-dots"></i>
                </NavLink>
                <NavLink to='/friends'>
                    <i className="icon-nav-panel fa-regular fa-address-book"></i>
                </NavLink>
                <NavLink to='/volunteers'>
                    <i className="icon-nav-panel fa-regular fa-square-check"></i>
                </NavLink>
            </div>
            <div className="flex flex-col">
                <i className="setting-button text-[1.65rem] p-[15px] text-white fa-solid fa-gear"></i>
            </div>
        </div>

    </div>
}