import anh from "../../image/zl1.png"
import React, { Component } from 'react'

export default class ChatBox extends Component {
  render() {
    return (
      <div className="w-[1081px]">
        <div className="flex">
            <div className="w-[2px] h-[100vh] bg-[#eaedf0]"></div>
            <div className="items-center mx-auto mt-[100px] items-center">
                <span className="text-center w-[415spanx] h-[42px]"><b>Chào mừng bạn đến với WEB ZALO Fake</b>, <br /> hãy cùng nhau tạo nên nhưng cuộc trò chuyện thật gải tạo nào!</span>
                <img className="mx-auto w-[380px] h-[230px]" src={anh} alt="" />
            </div>
        </div>
        
    </div>
    )
  }
}

