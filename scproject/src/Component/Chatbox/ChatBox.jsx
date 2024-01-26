import anh from "../../assets/image/zl1.png"
import React, { Component } from 'react'

export default class ChatBox extends Component {
  render() {
    return (
      <div className="w-[1081px]">
        <div className="flex">
          <div className="items-center mx-auto mt-[100px] items-center">
            <span className="text-center w-[415spanx] h-[42px]"><b>Chào mừng bạn đến với WEB WeTalk</b></span>
            <img className="mx-auto w-[380px] h-[230px]" src={anh} alt="" />
          </div>
        </div>

      </div>
    )
  }
}

