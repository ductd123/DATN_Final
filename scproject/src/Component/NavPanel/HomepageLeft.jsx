import { NavLink } from "react-router-dom"
import anh from "../../image/img-01.webp"
export default function HomepageLeft() {
    return <div className="w-[64px] h-[100vh] bg-[#0091ff]">
        <div className="mt-[25px]">
            <img src={anh} alt="" />
        </div>
        <div className="flex flex-col justify-between h-[85%]">
            <div className="flex flex-col ">
                <NavLink to='/chat'>
                    <i class="icon-nav-panel fa-regular fa-comment-dots"></i>
                </NavLink>
                <NavLink>
                    <i class="icon-nav-panel fa-regular fa-address-book"></i>
                </NavLink>
                <NavLink>
                    <i class="icon-nav-panel fa-regular fa-square-check"></i>
                </NavLink>
            </div>
            <div className="flex flex-col">
                <i class="text-[1.65rem] p-[15px] text-white fa-solid fa-cloud"></i>
                <i class="text-[1.65rem] p-[15px] text-white fa-solid fa-briefcase"></i>
                <i class="text-[1.65rem] p-[15px] text-white fa-solid fa-gear"></i>
            </div>
        </div>

    </div>
}