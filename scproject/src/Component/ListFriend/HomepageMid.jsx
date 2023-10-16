import { useState } from "react"
import anh from "../../image/rosie.png"
import anh1 from "../../image/zl.png"
export default function HomepageMid(){
    let [active,setactive] = useState(false)
    let [search,setsearch] = useState(false)
   
    
    function handleactive(){
        setactive(!active)
    }

    function handlesearch(){
        setsearch(!search)
    }
    
   

    return <div className="w-[343px] h-[100vh] relative">

        
        <div className="flex justify-center items-center p-[10px] mt-[20px] w-[343px] px-[10px]">
            <div onClick={handlesearch} className="w-[240px] h-[32px] bg-[#eaedf0] border rounded-[5px] p-[4px]">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input className="bg-[#eaedf0] px-[10px] outline-0" type="text" name="" id="" placeholder="Search" />
            </div>
            {search?<button  className="hoversearch w-[67px] h-[32px] font-[600px] ml-[5px]  px-[15px]" onClick={handlesearch} >Đóng</button>:
            
           <div className=""> <i class="pl-[10px] fa-solid fa-user-plus"></i>
           <i class="pl-[10px] fa-solid fa-user-group"></i></div> }
        </div>

        {search? <div className="search absolute top-[65px] left-0 w-[343px] h-[670px] bg-[white] p-[15px]">

            <div className="">
                <p className="font-[600] my-[10px] flex justify-items-start">Tìm gần đây</p>
            </div>
            <div className="">
            <div className="flex items-center">
                <img className=" w-[48px] h-[48px] border rounded-[50%] my-[5px]" src={anh} alt="" />
                <div className="">
                    <p className="mx-[10px] flex justify-start font-[600] mx-[5px]">FC online</p>
                    
                </div>
               
            </div>
        </div>


</div>:

       <div className="">
         <div className="flex ustify-center items-center mt-[20px] w-[100%] h-[32px]">
            <div className=" p-[15px] flex">
                <p style={active?{}:{borderBottom:"2px solid #0091ff",color:"#0091ff"}} onClick={handleactive} className="mx-[5px] h-[32px] font-[600]">Ưu Tiên</p>
                <p style={active?{borderBottom:"2px solid #0091ff",color:"#0091ff"}:{}} onClick={handleactive} className="mx-[15px] h-[32px] font-[600]">Khác</p>
            </div>
            <select className="border outline-0 ml-[40px] text-[13px]" name="" id="">
                <option value="a">Phân Loại</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
            <i class="ml-[15px] flex justify-end fa-solid fa-ellipsis"></i>
        </div>
        <div className="w-[343px] h-[1.5px] bg-[#eaedf0]"></div>
       
        {!active?
        <div className="">
            <div className="flex p-[15px]">
                <img className="mx-[5px] w-[48px] h-[48px] border rounded-[50%]" src={anh} alt="" />
                <div className="">
                    <span className="flex justify-start font-bold mx-[5px]">FC online</span>
                    <p className="mx-[5px] ">BlackPink In Your Area</p>
                </div>
                <p className="flex justify-end text-[10px] text-[#7589a3]">Time Ago</p>
            </div>
        </div>:
        <div className="mx-auto mt-[20px]">
            <img className="w-[120px] h-[120px] mx-auto " src={anh1} alt="" />
            <p className="font-bold text-[.875rem] w-[270px]  mx-auto">Tách riêng các trò chuyện không ưu tiên</p>
            <div className="">
            <p className="text-[.875rem] text-[text-[#7589a3] w-[260px]  mx-auto mt-[20px]">Thêm các trò chuyện ít quan trọng vào đây để dễ quản lý và tránh bị làm phiền</p>
            </div>
        </div>
        }
       </div>
    }

       
    </div>
    
    }