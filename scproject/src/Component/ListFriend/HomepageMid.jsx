import { useState } from "react"
import anh from "../../assets/image/rosie.png"
import anh1 from "../../assets/image/zl.png"
import React, { Component } from 'react'
import UserList from "./UseList";
import { Input } from 'antd';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Searchbox from "../Common/Searchbox/Searchbox";
class HomepageMid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            active: false,
        }
    }
    handleactive = (e) => {
        this.setState({
            active: e,
        })
    }
    handleOpenSearch = () => {
        this.setState({ search: true })
    }
    handleCloseSearch = () => {
        this.setState({ search: false })
    }
    render() {
        return (<div className="detail-panel relative">
            {/* <Searchbox search={this.state.search} handleCloseSearch={this.handleCloseSearch} handleOpenSearch={this.handleOpenSearch} />

            {this.state.search ? <div className="search absolute top-[65px] left-0 w-[343px] h-[670px] bg-[white] p-[15px]">

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


            </div> :

                <div className="">
                    <div className="flex ustify-center items-center mt-[20px] w-[100%] h-[32px]">
                        <div className="nav-panel-switch p-[15px] flex">
                            <p style={this.state.active ? {} : { borderBottom: "2px solid #0091ff", color: "#0091ff" }} onClick={e => this.handleactive(false)} className="mx-[5px] h-[32px] font-[600]">Ưu Tiên</p>
                            <p style={this.state.active ? { borderBottom: "2px solid #0091ff", color: "#0091ff" } : {}} onClick={e => this.handleactive(true)} className="mx-[15px] h-[32px] font-[600]">Khác</p>
                        </div>
                    </div>
                    <div className="w-[343px] h-[1.5px] bg-[#eaedf0]"></div>

                    {!this.state.active ?
                        <div className="">
                            <UserList />
                        </div> :
                        <div className="mx-auto mt-[20px]">
                            <img className="w-[120px] h-[120px] mx-auto " src={anh1} alt="" />
                            <p className="font-bold text-[.875rem] w-[270px]  mx-auto">Tách riêng các trò chuyện không ưu tiên</p>
                            <div className="">
                                <p className="text-[.875rem] text-[text-[#7589a3] w-[260px]  mx-auto mt-[20px]">Thêm các trò chuyện ít quan trọng vào đây để dễ quản lý và tránh bị làm phiền</p>
                            </div>
                        </div>
                    }
                </div>
            } */}


        </div>

        );
    }
}

export default HomepageMid;