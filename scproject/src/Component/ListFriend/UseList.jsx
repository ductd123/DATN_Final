import React, { Component } from 'react'
import anh from "../../image/rosie.png"
class UserList extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div className="" style={{width:'100%'}}>
                <div className="flex list-chat-container">
                    {/* <img className="mx-[5px] w-[48px] h-[48px] border rounded-[50%]" src={anh} alt="" /> */}
                    <img className="list-chat-avatar" src={anh} alt="" />
                    <div className="">
                        <span className="text-card flex justify-start font-bold mx-[5px]">FC online</span>
                        <span className="text-card mx-[5px] ">BlackPink In Your Area</span>
                    </div>
                    <p className="time-chat">Time Ago</p>
                </div>
            </div>
        );
    }
}

export default UserList;